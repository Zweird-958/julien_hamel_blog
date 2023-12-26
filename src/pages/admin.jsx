import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import LoaderScreen from "@/web/components/ui/LoaderScreen"
import useQuery from "@/web/hooks/useQuery"
import getErrorMessage from "@/web/utils/getErrorMessage"

const Admin = () => {
  const { session } = useSession()
  const {
    data: { result: users },
    isLoading,
    error,
  } = useQuery({
    endpoint: "users",
    keys: [session],
  })

  if (error) {
    return (
      <CenterDiv>
        <Alert message={getErrorMessage(error)} variant="danger" />
      </CenterDiv>
    )
  }

  if (isLoading) {
    return <LoaderScreen />
  }

  return (
    <div className="px-4 flex flex-col items-center gap-4 mt-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-4 grow max-w-sm w-full">
        {users.map(({ id, email, username, role: { name: roleName } }) => (
          <div className="bg-card rounded-lg px-4 py-2" key={id}>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Role: {roleName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin
