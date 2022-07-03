import mongoose from "mongoose";

const ConsultationRequestSchema = new mongoose.Schema(
  {
    usernameToReceive: {
      type: String,
      required: true,
      trim: true,
    },
    usernameWhoSent: {
      type: String,
      required: true,
      trim: true,
    },
    consultationRequest: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model(
  "consultation_requests",
  ConsultationRequestSchema
);
