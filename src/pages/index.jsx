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
        {posts.map(({ id, title, content }) => (
          <div key={id} className="bg-card flex flex-col gap-2">
            <h2 className="text-xl">{title}</h2>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
