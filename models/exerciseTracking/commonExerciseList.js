import mongoose from "mongoose";

const CommonExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  muscleGroup: {
    type: String,
    required: true,
    trim: true,
  },
});

mongoose.models = {};

export default mongoose.model("common_exercise_list", CommonExerciseSchema);
