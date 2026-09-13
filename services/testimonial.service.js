import Testimonial from '../models/testimonial.model.js'
import { removeTestimonialFromUser, updateUserWithTestimonial } from './user.service.js'

// Create a new testimonial
export const createTestimonial = async (data) => {
  return await Testimonial.create(data)
}

// Create testimonial and update user
export const createTestimonialAndUpdateUser = async (testimonialData, userId, userUpdates) => {
  // 1. Create testimonial
  const testimonial = await Testimonial.create({ ...testimonialData, user: userId })

  // 2. Update user via user service
  await updateUserWithTestimonial(userId, userUpdates, testimonial._id)

  return testimonial
}

// Get all testimonials
export const getAllTestimonials = async () => {
  return await Testimonial.find().populate('user', 'name email')
}

// Get latest testimonial for each unique user
export const getLatestTestimonialsPerUser = async () => {
  const latest = await Testimonial.aggregate([
    { $sort: { updatedAt: -1 } },
    {
      $group: {
        _id: '$user',
        testimonial: { $first: '$$ROOT' },
      },
    },
    {
      $replaceRoot: { newRoot: '$testimonial' },
    },
  ])

  // Populate all user fields except password
  return await Testimonial.populate(latest, {
    path: 'user',
    select: '-password',
  })
}

// Get testimonial by ID
export const getTestimonialById = async (id) => {
  return await Testimonial.findById(id).populate('user', 'name email')
}

// Update testimonial status (admin only)
export const updateTestimonialStatus = async (id, status) => {
  return await Testimonial.findByIdAndUpdate(id, { status }, { new: true })
}

// Delete testimonial (admin only)
export const deleteTestimonial = async (id) => {
  // Find the testimonial to get the user
  const testimonial = await Testimonial.findById(id)
  if (!testimonial) return null

  // Remove testimonial reference from the user via user service
  await removeTestimonialFromUser(testimonial.user, testimonial._id)

  // Delete the testimonial itself
  return await Testimonial.findByIdAndDelete(id)
}
