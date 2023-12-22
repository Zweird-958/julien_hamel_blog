export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.uuid("id").defaultTo(db.fn.uuid()).primary()
    table.string("title").notNullable()
    table.string("content").notNullable()
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}
