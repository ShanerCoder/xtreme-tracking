import mongoose from "mongoose";

const ExerciseHistorySchema = new mongoose.Schema(
  {
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
    weightUsed: {
      type: Number,
      required: true,
      trim: true,
    },
    numberOfReps: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
      required: true,
      trim: true,
    },
    numberOfSets: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
      required: true,
      trim: true,
    },
    dateOfExercise: {
      type: Date,
      required: true,
    }
  }
);

mongoose.models = {};

export default mongoose.model("exercise_history", ExerciseHistorySchema);
