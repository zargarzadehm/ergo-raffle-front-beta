import { memo } from "react";

const DonateRaffleProgress = memo(({ stepBarRef, activeStep }) => {
    return (<>
        <div className="row my-2 step-circle-box">
            {/* <!-- change the width of this row for each step (41% and 83%) --> */}
            <div className="col-12 step-bar zero-width" ref={stepBarRef}/>
            <div className="col-2 step-circle-container">
                {/* <!-- Important! add class "step-active" whenever user presses next and goes to next steps --> */}
                <div className="step-circle step-1-circle step-active"/>
            </div>
            <div className="col-8 step-circle-container">
                <div className={activeStep >= 1 ? "step-circle step-2-circle step-active" : "step-circle step-2-circle"}/>
            </div>
            <div className="col-2 step-circle-container">
                <div className={activeStep >= 2 ? "step-circle step-3-circle step-active" : "step-circle step-3-circle"}/>
            </div>
        </div>
        <div className="row">
            <div className="col-4 text-start">
                <p className="step-text mt-2">Step 1: Wallet Address</p>
            </div>

            <div className="col-4 text-center">
                <p className="step-text mt-2">Step 2: Donation Amount</p>
            </div>
            <div className="col-4 text-end">
                <p className="step-text mt-2">Step 3: Agreement</p>
            </div>
        </div>
    </>)
});

export default DonateRaffleProgress;
