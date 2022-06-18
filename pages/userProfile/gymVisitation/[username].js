import SelectedDateVisitationForm from "../../../components/forms/GymVisitationForms/SelectedDateVisitationForm";
import Calendar from "../../../components/ui/Calendar";
import DarkerDiv from "../../../components/ui/DarkerDiv";
import LighterDiv from "../../../components/ui/LighterDiv";
import { useRouter } from "next/router";
import { dbConnect } from "../../../lib/db-connect";
import { getSession } from "next-auth/client";
import { getValue } from "../../../utils/common";
import { useStore } from "../../../context";
import { useState } from "react";
import { useLoadingStore } from "../../../context/loadingScreen";
import CheckInList from "../../../models/checkInList";
import PlannedVisitationDates from "../../../models/plannedVisitationDates";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import GymVisitationStreak from "../../../models/gymVisitationStreak";

function GymVisitation(props) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [state, dispatch] = useStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const user = getValue(state, ["user"], null);
  const gymAttendanceDates = [];
  const attendanceAndPlannedDates = [];

  // Adding check in dates to arrays
  if (props.checkInDates) {
    props.checkInDates.map((checkIn) =>
      gymAttendanceDates.push(new Date(checkIn.dateOfCheckIn))
    );
    props.checkInDates.map((checkIn) =>
      attendanceAndPlannedDates.push(new Date(checkIn.dateOfCheckIn))
    );
  }

  // Adding planned visitation dates to arrays
  if (props.plannedVisitationDates) {
    props.plannedVisitationDates.map((plannedAttendance) =>
      attendanceAndPlannedDates.push(
        new Date(plannedAttendance.dateOfPlannedVisitation)
      )
    );
  }

  async function handleCheckIn(newImage) {
    showLoadingScreen({ type: true });

    // Save Image
    const formData = new FormData();
    formData.append("file", newImage[0]);
    formData.append("upload_preset", "xtreme_tracking_preset");
    const uploadPhotoResponse = await fetch(
      "https://api.cloudinary.com/v1_1/multishane999/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadPhotoData = await uploadPhotoResponse.json();

    if (uploadPhotoData.hasError) {
      setErrorMessage(uploadPhotoData.errorMessage);
    } else {
      // Save Check In
      const dateOfCheckIn = new Date(selectedDate).setHours(1, 0, 0, 0);

      const bodyData = {
        username: user.username,
        dateOfCheckIn: dateOfCheckIn,
        photoId: uploadPhotoData.public_id,
      };
      const response = await fetch(
        "/api/exerciseTracking/gymVisitation/check_in",
        {
          method: "POST",
          body: JSON.stringify(bodyData),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.hasError) {
        setErrorMessage(data.errorMessage);
      } else {
        setErrorMessage(null);
      }
    }
    await router.push("/userProfile/gymVisitation/" + user.username);
    showLoadingScreen({ type: false });
  }

  async function handleSetVisition() {
    showLoadingScreen({ type: true });

    // Set Visitation
    const dateOfPlannedVisitation = new Date(selectedDate).setHours(1, 0, 0, 0);

    const bodyData = {
      username: user.username,
      dateOfPlannedVisitation: dateOfPlannedVisitation,
    };
    const response = await fetch(
      "/api/exerciseTracking/gymVisitation/planned_visitation",
      {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.hasError) {
      setErrorMessage(data.errorMessage);
    } else {
      setErrorMessage(null);
    }

    await router.push("/userProfile/gymVisitation/" + user.username);
    showLoadingScreen({ type: false });
  }

  return (
    <>
      <LighterDiv>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <h1 className="center">Gym Visitation for {props.username}</h1>
        <h2 className="center">
          Planned Gym Visitation Count: {props.visitationStreak}
        </h2>
        <Calendar
          listOfDates={attendanceAndPlannedDates}
          setTitleSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          imagesrc="human.png"
          imageSrcPastToday="flag.png"
          includeTodayForImgSrcPastToday={!props.checkedInToday}
          maximumDate={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 7
            )
          }
        />
      </LighterDiv>
      <DarkerDiv>
        <SelectedDateVisitationForm
          selectedDate={selectedDate}
          gymAttendanceDates={gymAttendanceDates}
          checkInList={props.checkInList}
          plannedVisitationDates={props.plannedVisitationDates}
          ownProfile={props.ownProfile}
          handleCheckIn={handleCheckIn}
          handleSetVisition={handleSetVisition}
        />
      </DarkerDiv>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const username = context.query.username;
    const req = context.req;
    const session = await getSession({ req });

    await dbConnect();
    const checkInList = await CheckInList.find({ username: username }).sort({
      dateOfCheckIn: 1,
    });
    const plannedVisitationsList = await PlannedVisitationDates.find({
      username: username,
      dateOfPlannedVisitation: { $gte: startOfDay(new Date()) },
    }).sort({
      dateOfPlannedVisitation: 1,
    });
    let visitationStreak = await GymVisitationStreak.findOne({
      username: username,
    });

    if (visitationStreak && visitationStreak.streakCount) {
      visitationStreak = visitationStreak.streakCount;
    } else {
      visitationStreak = 0;
    }

    let checkedInToday = await CheckInList.findOne({
      username: username,
      dateOfCheckIn: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    });

    if (checkedInToday) {
      checkedInToday = true;
    } else checkedInToday = false;

    if (session && session.user.username == username) {
      return {
        props: {
          username: username,
          ownProfile: true,
          checkInList: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
            photoId: checkIn.photoId,
          })),
          checkInDates: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
          })),
          plannedVisitationDates: plannedVisitationsList.map(
            (visitationDate) => ({
              dateOfPlannedVisitation:
                visitationDate.dateOfPlannedVisitation.toString(),
            })
          ),
          checkedInToday: checkedInToday,
          visitationStreak: visitationStreak,
        },
      };
    } else
      return {
        props: {
          username: username,
          ownProfile: false,
          checkInList: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
            photoId: checkIn.photoId,
          })),
          checkInDates: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
          })),
          plannedVisitationDates: plannedVisitationsList.map(
            (visitationDate) => ({
              dateOfPlannedVisitation:
                visitationDate.dateOfPlannedVisitation.toString(),
            })
          ),
          checkedInToday: checkedInToday,
          visitationStreak: visitationStreak,
        },
      };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default GymVisitation;
