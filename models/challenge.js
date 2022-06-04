import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
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
    exerciseName: {
      type: String,
      required: true,
      trim: true,
    },
    weightUsed: {
      type: Number,
      required: true,
      trim: true,
    },
    numberOfReps: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: true,
      trim: true,
    },
    numberOfSets: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: true,
      trim: true,
    },
    dateToAchieveBy: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("challenges", PostSchema);
