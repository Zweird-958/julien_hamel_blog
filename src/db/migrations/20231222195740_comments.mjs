export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.uuid("id").defaultTo(db.fn.uuid()).primary()
    table.string("content").notNullable()
    table.uuid("authorId").notNullable()
    table.foreign("authorId").references("id").inTable("users")
    table.uuid("postId").notNullable()
    table.foreign("postId").references("id").inTable("posts")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("comments")
}
