import { memo } from "react";
import StepTwoDonation from './StepTwoDonation'
import DonationBackButton from "./DonationBackButton";
import DonationNextButton from "./DonationNextButton";
const DonationRaffleDonationAmount = memo(({ ticketCount, ticketCountHandler, reduceStep, raffle, toggleNextStep }) => {
    return (<div className={"step-content step-2 text-center"}>
        <StepTwoDonation handleRadioChange={(count) => ticketCountHandler(count)} raffle={raffle} defaultValue={ticketCount} />
        <div className="row action-button mb-5">
            <DonationBackButton reduceStep={reduceStep} />
            <DonationNextButton toggleNextStep={toggleNextStep} />
        </div>
    </div>);
});

export default DonationRaffleDonationAmount;