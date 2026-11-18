import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import config from '../config.js'
import { Session, User } from '../models/index.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.scope('withHash').findOne({
    where: { username },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect || user?.disabled) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const session = await Session.create({ id: randomUUID(), userId: user.id })

  const userForToken = {
    id: user.id,
    username: user.username,
    sessionId: session.id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  return response
    .status(200)
    .send({ token, name: user.name, username: user.username })
})

export default loginRouter
