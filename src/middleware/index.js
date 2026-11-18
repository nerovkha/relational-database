import jwt from 'jsonwebtoken'
import config from '../config.js'
import { Session, User } from '../models/index.js'

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return next()
  }

  try {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    const session = await Session.findByPk(decodedToken.sessionId)
    if (!session) {
      return response.status(401).json({ error: 'session expired' })
    }

    const user = await User.findByPk(decodedToken.id, {
      attributes: { exclude: ['passwordHash'] },
    })

    if (!user || user.disabled) {
      return response.status(401).json({ error: 'user disabled or missing' })
    }

    request.user = user
  } catch {
    return response.status(401).json({ error: 'token invalid' })
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

export { tokenExtractor, userExtractor, errorHandler }
