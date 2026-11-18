import { sequelize, connectToDatabase } from '../db/connection.js'
import { Blog } from '../models/index.js'

const main = async () => {
  await connectToDatabase()
  const blogs = await Blog.findAll()
  blogs.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
  await sequelize.close()
}

main()
