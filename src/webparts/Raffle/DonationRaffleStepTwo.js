import { memo } from "react";
import StepTwoDonation from '../../webparts/Raffle/StepTwoDonation'
import DonationBackButton from "./DonationBackButton";
import DonationNextButton from "./DonationNextButton";
const DonationRaffleStepTwo = memo(({ ticketCount, ticketCountHandler, reduceStep, toggleNextStep }) => {
    return (<div className={"step-content step-2 text-center"}>
        <StepTwoDonation handleRadioChange={(count) => ticketCountHandler(count)} defaultValue={ticketCount} />
        <div className="row action-button mb-5">
            <DonationBackButton reduceStep={reduceStep} />
            <DonationNextButton toggleNextStep={toggleNextStep} />
        </div>
    </div>);
});

export default DonationRaffleStepTwo;