import mongoose from "mongoose";

const PrivateMessageSchema = new mongoose.Schema(
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
    privateMessage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("private_messages", PrivateMessageSchema);
