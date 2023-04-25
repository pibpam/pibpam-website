import React, {useContext} from "react";
import {LoadingContext} from "../contexts/loading";

const useLoading = () => {
    const {setIsLoading, isLoading} = useContext(LoadingContext)

    const handleOpen = async () => {
        setIsLoading(true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 500)
        })
    }

    const handleClose = () => {
        setIsLoading(false)
    }


    return {isLoading, handleOpen, handleClose}
}

export default useLoading
