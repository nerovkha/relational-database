import bcrypt from 'bcrypt'
import { sequelize, connectToDatabase } from '../db/connection.js'
import { Blog, User } from '../models/index.js'

const main = async () => {
  await connectToDatabase()
  await sequelize.sync({ force: true })

  const users = await User.bulkCreate([
    {
      name: 'Matti Luukkainen',
      username: 'mluukkai@iki.fi',
      passwordHash: await bcrypt.hash('salainen', 10),
    },
    {
      name: 'Arto Hellas',
      username: 'hellas@iki.fi',
      passwordHash: await bcrypt.hash('salainen', 10),
    },
  ])

  await Blog.bulkCreate([
    {
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      title: 'React patterns',
      likes: 7,
      year: 2020,
      userId: users[0].id,
    },
    {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      title: 'Go To Statement Considered Harmful',
      likes: 5,
      year: 2004,
      userId: users[0].id,
    },
    {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      title: 'Canonical string reduction',
      likes: 12,
      year: 2010,
      userId: users[1].id,
    },
  ])

  await sequelize.close()
  console.log('database seeded')
}

main()
