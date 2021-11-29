import React from "react";

const SupportLink = props => {
    const openSupportBot = () => {
        window.open("http://discord.com", "_blank")
    }
    return (
        <div>
            <div className="submit-btn-container text-center">
                <button type="Submit" className="btn support-submit mt-5" onClick={openSupportBot}>
                    Goto support bot in discord
                </button>
            </div>
        </div>
    )
}


export default SupportLink
