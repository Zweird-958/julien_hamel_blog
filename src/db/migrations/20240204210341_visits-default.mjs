export const up = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.integer("visits").default(0).alter()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.integer("visits").default(1).alter()
  })
}
