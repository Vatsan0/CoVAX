import mongoose from "mongoose";
const SlotSchema = new mongoose.Schema(
  {
    maxSlots: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("Slots", SlotSchema);