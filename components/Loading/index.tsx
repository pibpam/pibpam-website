import React, {useEffect, useState} from "react";
import useLoading from "../../hooks/useLoading";
import Spinner from "../Spinner";
import { Container } from "./styles"

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
        <Container $closed={closing}>
            <Spinner/>
        </Container>
    )
}

export default Loading
