import { resourceActions } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"

const useCustomQuery = ({ endpoint, params, data, method = "get" }) => {
  const queryString = new URLSearchParams(params).toString()

  return useQuery({
    queryKey: [endpoint.split("/"), params && Object.values(params)].flat(),
    queryFn: () =>
      resourceActions[method](
        `${endpoint}${queryString && `?${queryString}`}`,
        data,
      ),
    initialData: { data: {} },
  })
}

export default useCustomQuery
