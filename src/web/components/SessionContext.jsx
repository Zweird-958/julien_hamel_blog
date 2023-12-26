import config from "@/web/config"
import { deleteResource } from "@/web/services/apiClient"
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
  const signIn = useCallback((jwt) => {
    localStorage.setItem(config.security.session.cookie.key, jwt)

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])
  const clearSession = useCallback(() => {
    localStorage.removeItem(config.security.session.cookie.key)
    setSession(null)
  }, [])
  const signOut = useCallback(async () => {
    await deleteResource("sessions")
    clearSession()
  }, [clearSession])

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
