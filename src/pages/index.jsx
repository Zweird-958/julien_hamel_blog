import Link from "@/web/components/ui/Link"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"

const Home = () => {
  const { data: { data: { result: posts = [] } = {} } = {} } = useQuery({
    queryKey: ["posts"],
    queryFn: () => readResource("posts"),
  })

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-md w-full">
        {posts.map(({ id, title, content, author: { username } }) => (
          <Link
            href={`/posts/${id}`}
            key={id}
            className="bg-card flex flex-col gap-2 px-4 py-2"
          >
            <h2 className="text-xl border-b-2">{title}</h2>
            <p>{content}</p>
            <Link href={`user/${username}`} className="self-end">
              {username}
            </Link>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
