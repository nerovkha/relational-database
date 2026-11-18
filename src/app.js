import express from 'express'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import authorsRouter from './controllers/authors.js'
import readingListsRouter from './controllers/readingLists.js'
import { errorHandler, tokenExtractor, userExtractor } from './middleware/index.js'

const app = express()

app.use(express.json())
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)

app.use((_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

app.use(errorHandler)

export default app
