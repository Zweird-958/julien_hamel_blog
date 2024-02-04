export const up = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.text("title").notNullable().alter()
    table.text("content").notNullable().alter()
  })

  await db.schema.alterTable("comments", (table) => {
    table.text("content").notNullable().alter()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.string("title").notNullable().alter()
    table.string("content").notNullable().alter()
  })

  await db.schema.alterTable("comments", (table) => {
    table.string("content").notNullable().alter()
  })
}
