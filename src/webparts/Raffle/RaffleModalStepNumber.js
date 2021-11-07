import { memo } from "react";

const RaffleModalStepNumber = memo(({ modStatus, timerRef, remainingSeconds }) => {
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
                  ref={timerRef}
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
            <span id="base-timer-label" ref={remainingSeconds} className="base-timer__label"
            >900 Seconds</span
            >
          </div>
        </div>
      </div>
    </div>
    {modStatus !== 'expired' ?
      <div className="modal-footer d-flex justify-content-center">
        <div className="donation-steps-description">
          <div className="donation-steps-box p-3">
            <p className="donation-text">
              {window.location.href.indexOf('raffle/donate') >= 0 ? 'Donation Steps' : 'Create Raffle Steps'}: <span>{modStatus} ({modStatus === 'waiting' ? 1 : modStatus === 'createdWaiting' ? 2 : modStatus === 'done' ? 3 : 4} of 3)</span>
            </p>
          </div>
        </div>
        <p className="donation-fineprint mt-2">
          Your funds will be send back to you in case of any failure.
          samrt contracts are being used to prevent the intermidiate
          service from cheating.
        </p>
      </div>
      : null}
  </>)
});

export default RaffleModalStepNumber;