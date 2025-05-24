import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  projectLink: {
    type: String,
    required: true,
    trim: true,
  },
  skillUpvoteCount: {
    type: Number,
    default: 0,
  },
  skillLastUsed: {
    type: Date,
    default: Date.now,
  },
  yearOfExperience: {
    type: Number,
    required: true,
  },
});
const Skill = model("Skill", skillSchema);
export default Skill;
