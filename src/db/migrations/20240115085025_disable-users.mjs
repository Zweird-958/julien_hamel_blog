export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.boolean("disabled").default(false)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("disabled")
  })
}
