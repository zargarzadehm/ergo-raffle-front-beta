import { memo } from "react";
import DonateTicketCount from '../../pages/raffle/donate/DonateTicketCount'
import DonationBackButton from "./DonationBackButton";
import DonationNextButton from "./DonationNextButton";
const DonationRaffleDonationAmount = memo(({ ticketCount, ticketCountHandler, reduceStep, raffle, toggleNextStep }) => {
    return (<div className={"step-content step-2 text-center"}>
        <DonateTicketCount handleRadioChange={(count) => ticketCountHandler(count)} raffle={raffle} defaultValue={ticketCount} />
        <div className="row action-button mb-5">
            <DonationBackButton reduceStep={reduceStep} />
            <DonationNextButton toggleNextStep={toggleNextStep} />
        </div>
    </div>);
});

export default DonationRaffleDonationAmount;
