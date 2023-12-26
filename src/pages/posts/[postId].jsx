import { commentSchema } from "@/utils/schemas"
import { pageValidator } from "@/utils/validators"
import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import Card from "@/web/components/ui/Card"
import Form from "@/web/components/ui/Form"
import Link from "@/web/components/ui/Link"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import useMutation from "@/web/hooks/useMutation"
import useQuery from "@/web/hooks/useQuery"
import { useRouter } from "next/router"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.parse(page),
  },
})
// eslint-disable-next-line max-lines-per-function
const Post = (props) => {
  const { page } = props
  const { session, clearSession } = useSession()
  const {
    query: { postId },
  } = useRouter()
  const {
    data: { result: posts },
  } = useQuery({
    endpoint: `posts/${postId}`,
  })
  const { mutate, isPending, isSuccess } = useMutation({
    endpoint: "comments",
    params: {
      postId,
    },
    onError: ({ response: { status } }) => {
      if (status === 403) {
        clearSession()
      }
    },
  })
  const {
    data: {
      result: comments,
      meta: { count },
    },
  } = useQuery({
    endpoint: `comments`,
    params: {
      page,
      postId,
    },
    keys: [isSuccess],
  })
  const countPages = Math.ceil(count / config.pagination.limit)
  const onSubmit = (credentials) => {
    mutate(credentials)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-lg w-full mt-2 px-4">
        {posts.map(({ id, title, content, author: { username } }) => (
          <Card key={id} className="flex flex-col gap-4 px-4 py-2">
            <h1 className="text-2xl border-b-2">{title}</h1>
            <p>{content}</p>
            <Link href={`user/${username}`} className="self-end">
              {username}
            </Link>
          </Card>
        ))}
        <div className="flex items-center gap-4 flex-col">
          {session && (
            <Form
              schema={commentSchema}
              isLoading={isPending}
              defaultValues={{ comment: "" }}
              onSubmit={onSubmit}
              title="Add Comment"
              fields={[{ label: "Content", name: "comment", as: "textarea" }]}
            />
          )}
          {isSuccess && <Alert message="Comment added" className="w-full" />}
        </div>
        <h2 className="text-2xl">Comments</h2>
        {comments.map(({ id, content, author: { username } }) => (
          <Card key={id}>
            <p>{content}</p>
            <p className="self-end">{username}</p>
          </Card>
        ))}
        <Pagination
          page={parseInt(page, 10)}
          countPages={countPages}
          pathname={`/posts/${postId}`}
        />
      </div>
    </div>
  )
}

export default Post
