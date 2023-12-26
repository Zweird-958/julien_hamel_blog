import { resourceActions } from "@/web/services/apiClient"
import { useMutation as useTanstackMutation } from "@tanstack/react-query"

const useMutation = ({
  endpoint,
  params,
  method = "post",
  keys = [],
  ...otherProps
}) => {
  const queryString = new URLSearchParams(params).toString()

  return useTanstackMutation({
    mutationKey: [
      endpoint.split("/"),
      params && Object.values(params),
      keys,
    ].flat(),
    mutationFn: (data) =>
      resourceActions[method](
        `${endpoint}${queryString && `?${queryString}`}`,
        data,
      ),
    ...otherProps,
  })
}

export default useMutation
