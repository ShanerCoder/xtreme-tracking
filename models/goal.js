import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
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
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    required: true,
    trim: true,
  },
  numberOfSets: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    required: true,
    trim: true,
  },
  dateToAchieveBy: {
    type: Date,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model("goals", GoalSchema);
