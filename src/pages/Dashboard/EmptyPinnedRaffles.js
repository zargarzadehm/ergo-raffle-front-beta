import React from "react";
import Raffle from "../../components/Raffle";
import { PIN_KEY } from "../../statics";

const EmptyPinnedRaffles = () => {
    const pinned = window.localStorage.getItem(PIN_KEY).split(",").filter(item => !!item)
    if(pinned.length > 0){
        return null
    }
    return (
        <section id="all-your-donations-container" className="mt-header">
            <div className="container">
                <h2 className="dashboard-title text-center mb-4">Pinned Raffles</h2>
                <div id="all-your-donations" className="row g-4">
                    <p className="text-center mb-4">No Raffles Found</p>
                </div>
            </div>
        </section>
    )
}


export default EmptyPinnedRaffles
