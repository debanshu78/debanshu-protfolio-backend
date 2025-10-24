import Skill from '../models/skill.model.js';
import mongoose from 'mongoose';
import * as userService from './user.service.js';

// Create a new skill
export const createSkill = async (data) => {
  return await Skill.create(data);
};

// Get all skills
export const getAllSkills = async () => {
  return await Skill.find();
};

// Update a skill by ID
export const updateSkill = async (id, update) => {
  return await Skill.findByIdAndUpdate(id, update, { new: true });
};

// Delete a skill by ID
export const deleteSkill = async (id) => {
  return await Skill.findByIdAndDelete(id);
};

// Upvote a skill
export const upvoteSkill = async (skillId, userId) => {
  const skill = await Skill.findById(skillId);
  if (!skill) throw new Error('Skill not found');

  // Prevent duplicate upvotes
  if (skill.skillUpvotes?.some((up) => up.userId.toString() === userId)) {
    throw new Error('Already upvoted');
  }

  skill.skillUpvotes = skill.skillUpvotes || [];
  skill.skillUpvotes.push({ userId: new mongoose.Types.ObjectId(userId), upvoteDate: new Date() });
  skill.skillUpvoteCount = (skill.skillUpvoteCount || 0) + 1;
  await skill.save();
  await userService.addUpvotedSkill(userId, skill._id);
  return skill;
};

// Downvote a skill (remove user's upvote)
export const downvoteSkill = async (skillId, userId) => {
  const skill = await Skill.findById(skillId);
  if (!skill) throw new Error('Skill not found');

  const before = skill.skillUpvotes?.length || 0;
  skill.skillUpvotes = (skill.skillUpvotes || []).filter((up) => up.userId.toString() !== userId);
  const after = skill.skillUpvotes.length;
  if (before === after) throw new Error('You have not upvoted this skill');

  skill.skillUpvoteCount = Math.max(0, (skill.skillUpvoteCount || 0) - 1);
  await skill.save();
  await userService.removeUpvotedSkill(userId, skill._id);
  return skill;
};
