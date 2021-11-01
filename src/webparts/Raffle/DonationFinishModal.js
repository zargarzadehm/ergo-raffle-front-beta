import { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../context";
import staticText from "../../statics";
import RaffleModalAddress from "./RaffleModalAddress";
import RaffleModalStepNumber from "./RaffleModalStepNumber";
import RaffleModalTicketNumber from "./RaffleModalTicketNumber";

let timerInterval = null;
const DonationFinishModal = ({ modStatus, modInfo }) => {
  const context = useContext(ThemeContext);
  const timerRef = useRef();
  const remainingSeconds = useRef();
  const [donationTime, setDonatonTime] = useState(true);

  const closeModal = () => {
    setDonatonTime(false);
    setTimeout(() => {
      setDonatonTime(true);
    }, [])
    try {
      clearInterval(timerInterval);
    } catch (e) { }
  }



  useEffect(() => {
    let timePassed = 0;
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 600;
    const ALERT_THRESHOLD = 200;
    const TIME_LIMIT = 700;
    let timeLeft = TIME_LIMIT;
    const donationModal = context.finishModalRef.current;
    const timerCircle = timerRef.current;

    donationModal.addEventListener("shown.bs.modal", function () {
      startTimer();
    });

    donationModal.addEventListener("hide.bs.modal", function () {
      onTimesUp();
    });

    const onTimesUp = () => {
      closeModal();
      setDonatonTime(false);
      setTimeout(() => {
        setDonatonTime(true);
      }, [])
      clearInterval(timerInterval);
    }

    const startTimer = () => {
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        remainingSeconds.current.innerHTML = `${timeLeft} Seconds`;
        setCircleDasharray();
        setCircleColor(timeLeft);

        if (timeLeft === 0) {
          onTimesUp();
        }
      }, 1000);
    }

    const calculateTimeFraction = () => {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    const setCircleDasharray = () => {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      if (timerCircle) {
        timerCircle
          .setAttribute("stroke-dasharray", circleDasharray);
      }
    }

    const setCircleColor = (timeLeft) => {
      if (timeLeft <= ALERT_THRESHOLD) {
        timerCircle.classList.remove("timer-orange");
        timerCircle.classList.add("timer-red");
      } else if (timeLeft <= WARNING_THRESHOLD) {
        timerCircle.classList.remove("timer-green");
        timerCircle.classList.add("timer-orange");
      }
    }
  }, [context.finishModalRef]);

  return (<ThemeContext.Consumer>
    {({ finishModalRef, finishModalToggle, isDonation }) => (<>
      {donationTime ? <>
        <div data-bs-toggle="modal" data-bs-target="#donation-modal" className="d-none" ref={finishModalToggle} />
        <div
          className="modal fade"
          id="donation-modal"
          ref={finishModalRef}
          tabIndex="-1"
          aria-labelledby="donationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <p className="donation-modal-instruction">
                  Copy the charity addres from below and Send <span className="donation-amount"><b>{parseFloat(modInfo.erg / staticText.ERG_SCALE)} ERG</b></span> to it.
                </p>

                <button
                  onClick={closeModal}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <RaffleModalAddress modInfo={modInfo} />
                <RaffleModalTicketNumber modInfo={modInfo} isDonation={isDonation} />
                <RaffleModalStepNumber isDonation={isDonation} remainingSeconds={remainingSeconds} timerRef={timerRef} modInfo={modInfo} modStatus={modStatus} />
              </div>

            </div>
          </div>
        </div>
      </> : null}
    </>)}
  </ThemeContext.Consumer>)
};

export default DonationFinishModal;