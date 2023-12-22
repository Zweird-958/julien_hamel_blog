import Link from "@/web/components/ui/Link"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const Post = () => {
  const {
    query: { postId },
  } = useRouter()
  const { data: { data: { result: posts = [] } = {} } = {} } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => readResource(`posts/${postId}`),
  })

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-lg w-full mt-2">
        {posts.map(({ id, title, content, author: { username } }) => (
          <div key={id} className="flex flex-col gap-4 px-4 py-2">
            <h1 className="text-2xl border-b-2">{title}</h1>
            <p>{content}</p>
            <Link href={`user/${username}`} className="self-end">
              {username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Post
