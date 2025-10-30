import * as testimonialService from '../services/testimonial.service.js'

// Create
export const createTestimonial = async (req, res) => {
  try {
    const { avatarUrl, currentPosition, company, socialLinks, ...testimonialData } = req.body
    const userUpdates = { currentPosition, company, socialLinks, avatarUrl }

    console.log('User ID in controller:', req.user)

    const testimonial = await testimonialService.createTestimonialAndUpdateUser(
      testimonialData,
      req.user.id,
      userUpdates,
    )
    res.status(201).json({ testimonial })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Get all
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getAllTestimonials()
    res.json({ testimonials })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllLatestTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getLatestTestimonialsPerUser()
    res.json({ testimonials })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get by ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id)
    if (!testimonial) return res.status(404).json({ error: 'Not found' })
    res.json({ testimonial })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update status (admin only)
export const updateTestimonialStatus = async (req, res) => {
  try {
    const testimonial = await testimonialService.updateTestimonialStatus(
      req.params.id,
      req.body.status,
    )
    if (!testimonial) return res.status(404).json({ error: 'Not found' })
    res.json({ testimonial })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const updateTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialService.updateTestimonialById(req.params.id, req.body)
    if (!testimonial) return res.status(404).json({ error: 'Not found' })
    res.json({ testimonial })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete (admin only)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialService.deleteTestimonial(req.params.id)
    if (!testimonial) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
