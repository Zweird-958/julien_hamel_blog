import countPages from "@/utils/countPages"
import { pageValidator } from "@/utils/validators"
import CommentCard from "@/web/components/comments/CommentCard"
import CommentForm from "@/web/components/comments/CommentForm"
import PostCard from "@/web/components/posts/PostCard"
import Pagination from "@/web/components/ui/Pagination"
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
    refetch: refetchPost,
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
  const numberOfPages = countPages(count)

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-lg w-full mt-2 px-4 items-center">
        {post && <PostCard post={post} singlePage refetchPost={refetchPost} />}
        <CommentForm postId={postId} onSuccess={refetch} />
        {count > 0 && (
          <>
            <h2 className="text-2xl">Comments</h2>
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
            <Pagination
              page={page}
              numberOfPages={numberOfPages}
              pathname={`/posts/${postId}`}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Post
