import "@/styles/globals.css"
import { SessionContextProvider } from "@/web/components/SessionContext"
import Page from "@/web/components/ui/Page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </SessionContextProvider>
    </QueryClientProvider>
  )
}
