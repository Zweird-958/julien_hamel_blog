import config from "@/api/config"
import webConfig from "@/web/config"
import genCookies from "@/api/utils/genCookies"
import ms from "ms"

const genSessionCookies = (cookieJwt) =>
  genCookies({
    name: webConfig.security.session.cookie.key,
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: webConfig.security.session.cookie.secure,
    value: cookieJwt,
    expires: Date.now() + ms(config.security.jwt.expiresIn),
  })

export default genSessionCookies
