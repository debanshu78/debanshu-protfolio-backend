import mongoose, { Schema, model } from 'mongoose'

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
  skillUpvotes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      upvoteDate: { type: Date, default: Date.now },
    },
  ],
  skillLastUsedDate: {
    type: Date,
    default: Date.now,
  },
  yearOfExperience: {
    type: Number,
    required: true,
  },
})

const Skill = model('Skill', skillSchema)
export default Skill
