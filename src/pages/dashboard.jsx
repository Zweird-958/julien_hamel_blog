import { useSession } from "@/web/components/SessionContext"
import Card from "@/web/components/ui/Card"
import useQuery from "@/web/hooks/useQuery"

const Dashboard = () => {
  const { session } = useSession()
  const {
    data: {
      meta: { count: commentsCount },
    },
  } = useQuery({
    endpoint: "comments",
    params: {
      authorId: session && session.user.id,
    },
  })
  const {
    data: {
      meta: { count: postsCount },
    },
  } = useQuery({
    endpoint: "posts",
    params: {
      authorId: session && session.user.id,
    },
  })

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-2 justify-center items-center max-w-lg w-full">
        <h1 className="text-2xl mt-2 font-bold">Dashboard</h1>
        <Card>
          <p>Comments count: {commentsCount}</p>
        </Card>
        <Card>
          <p>Posts count: {postsCount}</p>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
