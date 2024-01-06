import { readResource } from "@/web/services/apiClient"
import { useQuery as useTanstackQuery } from "@tanstack/react-query"

const useQuery = ({ endpoint, params, keys = [] }) => {
  const queryString = new URLSearchParams(params).toString()
  const {
    data: {
      data: { result, meta },
      ...dataRest
    },
    ...query
  } = useTanstackQuery({
    queryKey: [
      endpoint.split("/"),
      params && Object.values(params),
      keys,
    ].flat(),
    queryFn: () =>
      readResource(`${endpoint}${queryString && `?${queryString}`}`),
    initialData: { data: { result: [], meta: {} } },
  })

  return { data: { result, meta, ...dataRest }, ...query }
}

export default useQuery
