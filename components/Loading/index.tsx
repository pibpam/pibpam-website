import React, {useEffect, useState} from "react";
import styles from "../../styles/components/Loading.module.scss"
import useLoading from "../../hooks/useLoading";
import Spinner from "../Spinner";

const Loading: React.FC = () => {
    const {isLoading} = useLoading()

    const [open, setOpen] = useState(isLoading)
    const [closing, setClosing] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setClosing(true)
            setTimeout(() => {
                setOpen(false)
                setClosing(false)
            }, 200)
        } else {
            setOpen(true)
            setClosing(false)
        }
    }, [isLoading])

    if (!open) {
        return null
    }

    return (
        <div className={`${styles.container}  ${closing && styles.closed}`}>
            <Spinner/>
        </div>
    )
}

export default Loading
