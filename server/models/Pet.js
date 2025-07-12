import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  breed: String,
  age: Number,
  medicalHistory: [String],
});

export default mongoose.model("Pet", petSchema);
