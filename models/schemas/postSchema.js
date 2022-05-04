import { mongoose } from "mongoose";

export async function postSchema() {
  const schema = new mongoose.Schema(
    {
      postText: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return schema;
}
