import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  profilePictureId: {
    type: String,
    required: false,
  },
  profileDescription: {
    type: String,
    required: false,
  },
});

mongoose.models = {};

export default mongoose.model("user_profiles", UserProfileSchema);
