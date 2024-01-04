import Button from "@/web/components/ui/Button"
import Card from "@/web/components/ui/Card"
const UserCard = (props) => {
  const { user, disableOnClick } = props
  const {
    id,
    email,
    username,
    role: { name: roleName },
    deletedAt,
  } = user

  return (
    <Card key={id}>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Role: {roleName}</p>
      <Button
        className="w-fit self-end"
        onClick={disableOnClick}
        data-user-id={id}
        disabled={deletedAt}
      >
        Disable
      </Button>
    </Card>
  )
}

export default UserCard
