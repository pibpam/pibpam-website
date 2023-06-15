import {useRouter} from "next/router";
import useLoading from "./useLoading";

interface IGoToParams {
    pathname: string
    showLoading?: boolean
    resetHistory?: boolean
}

export const useAppNavigation = () => {
    const router = useRouter()
    const {handleOpen, handleClose} = useLoading()

    const goTo = async ({resetHistory = false, ...data}: IGoToParams) => {
        if (router.pathname === data.pathname) {
            return
        }

        let localHistory = [] as string[] | undefined

        const {history} = router.query

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

        if (data.showLoading) {
            await handleOpen()
        }

        try {
            const query = router.query
            if (localHistory) {
                query.history = localHistory
            } else {
                delete query.history
            }
            await router.push({pathname: data.pathname, query})
        } catch (e) {
            alert("ERRO")
        } finally {
            handleClose()
        }
    }

    const goBack = async ({fallback}: { fallback?: string }) => {
        let navigateTo = fallback || "/"
        const {history} = router.query

        if (history && Array.isArray(history)) {
            if (history.length > 1) {
                navigateTo = history[history.length - 2]
            }

            history.pop()
        }

        await handleOpen()
        try {
            const query = router.query
            if (!Array.isArray(history) || !history.length) {
                delete query.history
            } else {
                query.history = history
            }
            alert("Navigate")
            alert(navigateTo)
            await router.push({pathname: navigateTo, query})
        } catch (e) {
            alert("ERRO")
        } finally {
            handleClose()
        }
    }


    return {
        goTo,
        goBack
    }
}
