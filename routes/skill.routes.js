import { Router } from 'express'
import * as skillController from '../controllers/skill.controller.js'
import { isSignIn, isAdmin } from '../middlewares/auth.middleware.js'

const router = Router()

// Admin-only routes
router.post('/create', isSignIn, isAdmin, skillController.createSkill)
router.put('/update/:id', isSignIn, isAdmin, skillController.updateSkill)
router.delete('/delete/:id', isSignIn, isAdmin, skillController.deleteSkill)

// Public routes
router.get('/getAll', skillController.getAllSkills)
router.get('/:id', skillController.getSkillById) // <-- Add this line

// Authenticated user routes
router.post('/upvote', isSignIn, skillController.upvoteSkill)
router.post('/downvote', isSignIn, skillController.downvoteSkill)

export default router
