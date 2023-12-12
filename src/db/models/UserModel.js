import BaseModel from "@/db/models/BaseModel"
import { raw } from "objection"

class UserModel extends BaseModel {
  static tableName = "users"

  static modifiers = {
    insensitiveCase(query, username) {
      query.select().where(raw("LOWER(username)"), username.toLowerCase())
    },
  }
}

export default UserModel
