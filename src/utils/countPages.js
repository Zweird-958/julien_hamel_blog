import config from "@/web/config"

const countPages = (count) => Math.ceil(count / config.pagination.limit)

export default countPages
