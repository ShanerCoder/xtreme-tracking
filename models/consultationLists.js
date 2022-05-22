import mongoose from "mongoose";

const ConsultationListsSchema = new mongoose.Schema({
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
  datetimeOfConsultation: {
    type: Date,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model("consultation_lists", ConsultationListsSchema);
