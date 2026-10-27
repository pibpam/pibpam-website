import { useRouter } from "next/router";
import usePostMessage from "./usePostMessage";

interface IGoToParams {
  pathname: string
  resetHistory?: boolean
  query?: Record<string, string>
}

export const useAppNavigation = () => {
  const router = useRouter()
  const { sendMessage } = usePostMessage()

  const handleSendMessage = (route: string) => {
    sendMessage({ action: "changeRoute", route })
  }

  const goTo = async ({ resetHistory = false, ...data }: IGoToParams) => {
    if (router.pathname === data.pathname) {
      return
    }

    let localHistory = [] as string[] | undefined

    const { history } = router.query

    if (!resetHistory) {
      if (history) {
        if (Array.isArray(history)) {
          localHistory = history
        } else {
          localHistory = [history]
        }
      }
    }

    if (data.pathname !== "/") {
      localHistory?.push(data.pathname)
    }

    try {
      const query = router.query
      if (localHistory) {
        query.history = localHistory
      } else {
        delete query.history
      }
      await router.push({ pathname: data.pathname, query: data.query ? data.query : query })
      handleSendMessage(data.pathname)
    } catch (e) {
      alert("ERRO")
    }
  }

  const goBack = async ({ fallback }: { fallback?: string }) => {
    let navigateTo = fallback || "/"
    const { history } = router.query

    if (history && Array.isArray(history)) {
      if (history.length > 1) {
        navigateTo = history[history.length - 2]
      }

      history.pop()
    }

    try {
      const query = router.query
      if (!Array.isArray(history) || !history.length) {
        delete query.history
      } else {
        query.history = history
      }
      await router.push({ pathname: navigateTo, query })
      handleSendMessage(navigateTo)
    } catch (e) {
      alert("ERRO")
    }
  }


  return {
    goTo,
    goBack
  }
}
