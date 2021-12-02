import IconBox from '../../pages/raffle/IconBox';
import DonationHeader from '../../pages/raffle/donate/DonationHeader';

const RaffleDonateMiddleBar = ({ raffle }) => {
    return (<>
        <section id="raffle-icons" className="mt-5">
            <div className="container">
                <IconBox raffle={raffle} />
            </div>
        </section>
        <section id="ask-for-donation" className="mt-5">
            <div className="container">
                <DonationHeader raffle={raffle} />
            </div>
        </section>
    </>)
}

export default RaffleDonateMiddleBar;
