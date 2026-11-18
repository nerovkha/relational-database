import express from 'express'
import { ReadingList } from '../models/index.js'

const readingListsRouter = express.Router()

readingListsRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const readingList = await ReadingList.create({
    userId: request.body.userId,
    blogId: request.body.blogId,
  })

  return response.status(201).json(readingList)
})

readingListsRouter.put('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const readingList = await ReadingList.findByPk(request.params.id)

  if (!readingList) {
    return response.status(404).end()
  }

  if (readingList.userId !== request.user.id) {
    return response
      .status(403)
      .json({ error: 'only the reading list owner can update it' })
  }

  readingList.read = request.body.read
  await readingList.save()

  return response.json(readingList)
})

export default readingListsRouter
