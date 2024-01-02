import { pageValidator } from "@/utils/validators"
import PostCard from "@/web/components/PostCard"
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
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <Pagination page={parseInt(page, 10)} countPages={countPages} />
    </div>
  )
}

export default Home
