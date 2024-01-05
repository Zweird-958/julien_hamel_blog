import config from "@/api/config"
import BaseModel from "@/db/models/BaseModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"
import RoleModel from "@/db/models/RoleModel"
import CommentModel from "@/db/models/CommentModel"
import knex from "knex"

export const createContext = ({ req, res, next, requestId }) => {
  const send = (result, meta = {}) => {
    res.send({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  }
  const db = knex(config.db)

  BaseModel.knex(db)

  return {
    requestId,
    req,
    res,
    next,
    send,
    db,
    models: {
      UserModel,
      PostModel,
      CommentModel,
      RoleModel,
    },
  }
}
