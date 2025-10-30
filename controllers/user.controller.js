import * as userService from '../services/user.service.js'
import cloudinary from '../config/cloudinary.js'
import streamifier from 'streamifier'

export const getMe = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    // Use user ID for unique avatar public_id
    const userId = req.user.id || req.user._id

    const uploadFromBuffer = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'avatars',
            public_id: userId, // This ensures uniqueness per user
            overwrite: true, // Overwrite previous avatar
            resource_type: 'image',
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          },
        )
        streamifier.createReadStream(fileBuffer).pipe(stream)
      })
    }

    const result = await uploadFromBuffer(req.file.buffer)
    return res.json({ url: result.secure_url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
