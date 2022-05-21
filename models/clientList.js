import mongoose from "mongoose";

const ClientListSchema = new mongoose.Schema(
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

export default mongoose.model("client_lists", ClientListSchema);
