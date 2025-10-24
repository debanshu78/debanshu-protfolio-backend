import * as skillService from '../services/skill.service.js';

// Create Skill (admin only)
export const createSkill = async (req, res) => {
  try {
    const skill = await skillService.createSkill(req.body);
    res.status(201).json({ skill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await skillService.getAllSkills();
    res.json({ skills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Skill (admin only)
export const updateSkill = async (req, res) => {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json({ skill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Skill (admin only)
export const deleteSkill = async (req, res) => {
  try {
    const skill = await skillService.deleteSkill(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Upvote Skill (auth required)
export const upvoteSkill = async (req, res) => {
  try {
    const skill = await skillService.upvoteSkill(req.body.skillId, req.user.id);
    res.json({ skill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Downvote Skill (auth required)
export const downvoteSkill = async (req, res) => {
  try {
    const skill = await skillService.downvoteSkill(req.body.skillId, req.user.id);
    res.json({ skill });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
