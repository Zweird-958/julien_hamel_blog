import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class RoleModel extends BaseModel {
  static tableName = "roles"
  static get relationMappings() {
    return {
      users: {
        modelClass: UserModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "roles.id",
          to: "users.roleId",
        },
      },
    }
  }
}

export default RoleModel
