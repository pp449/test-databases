import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const model = mongoose.model("User", UserSchema);

export default model;
