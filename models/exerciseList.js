import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  exerciseName: {
    type: String,
    required: true,
    trim: true,
  },
  muscleGroup: {
    type: String,
    required: true,
    trim: true,
  },
});

mongoose.models = {};

export default mongoose.model("exercise_list", PostSchema);
