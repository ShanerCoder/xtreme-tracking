import mongoose from "mongoose";

const PlannedGymVisitationDatesSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  dateOfPlannedVisitation: {
    type: Date,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model(
  "planned_gym_visitation_dates",
  PlannedGymVisitationDatesSchema
);
