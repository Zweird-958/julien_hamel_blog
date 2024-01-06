import { pageValidator } from "@/utils/validators"
import CommentCard from "@/web/components/CommentCard"
import CommentForm from "@/web/components/CommentForm"
import PostCard from "@/web/components/PostCard"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import useQuery from "@/web/hooks/useQuery"
import { useRouter } from "next/router"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.parse(page),
  },
})
const Post = (props) => {
  const { page } = props
  const {
    query: { postId },
  } = useRouter()
  const {
    data: {
      result: [post],
    },
  } = useQuery({
    endpoint: `posts/${postId}`,
  })
  const {
    data: {
      result: comments,
      meta: { count },
    },
    refetch,
  } = useQuery({
    endpoint: `comments`,
    params: {
      page,
      postId,
    },
  })
  const countPages = Math.ceil(count / config.pagination.limit)

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-lg w-full mt-2 px-4 items-center">
        {post && <PostCard post={post} />}
        <CommentForm postId={postId} onSuccess={refetch} />
        <h2 className="text-2xl">Comments</h2>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onSuccess={refetch}
            postId={postId}
          />
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
