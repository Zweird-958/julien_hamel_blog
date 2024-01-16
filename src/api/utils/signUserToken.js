import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"

const signUserToken = (user) => {
  const jwt = jsonwebtoken.sign(
    {
      payload: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
    },
    config.security.jwt.secret,
    { expiresIn: config.security.jwt.expiresIn },
  )
  const cookieJwt = jsonwebtoken.sign(
    { payload: jwt },
    config.security.jwt.secret,
    { expiresIn: config.security.jwt.expiresIn },
  )

  return {
    jwt,
    cookieJwt,
  }
}

export default signUserToken
