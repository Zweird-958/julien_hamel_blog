export const up = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.uuid("authorId").notNullable()
    table.foreign("authorId").references("id").inTable("users")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.dropColumn("authorId")
  })
}
