import mongoose from 'mongoose'
import Skill from '../models/skill.model.js'
import dotenv from 'dotenv'

dotenv.config()

const skillsData = [
  {
    name: 'React',
    icon: '⚛️',
    category: 'Frontend',
    projects: ['https://github.com/your-react-project'],
  },
  {
    name: 'Node.js',
    icon: '🟢',
    category: 'Backend',
    projects: ['https://github.com/your-node-project'],
  },
  {
    name: 'Docker',
    icon: '🐳',
    category: 'Tools',
    projects: ['https://github.com/your-docker-project'],
  },
  {
    name: 'PostgreSQL',
    icon: '🐘',
    category: 'Backend',
    projects: ['https://github.com/your-db-project'],
  },
  { name: 'JavaScript', icon: '📜', category: 'Programming', projects: [] },
  { name: 'TypeScript', icon: '🔷', category: 'Programming', projects: [] },
  { name: 'Next.js', icon: '➡️', category: 'Frontend', projects: [] },
  { name: 'Tailwind CSS', icon: '💨', category: 'Frontend', projects: [] },
  { name: 'Express.js', icon: '🚂', category: 'Backend', projects: [] },
  { name: 'Git', icon: '🔧', category: 'Tools', projects: [] },
  { name: 'GraphQL', icon: '🕸️', category: 'Backend', projects: [] },
  { name: 'Redux', icon: '🌀', category: 'Frontend', projects: [] },
  { name: 'JavaScript', icon: '📜', category: 'Programming', projects: [] },
  { name: 'TypeScript', icon: '🔷', category: 'Programming', projects: [] },
  { name: 'Next.js', icon: '➡️', category: 'Frontend', projects: [] },
  { name: 'Tailwind CSS', icon: '💨', category: 'Frontend', projects: [] },
  { name: 'Express.js', icon: '🚂', category: 'Backend', projects: [] },
  { name: 'Git', icon: '🔧', category: 'Tools', projects: [] },
  { name: 'GraphQL', icon: '🕸️', category: 'Backend', projects: [] },
  { name: 'Redux', icon: '🌀', category: 'Frontend', projects: [] },
]

// Add default values for missing fields
const skillsToInsert = skillsData.map((skill) => ({
  ...skill,
  description: skill.description || `${skill.name} skill`,
  yearOfExperience: skill.yearOfExperience || 1,
}))

async function seedSkills() {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    await Skill.deleteMany({})
    await Skill.insertMany(skillsToInsert)
    console.log('Skills seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding skills:', err)
    process.exit(1)
  }
}

seedSkills()
