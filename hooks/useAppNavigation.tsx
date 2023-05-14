import {useRouter} from "next/router";
import useLoading from "./useLoading";

interface IGoToParams {
    pathname: string
    showLoading?: boolean
}

export const useAppNavigation = () => {
    const router = useRouter()
    const {handleOpen, handleClose} = useLoading()

    const goTo = async (data: IGoToParams) => {
        if (router.pathname === data.pathname) {
            return
        }

        if (data.showLoading) {
            await handleOpen()
        }

        try {
            await router.push({pathname: data.pathname, query: router.query})
        } catch (e) {
            alert("ERRO")
        } finally {
            handleClose()
        }
    }

    return {
        goTo,
    }
}
