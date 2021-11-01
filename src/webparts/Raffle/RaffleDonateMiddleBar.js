import RaffleIconBox from './RaffleIconBox';
import AskForDonationBox from './AskForDonationBox';

const RaffleDonateMiddleBar = ({ raffle }) => {
    return (<>
        <section id="raffle-icons" className="mt-5">
            <div className="container">
                <RaffleIconBox raffle={raffle} />
            </div>
        </section>
        <section id="ask-for-donation" className="mt-5">
            <div className="container">
                <AskForDonationBox raffle={raffle} />
            </div>
        </section>
    </>)
}

export default RaffleDonateMiddleBar;