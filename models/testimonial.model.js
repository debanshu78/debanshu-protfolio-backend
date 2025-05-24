import mongoose from "mongoose";
import { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shortMessage: {
      type: String,
      required: true,
      trim: true,
    },
    fullMessage: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    statusInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
