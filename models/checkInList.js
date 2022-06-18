import mongoose from "mongoose";

const CheckInSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfCheckIn: {
      type: Date,
      required: true,
    },
    photoId: {
      type: String,
      required: true,
    },
  }
);

mongoose.models = {};

export default mongoose.model("check_in_list", CheckInSchema);
