import mongoose from "mongoose";

const TrainingPlanSchema = new mongoose.Schema({
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

export default mongoose.model(
  "example_training_plans_list",
  TrainingPlanSchema
);
