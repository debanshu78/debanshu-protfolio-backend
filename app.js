import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import './config/passport.js'
import authRouter from './routes/auth.routes.js' // Import the auth routes
import userRouter from './routes/user.routes.js' // Import the user routes
import skillRouter from './routes/skill.routes.js' // Import the skill routes
import testimonialRouter from './routes/testimonials.routes.js' // Import the testimonial routes

const app = express()

// Database connection
connectDB()

const version = process.env.API_VERSION || 'v1' // API version

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.send('API is healthy')
})

// Routes
app.use(`/api/${version}/auth`, authRouter)
app.use(`/api/${version}/user`, userRouter) // Use authRouter for user routes as well
app.use(`/api/${version}/skills`, skillRouter)
app.use(`/api/${version}/testimonials`, testimonialRouter)

export default app
