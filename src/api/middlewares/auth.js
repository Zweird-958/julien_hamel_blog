import config from "@/api/config"
import { HttpForbiddenError } from "@/api/errors"
import webConfig from "@/web/config"
import jsonwebtoken from "jsonwebtoken"

const auth = async (ctx) => {
  const {
    req: {
      headers: { authorization },
      cookies: { [webConfig.security.session.cookie.key]: cookies },
    },
    models: { UserModel },
    next,
  } = ctx
  const {
    payload: {
      user: { id },
    },
  } = jsonwebtoken.verify(authorization, config.security.jwt.secret)
  const cookiesJwt = jsonwebtoken.verify(cookies, config.security.jwt.secret)

  if (cookiesJwt.payload !== authorization) {
    throw new HttpForbiddenError()
  }

  const user = await UserModel.query().withGraphFetched("role").findOne({ id })
  ctx.user ||= user

  await next()
}

export default auth
