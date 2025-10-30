import { body, validationResult } from 'express-validator'

// Validation rules for sign up
export const validateSignUp = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  // Add more rules as needed
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

// Validation rules for sign in
export const validateSignIn = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

// Validation rules for request otp
export const validateRequestOtp = [
  body('email').isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

// Validation rules for verify otp
export const validateVerifyOtp = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('otp').notEmpty().withMessage('otp is required'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

export const validateImageUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  // Check file type (accept only images)
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(400).json({ error: 'Only image files are allowed.' })
  }

  // Check file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
  if (req.file.size > MAX_SIZE) {
    return res.status(400).json({ error: 'File size exceeds 5MB limit.' })
  }

  next()
}
