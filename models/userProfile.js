import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  profilePictureURL: {
    type: String,
    required: false,
    trim: true,
  },
  profileDescription: {
    type: String,
    required: false,
  },
});

mongoose.models = {};

export default mongoose.model("user_profiles", UserProfileSchema);
