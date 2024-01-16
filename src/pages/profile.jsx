import { passwordSchema } from "@/utils/schemas"
import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import Card from "@/web/components/ui/Card"
import Form from "@/web/components/ui/Form"
import UsernameForm from "@/web/components/users/UsernameForm"
import useMutation from "@/web/hooks/useMutation"
import getErrorMessage from "@/web/utils/getErrorMessage"

const passwordFields = [
  { label: "Current password", name: "currentPassword", type: "password" },
  { label: "New password", name: "newPassword", type: "password" },
  {
    label: "Confirm new password",
    name: "confirmNewPassword",
    type: "password",
  },
]
const Profile = () => {
  const { session } = useSession()
  const { mutate, error, isSuccess, isPending } = useMutation({
    endpoint: "users",
    method: "patch",
  })
  const onSubmit = (data) => {
    mutate({
      queryId: session.user.id,
      ...data,
    })
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md flex flex-col items-center gap-2 w-full">
        <UsernameForm />
        <Card>
          <Form
            title="Change password"
            fields={passwordFields}
            schema={passwordSchema}
            isLoading={isPending}
            defaultValues={{
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={onSubmit}
          />
          {error && <Alert variant="danger" message={getErrorMessage(error)} />}
          {isSuccess && <Alert message="Password changed successfully" />}
        </Card>
      </div>
    </div>
  )
}

export default Profile
