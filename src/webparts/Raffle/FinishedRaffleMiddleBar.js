import RaffleDestinationInfo from "./RaffleDestinationInfo";
import TotalRaisedMoney from "./RaffleTotalRaiseMoney";

const FinishedRaffleMiddleBar = ({ raffle }) => {

    return (<section id="raffle-details">
        <div className="container">
            <div
                className="row g-1 g-md-2 align-items-center justify-content-between"
            >
                <RaffleDestinationInfo raffle={raffle} />
            </div>
            {raffle.status === 'succeed' ?
                <div id="total-raised" className="text-center raffle-successful-total">
                    <TotalRaisedMoney raffle={raffle} />
                </div>
                : raffle.status === 'failed' ?
                    <div id="total-raised" className="text-center raffle-unsuccessful-total">
                        <TotalRaisedMoney raffle={raffle} />
                    </div>
                    :
                    <div id="total-raised" className="text-center raffle-total">
                        <TotalRaisedMoney raffle={raffle} />
                    </div>
            }
        </div>
    </section>)
}

export default FinishedRaffleMiddleBar;