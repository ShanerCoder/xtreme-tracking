import mongoose from "mongoose";

const ExerciseListSchema = new mongoose.Schema({
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
  caloriesPer100: {
    type: Number,
    required: true,
    trim: true,
  },
});

mongoose.models = {};

export default mongoose.model("food_list", ExerciseListSchema);
