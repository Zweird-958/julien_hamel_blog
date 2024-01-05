import { useSession } from "@/web/components/SessionContext"
import UserCard from "@/web/components/UserCard"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import LoaderScreen from "@/web/components/ui/LoaderScreen"
import useMutation from "@/web/hooks/useMutation"
import useQuery from "@/web/hooks/useQuery"
import getErrorMessage from "@/web/utils/getErrorMessage"

// eslint-disable-next-line max-lines-per-function
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
  const {
    data: { result: roles },
  } = useQuery({ endpoint: "roles" })
  const { mutate, error: updateError } = useMutation({
    endpoint: "users",
    method: "patch",
    onSuccess: refetch,
  })
  const handleDisable = (event) => {
    const id = event.target.getAttribute("data-user-id")
    disableUser(id)
  }
  const disableUser = (id) => {
    mutate({ disable: true, queryId: id })
  }
  const onSubmit = (data) => {
    mutate({ ...data, queryId: data.id })
  }

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
      <div className="flex flex-col gap-4 grow max-w-sm w-full">
        {users.map((user) => (
          <UserCard
            user={user}
            key={user.id}
            disableOnClick={handleDisable}
            roles={roles}
            mutate={mutate}
            onSubmit={onSubmit}
            error={updateError}
          />
        ))}
      </div>
    </div>
  )
}

export default Admin
