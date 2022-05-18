import mongoose from "mongoose";

const ConsultationListSchema = new mongoose.Schema(
  {
    personalTrainerUsername: {
      type: String,
      required: true,
      trim: true,
    },
    clientUsername: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model(
  "consultation_list",
  ConsultationListSchema
);
