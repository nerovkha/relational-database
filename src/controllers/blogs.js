import express from 'express'
import { Blog } from '../models/index.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.findBySearch(request.query.search)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.create({
    ...request.body,
    userId: request.user.id,
  })

  return response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findByPk(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if (blog.userId !== request.user.id) {
    return response
      .status(403)
      .json({ error: 'only the creator can delete a blog' })
  }

  await blog.destroy()
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByPk(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = request.body.likes
  await blog.save()

  return response.json(blog)
})

export default blogsRouter
