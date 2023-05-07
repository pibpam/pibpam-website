import {useRouter} from "next/router";

interface IGoToParams {
    pathname: string
}

export const useAppNavigation = () => {
    const router = useRouter()

    const goTo = async (data: IGoToParams) => {
        if (router.pathname === data.pathname) {
            return
        }
        await router.push({pathname: data.pathname, query: router.query})
    }

    return {
        goTo
    }
}
