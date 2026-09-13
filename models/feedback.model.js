import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    aliasName: {
      type: String,
      required: true,
      trim: true,
    },
    feedbackMessage: {
      type: String,
      required: true,
      trim: true,
    },
    feedbackType: {
      type: String,
      required: true,
      enum: ['bug', 'feature', 'other'],
    },
    ananomyous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
