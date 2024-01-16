import BaseModel from "@/db/models/BaseModel"
import RoleModel from "@/db/models/RoleModel"
import { raw } from "objection"

class UserModel extends BaseModel {
  static tableName = "users"

  static modifiers = {
    insensitiveCase(query, username) {
      query.select().where(raw("LOWER(username)"), username.toLowerCase())
    },
    format(query) {
      query
        .select(
          "username",
          "email",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "id",
          "disabled",
        )
        .withGraphFetched("role")
    },
  }

  static get relationMappings() {
    return {
      role: {
        modelClass: RoleModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "users.roleId",
          to: "roles.id",
        },
      },
    }
  }
}

export default UserModel
