import mongoose from "mongoose";

const GymVisitationStreakSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  streakCount: {
    type: Number,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model("visitation_streak", GymVisitationStreakSchema);
