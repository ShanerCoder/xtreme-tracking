import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  /*_id: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },*/
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  forename: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

export default mongoose.model("user_accounts", UserSchema);
