import { memo } from "react";
import Erg from "../../components/Erg";

const AskForDonationBox = memo(({raffle}) => {
    const remainingErg = ((raffle.goal) || 0) - ((raffle.ticket && raffle.ticket.erg) || 0) > 0 ? (raffle.goal - (raffle.ticket && raffle.ticket.erg) || 0) : 0
    const collectedErg = ((raffle.ticket && raffle.ticket.erg) || 0);
    const progress = () => {
        return ((1 - (raffle.goal - ((raffle.ticket && raffle.ticket.erg) || 0)) / raffle.goal)) * 100;
    }
    return (<div className="ask-for-donation-box text-center mt-5">
        <div className="heart-jar"></div>

        <div className="progress-container mb-5">
            <div className="progress-bar" style={{width: progress() + '%'}}></div>
            <div className="raised">
                <p className="mt-1">
                    {collectedErg === 0 ? "No ERG" : (
                        <span className="collected-erg"><Erg erg={collectedErg} shouldDisplay={true}/></span>
                    )}
                    &nbsp;{collectedErg === 0 ? "Has" : "Have"} Been Collected So Far.
                    <br className="d-lg-none"/>
                    <span className="total-erg"> <Erg erg={remainingErg} shouldDisplay={true}/> </span>
                    to Go!
                </p>
            </div>
        </div>
        <h3 className="help-request mt-5">
            Get Your Tickets!
        </h3>
    </div>)
})

export default AskForDonationBox;
