import { Router } from 'express'
import * as testimonialController from '../controllers/testimonial.controller.js'
import { isSignIn, isAdmin, isOwner } from '../middlewares/auth.middleware.js'

const router = Router()

// Create testimonial (auth required)
router.post('/create', isSignIn, testimonialController.createTestimonial)

// Get all testimonials (public)
router.get('/getAll', testimonialController.getAllTestimonials)

router.get('/getLatestPerUser', testimonialController.getAllLatestTestimonials)

// Get testimonial by ID (public)
router.get('/getById/:id', testimonialController.getTestimonialById)

// Update status (admin only)
router.put('/updateStatus/:id', isSignIn, isAdmin, testimonialController.updateTestimonialStatus)

// Update testimonial by ID (admin or owner)
router.put(
  '/update/:id',
  isSignIn,
  (req, res, next) => {
    if (req.user.role === 'admin') return next()
    return isOwner(req, res, next)
  },
  testimonialController.updateTestimonialById,
)

// Delete testimonial (admin only)
router.delete(
  '/delete/:id',
  isSignIn,
  (req, res, next) => {
    // Allow if admin, otherwise check owner
    if (req.user.role === 'admin') return next()
    return isOwner(req, res, next)
  },
  testimonialController.deleteTestimonial,
)

export default router
