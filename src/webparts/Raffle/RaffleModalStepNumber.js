import { memo } from "react";

const RaffleModalStepNumber = memo(({modStatus})=>{
    return (<>
        <div className="text-center operation-text mt-5">
        <p>The operation will be done automaticly afterward.</p>
      </div>
      <div
        className="
          timer-container
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <div className="timer text-center mt-3">
          <div id="timer-countdown">
            <div className="base-timer">
              <svg
                className="base-timer__svg"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="base-timer__circle">
                  <circle
                    className="base-timer__path-elapsed"
                    cx="50"
                    cy="50"
                    r="45"
                  ></circle>
                  <path
                    id="base-timer-path-remaining"
                    strokeDasharray="283"
                    className="base-timer__path-remaining timer-green"
                    d="
                      M 50, 50
                      m -45, 0
                      a 45,45 0 1,0 90,0
                      a 45,45 0 1,0 -90,0
                    "
                  ></path>
                </g>
              </svg>
              <span id="base-timer-label" className="base-timer__label"
                >700 Seconds</span
              >
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer d-flex justify-content-center">
      <div className="donation-steps-description">
        <div className="donation-steps-box p-3">
          <p className="donation-text">
            Donation steps: <span>{modStatus} (1 of 4)</span>
          </p>
        </div>
      </div>
      <p className="donation-fineprint mt-2">
        Your funds will be send back to you in case of any failure.
        samrt contracts are being used to prevent the intermidiate
        service from cheating.
      </p>
    </div>
    </>)
});

export default RaffleModalStepNumber;