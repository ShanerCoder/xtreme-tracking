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

function GymVisitation(props) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [state, dispatch] = useStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingScreen, showLoadingScreen] = useLoadingStore();
  const user = getValue(state, ["user"], null);

  const gymAttendanceDates = [];
  if (props.checkInDates)
    props.checkInDates.map((checkIn) =>
      gymAttendanceDates.push(new Date(checkIn.dateOfCheckIn))
    );

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
      console.log(selectedDate);
      const bodyData = {
        username: user.username,
        dateOfCheckIn: dateOfCheckIn,
        photoId: uploadPhotoData.public_id,
      };
      const response = await fetch("/api/exerciseTracking/check_in", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      });
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

  return (
    <>
      <LighterDiv>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <h1 className="center">Gym Visitation</h1>
        <Calendar
          listOfDates={gymAttendanceDates}
          setTitleSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          imagesrc="human.png"
          disableGreaterThanToday={true}
        />
      </LighterDiv>
      <DarkerDiv>
        <SelectedDateVisitationForm
          selectedDate={selectedDate}
          gymAttendanceDates={gymAttendanceDates}
          checkInList={props.checkInList}
          ownProfile={props.ownProfile}
          handleCheckIn={handleCheckIn}
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

    if (session.user.username == username) {
      return {
        props: {
          ownProfile: true,
          checkInList: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
            photoId: checkIn.photoId,
          })),
          checkInDates: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
          })),
        },
      };
    } else
      return {
        props: {
          ownProfile: false,
          checkInList: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
            photoId: checkIn.photoId,
          })),
          checkInDates: checkInList.map((checkIn) => ({
            dateOfCheckIn: checkIn.dateOfCheckIn.toString(),
          })),
        },
      };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default GymVisitation;
