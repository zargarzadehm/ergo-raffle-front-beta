import { memo } from "react";

const RaffleBarStep = memo(({activeStep, stepBarRef})=> {
    return(<div className="create-raffle-header mb-3">
    <h3 className="help-request create-raffle-title text-center mt-3">
      Ready to create a new raffle?
    </h3>
    <div className="row my-2 step-circle-box">
      {/* <!-- change the width of this row for each step (41% and 83%) --> */}
      <div className="col-12 step-bar zero-width" ref={stepBarRef}></div>
      <div className="col-2 step-circle-container">
        {/* <!-- Important! add class "step-active" whenever user presses next and goes to next steps --> */}
        <div className="step-circle step-1-circle step-active"></div>
      </div>
      <div className="col-8 step-circle-container">
        <div className={activeStep >= 6 ? "step-circle step-2-circle step-active" : "step-circle step-2-circle"}></div>
      </div>
      <div className="col-2 step-circle-container">
        <div className={activeStep >= 10 ? "step-circle step-3-circle step-active" : "step-circle step-3-circle"}></div>
      </div>
    </div>
    <div className="row">
      <div className="col-4 text-start">
        <p className="step-text mt-2">Step 1: raffle’s specifications</p>
      </div>
      <div className="col-4 text-center">
        <p className="step-text mt-2">Step 2: donation goal</p>
      </div>
      <div className="col-4 text-end">
        <p className="step-text mt-2">Step 3: agree and finish</p>
      </div>
    </div>
  </div>)
});

export default RaffleBarStep;