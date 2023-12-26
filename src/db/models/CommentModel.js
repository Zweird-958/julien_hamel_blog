import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class CommentModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      author: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        filter: (query) => query.select("id", "username"),
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
    }
  }
}

export default CommentModel
