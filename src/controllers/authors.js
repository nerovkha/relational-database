import express from 'express'
import { sequelize } from '../db/connection.js'

const authorsRouter = express.Router()

authorsRouter.get('/', async (_request, response) => {
  const authors = await sequelize.query(
    `SELECT author, COUNT(*) AS blogs, SUM(likes) AS total_likes
     FROM blogs
     GROUP BY author
     ORDER BY total_likes DESC`,
    { type: sequelize.QueryTypes.SELECT }
  )

  response.json(authors)
})

export default authorsRouter
