import 'dotenv/config'

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET || 'devsecret',
  PORT: process.env.PORT || 3002,
}

export default config
