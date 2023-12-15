export const up = async (db) => {
  await db.schema.createTable("roles", (table) => {
    table.increments("id")
    table.enum("name", ["user", "author", "admin"]).notNullable().unique()
  })

  await db.schema.alterTable("users", (table) => {
    table.integer("roleId").notNullable().defaultTo(1)
    table.foreign("roleId").references("id").inTable("roles")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("roleId")
  })

  await db.schema.dropTable("roles")
}
