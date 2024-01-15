import UserCard from "@/web/components/UserCard"
import useQuery from "@/web/hooks/useQuery"
const UserList = (props) => {
  const { users, editUser, deleteUser, error } = props
  const {
    data: { result: roles },
  } = useQuery({ endpoint: "roles" })
  const handleDisable = (event) => {
    const id = event.target.getAttribute("data-user-id")
    disableUser(id)
  }
  const disableUser = (id) => {
    editUser({ disable: true, queryId: id })
  }
  const onSubmit = (data) => {
    editUser({ ...data, queryId: data.id })
  }
  const handleDelete = (id) => {
    deleteUser({ queryId: id })
  }

  return (
    <div className="flex flex-col gap-4 grow max-w-sm w-full">
      {users.map((user) => (
        <UserCard
          user={user}
          key={user.id}
          disableOnClick={handleDisable}
          roles={roles}
          onSubmit={onSubmit}
          error={error}
          deleteUser={handleDelete}
        />
      ))}
    </div>
  )
}

export default UserList
