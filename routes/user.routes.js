import { Router } from 'express'
import { isSignIn } from '../middlewares/auth.middleware.js'
import { getMe, uploadAvatar } from '../controllers/user.controller.js'
import { upload } from '../middlewares/utils.middleware.js'
import { validateImageUpload } from '../middlewares/validate.middleware.js'

const router = Router()

router.get('/me', isSignIn, getMe)
router.post('/upload-avatar', isSignIn, upload.single('avatar'), validateImageUpload, uploadAvatar)

export default router
