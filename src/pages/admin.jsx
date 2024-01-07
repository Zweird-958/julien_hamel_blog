import { useSession } from "@/web/components/SessionContext"
import UserList from "@/web/components/UserList"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import LoaderScreen from "@/web/components/ui/LoaderScreen"
import useMutation from "@/web/hooks/useMutation"
import useQuery from "@/web/hooks/useQuery"
import getErrorMessage from "@/web/utils/getErrorMessage"

const Admin = () => {
  const { session } = useSession()
  const {
    data: { result: users },
    isLoading,
    error,
    refetch,
  } = useQuery({
    endpoint: "users",
    keys: [session],
  })
  const { mutate: editUser, error: editUserError } = useMutation({
    endpoint: "users",
    method: "patch",
    onSuccess: refetch,
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
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <UserList users={users} editUser={editUser} error={editUserError} />
    </div>
  )
}

export default Admin
