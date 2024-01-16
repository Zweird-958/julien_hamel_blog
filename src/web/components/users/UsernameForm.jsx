import { usernameValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Button"
import Card from "@/web/components/ui/Card"
import Form from "@/web/components/ui/Form"
import useMutation from "@/web/hooks/useMutation"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { z } from "zod"

const UsernameForm = () => {
  const { session, signIn } = useSession()
  const { mutate: updateUsernameMutate, error: updateUsernameError } =
    useMutation({
      endpoint: "users",
      method: "patch",
      onSuccess: ({
        data: {
          result: [jwt],
        },
      }) => {
        signIn(jwt)
      },
    })
  const updateUsername = (data) => {
    updateUsernameMutate({
      queryId: session.user.id,
      ...data,
    })
  }
  const updateUsernameSchema = z.object({
    username: usernameValidator,
  })

  return (
    <Card>
      <Form
        className="flex gap-2 w-full items-end px-4"
        fields={[{ label: "Username", name: "username" }]}
        defaultValues={{ username: session.user.username }}
        onSubmit={updateUsername}
        schema={updateUsernameSchema}
      >
        <Button className="h-12">Save</Button>
      </Form>
      <div className="px-4">
        {updateUsernameError && (
          <Alert
            variant="danger"
            message={getErrorMessage(updateUsernameError)}
          />
        )}
      </div>
    </Card>
  )
}

export default UsernameForm
