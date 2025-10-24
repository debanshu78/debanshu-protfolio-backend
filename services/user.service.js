import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

// Local sign up
export const signUp = async ({ name, email, password, ...rest }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashed,
    accountstatus: 'active',
    ...rest,
  });
  return user;
};

// Social sign up or login (used by passport strategies)
export const findOrCreateSocialUser = async ({ name, email, provider, providerId }) => {
  let query = {};
  query[`socialLinks.${provider}`] = providerId;
  let user = await User.findOne(query);
  if (!user) {
    // Try to find by email (link accounts)
    user = await User.findOne({ email });
    if (user) {
      user.socialLinks[provider] = providerId;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        socialLinks: { [provider]: providerId },
        accountstatus: 'active',
      });
    }
  }
  return user;
};

export const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

export const addUpvotedSkill = async (userId, skillId) => {
  await User.findByIdAndUpdate(userId, { $addToSet: { upvoteSkills: skillId } }, { new: true });
};

export const removeUpvotedSkill = async (userId, skillId) => {
  await User.findByIdAndUpdate(userId, { $pull: { upvoteSkills: skillId } });
};
