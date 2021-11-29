import { memo } from "react";
import StepThreeDonation from "./StepThreeDonation";

const DonationRaffleStepThree = memo(({ handleFeedback, reduceStep, setModalInfo, setModalStatus, donate, isTermsAccepted }) => {
    return (<div className={"step-content step-3 text-center"}>
        <StepThreeDonation handleFeedback={(value, response) => handleFeedback(value, response)} />
        <div className="row action-button mb-5">
            <div className="col-6 text-end">
                <button type="button" onClick={reduceStep} className="btn donate-back back-btn mt-3">
                    Back
                </button>
            </div>
            <div className="col-6 text-start">
                <button
                    type="button"
                    disabled={isTermsAccepted}
                    className="btn donate-next finish mt-3"
                    onClick={() => donate(setModalInfo, setModalStatus)}
                >
                    Donate
                </button>
            </div>
        </div>
    </div>)
});

export default DonationRaffleStepThree;
