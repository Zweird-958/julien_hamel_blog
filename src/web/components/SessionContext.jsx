import config from "@/web/config"
import { useMutation } from "@tanstack/react-query"
import jsonwebtoken from "jsonwebtoken"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

export const useSession = () => useContext(SessionContext)
export const SessionContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const clearSession = useCallback(() => {
    localStorage.removeItem(config.security.session.cookie.key)
    setSession(null)
  }, [])
  const { mutate } = useMutation({
    endpoint: "sessions",
    method: "delete",
    onSettled: clearSession,
  })
  const signIn = useCallback((jwt) => {
    localStorage.setItem(config.security.session.cookie.key, jwt)

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])
  const signOut = useCallback(() => {
    mutate()
  }, [mutate])

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.session.cookie.key)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt)
    setSession(payload)
  }, [])

  return (
    <SessionContext.Provider
      {...props}
      value={{ session, signIn, signOut, clearSession }}
    />
  )
}
const SessionContext = createContext()

export default SessionContext
