import { pageValidator } from "@/utils/validators"
import Card from "@/web/components/ui/Card"
import Link from "@/web/components/ui/Link"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import useQuery from "@/web/hooks/useQuery"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.parse(page),
  },
})
const Home = (props) => {
  const { page } = props
  const {
    data: {
      result: posts,
      meta: { count },
    },
  } = useQuery({
    endpoint: "posts",
    params: {
      page,
    },
  })
  const countPages = Math.ceil(count / config.pagination.limit)

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-md w-full">
        {posts.map(({ id, title, content, author: { username } }) => (
          <Card key={id}>
            <h2 className="text-xl border-b-2">{title}</h2>
            <p>{content}</p>
            <div className="flex justify-between">
              <Link href={`/posts/${id}`}>See more</Link>
              <p>{username}</p>
            </div>
          </Card>
        ))}
      </div>
      <Pagination page={parseInt(page, 10)} countPages={countPages} />
    </div>
  )
}

export default Home
