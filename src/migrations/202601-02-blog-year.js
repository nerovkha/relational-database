export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year', {
    type: 'INTEGER',
    validate: { min: 1991, max: new Date().getFullYear() },
  })
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('blogs', 'year')
}
