import mongoose from "mongoose";

const ExerciseHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  gramsEaten: {
    type: Number,
    required: true,
    trim: true,
  },
  totalCalories: {
    type: Number,
    required: true,
    trim: true,
  },
  dateEaten: {
    type: Date,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model("food_history", ExerciseHistorySchema);
