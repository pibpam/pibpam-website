import React, {useState} from "react";

const useMenu = () => {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => {
        setOpen(state => !state)
    }

    return {open, setOpen, toggleMenu}
}

export default useMenu