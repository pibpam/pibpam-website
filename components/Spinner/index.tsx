import React from "react";
import { SpinnerSvg } from "./styles"

const Spinner: React.FC = () => {
    return (
        <div>
            <SpinnerSvg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </SpinnerSvg>
        </div>
    )
}

export default Spinner
