import React, { useContext } from "react";
import ThemeContext from "../../context";

const SupportLink = props => {
    const context = useContext(ThemeContext);
    const openSupportBot = () => {
        window.open(context.info.supportUrl, "_blank")
    }
    return (
        <div>
            <div className="submit-btn-container text-center">
                <button type="Submit" className="btn support-submit mt-5" onClick={openSupportBot}>
                    Go to Support Bot in Discord
                </button>
            </div>
        </div>
    )
}


export default SupportLink
