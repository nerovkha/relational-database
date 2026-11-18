import express from 'express'
import bcrypt from 'bcrypt'
import { Blog, ReadingList, Session, User } from '../models/index.js'

const usersRouter = express.Router()

usersRouter.get('/', async (_request, response) => {
  const users = await User.findAll({
    include: {
      model: ReadingList,
      attributes: ['id', 'read'],
      include: {
        model: Blog,
        attributes: ['id', 'author', 'title', 'url', 'likes', 'year'],
      },
    },
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body

  if (!password || password.length < 8) {
    return response
      .status(400)
      .json({ error: 'password must be at least 8 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({ name, username, passwordHash })

  return response.status(201).json(user)
})

usersRouter.put('/:username', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findOne({
    where: { username: request.params.username },
  })

  if (!user) {
    return response.status(404).end()
  }

  if (user.id !== request.user.id) {
    return response.status(403).json({ error: 'only the user themself can update' })
  }

  if (request.body.disabled !== undefined) {
    user.disabled = request.body.disabled
  }

  if (request.body.password) {
    user.passwordHash = await bcrypt.hash(request.body.password, 10)
    await Session.destroy({ where: { userId: user.id } })
  }

  await user.save()

  return response.json(user)
})

usersRouter.get('/:id', async (request, response) => {
  const where = {}

  if (request.query.read === 'true' || request.query.read === 'false') {
    where.read = request.query.read === 'true'
  }

  const user = await User.findByPk(request.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: ReadingList,
      where,
      required: false,
      attributes: ['id', 'read'],
      include: {
        model: Blog,
        attributes: ['id', 'author', 'title', 'url', 'likes', 'year'],
      },
    },
  })

  if (!user) {
    return response.status(404).end()
  }

  return response.json(user)
})

export default usersRouter
