import mongoose, { Schema, model } from 'mongoose'

const skillSchema = new Schema({
  name: { type: String, required: true, trim: true },
  icon: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  projects: [{ type: String, trim: true }],
  description: { type: String, default: '' },
  skillUpvoteCount: { type: Number, default: 0 },
  skillUpvotes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      upvoteDate: { type: Date, default: Date.now },
    },
  ],
  skillLastUsedDate: { type: Date, default: Date.now },
  yearOfExperience: { type: Number, default: 1 },
})

const Skill = model('Skill', skillSchema)
export default Skill
