const USER_TABLE = {
  id: {
    type: 'INTEGER',
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: 'TEXT',
    allowNull: false,
  },
  username: {
    type: 'TEXT',
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: 'TEXT',
    allowNull: false,
  },
  disabled: {
    type: 'BOOLEAN',
    allowNull: false,
    defaultValue: false,
  },
  created_at: {
    type: 'DATE',
    allowNull: false,
  },
  updated_at: {
    type: 'DATE',
    allowNull: false,
  },
}

const BLOG_TABLE = {
  id: {
    type: 'INTEGER',
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: 'TEXT',
    allowNull: false,
  },
  url: {
    type: 'TEXT',
    allowNull: false,
  },
  title: {
    type: 'TEXT',
    allowNull: false,
  },
  likes: {
    type: 'INTEGER',
    allowNull: false,
    defaultValue: 0,
  },
  user_id: {
    type: 'INTEGER',
    allowNull: true,
    references: { model: 'users', key: 'id' },
  },
  created_at: {
    type: 'DATE',
    allowNull: false,
  },
  updated_at: {
    type: 'DATE',
    allowNull: false,
  },
}

const SESSION_TABLE = {
  id: {
    type: 'TEXT',
    primaryKey: true,
  },
  user_id: {
    type: 'INTEGER',
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  created_at: {
    type: 'DATE',
    allowNull: false,
  },
  updated_at: {
    type: 'DATE',
    allowNull: false,
  },
}

const READING_LIST_TABLE = {
  id: {
    type: 'INTEGER',
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: 'INTEGER',
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blog_id: {
    type: 'INTEGER',
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  read: {
    type: 'BOOLEAN',
    allowNull: false,
    defaultValue: false,
  },
  created_at: {
    type: 'DATE',
    allowNull: false,
  },
  updated_at: {
    type: 'DATE',
    allowNull: false,
  },
}

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('users', USER_TABLE)
  await queryInterface.createTable('blogs', BLOG_TABLE)
  await queryInterface.createTable('sessions', SESSION_TABLE)
  await queryInterface.createTable('reading_lists', READING_LIST_TABLE)
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('reading_lists')
  await queryInterface.dropTable('sessions')
  await queryInterface.dropTable('blogs')
  await queryInterface.dropTable('users')
}
