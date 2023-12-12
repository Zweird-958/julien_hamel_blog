import { singInSchema } from "@/utils/schemas"
import SessionContext from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import Form from "@/web/components/ui/Form"
import { createResource } from "@/web/services/apiClient"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useContext } from "react"

const SignUp = () => {
  const router = useRouter()
  const { signIn } = useContext(SessionContext)
  const { mutate, error } = useMutation({
    mutationFn: (data) => createResource("sessions", data),
  })
  const onSubmit = (credentials) => {
    mutate(credentials, {
      onSuccess: ({
        data: {
          result: [jwt],
        },
      }) => {
        signIn(jwt)

        router.push("/")
      },
    })
  }

  return (
    <CenterDiv>
      <Form
        schema={singInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        title="Sign In"
        fields={[
          { label: "Email", name: "email" },
          { label: "Password", name: "password", type: "password" },
        ]}
      >
        {error && (
          <Alert
            variant="error"
            message={getErrorMessage(error)}
            className="w-full"
          />
        )}
      </Form>
    </CenterDiv>
  )
}

export default SignUp
