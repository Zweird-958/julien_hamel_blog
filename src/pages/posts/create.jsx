import { createPostSchema } from "@/utils/schemas"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import Form from "@/web/components/ui/Form"
import { createResource } from "@/web/services/apiClient"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { useMutation } from "@tanstack/react-query"

const CreatePost = () => {
  const { mutate, error, isSuccess, isPending } = useMutation({
    mutationFn: (data) => createResource("posts", data),
  })
  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <CenterDiv>
      <Form
        schema={createPostSchema}
        isLoading={isPending}
        defaultValues={{ title: "", content: "" }}
        onSubmit={onSubmit}
        title="Create Post"
        fields={[
          { label: "Title", name: "title" },
          { label: "Content", name: "content" },
        ]}
      >
        {isSuccess && (
          <Alert message="Post created successfully!" className="w-full" />
        )}
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

export default CreatePost
