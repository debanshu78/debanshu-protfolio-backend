import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    currentPosition: { type: String, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true, unique: true },
    password: { type: String }, // Hashed password for local login
    otp: { type: String },
    otpExpires: { type: Date },
    socialLinks: {
      github: { type: String },
      google: { type: String },
      linkedIn: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    testimonials: [{ type: Types.ObjectId, ref: 'Testimonial' }],
    upvoteSkills: [{ type: Types.ObjectId, ref: 'Skill' }],
    accountstatus: {
      type: String,
      default: 'deactive',
      enum: ['deactive', 'active', 'reset'],
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'super-admin'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
