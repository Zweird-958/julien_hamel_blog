export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("roles").del()

  // Inserts seed entries
  await knex("roles").insert([
    { id: 1, name: "user" },
    { id: 2, name: "author" },
    { id: 3, name: "admin" },
  ])
}
