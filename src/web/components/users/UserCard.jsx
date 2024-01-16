import Button from "@/web/components/ui/Button"
import Card from "@/web/components/ui/Card"
import AdminForm from "@/web/components/users/AdminForm"

const UserCard = (props) => {
  const { user, disableOnClick, roles, onSubmit, error, deleteUser } = props
  const handleDeleteUser = () => {
    deleteUser(user.id)
  }

  return (
    <Card>
      <Button
        className="w-fit self-end"
        color="danger"
        onClick={handleDeleteUser}
      >
        Delete
      </Button>
      <AdminForm
        user={user}
        roles={roles}
        onSubmit={onSubmit}
        error={error}
        disableOnClick={disableOnClick}
      />
    </Card>
  )
}

export default UserCard
