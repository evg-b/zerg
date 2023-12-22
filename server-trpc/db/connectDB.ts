import mongoose from 'mongoose'

const dbUrl = 'mongodb://localhost:27017/zergdb'

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('Database connected [ok]')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
