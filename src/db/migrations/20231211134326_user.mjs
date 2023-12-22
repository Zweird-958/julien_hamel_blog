export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.uuid("id").defaultTo(db.fn.uuid()).primary()
    table.text("username").notNullable().unique()
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
