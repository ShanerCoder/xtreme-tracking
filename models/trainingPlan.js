import mongoose from "mongoose";

const TrainingPlanSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  trainingPlanName: {
    type: String,
    required: true,
    trim: true,
  },
  listOfExercises: {
    type: Array,
    required: true,
    trim: true,
  },
});

mongoose.models = {};

export default mongoose.model("training_plan_list", TrainingPlanSchema);
