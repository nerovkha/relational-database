import { Sequelize } from 'sequelize'
import config from '../config.js'

export const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: false,
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (error) {
    console.log('connecting database failed:', error.message)
    process.exit(1)
  }
}
