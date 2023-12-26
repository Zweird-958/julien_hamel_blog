import { singInSchema } from "@/utils/schemas"
import SessionContext from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import Form from "@/web/components/ui/Form"
import useMutation from "@/web/hooks/useMutation"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { useRouter } from "next/router"
import { useContext } from "react"

const SignUp = () => {
  const router = useRouter()
  const { signIn } = useContext(SessionContext)
  const { mutate, error, isPending } = useMutation({
    endpoint: "sessions",
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
        isLoading={isPending}
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
            variant="danger"
            message={getErrorMessage(error)}
            className="w-full"
          />
        )}
      </Form>
    </CenterDiv>
  )
}

export default SignUp
