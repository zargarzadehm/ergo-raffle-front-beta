import { useEffect, useRef } from "react";
import Erg from "../../components/Erg";
import RaffleModalAddress from "./RaffleModalAddress";
import RaffleModalStepNumber from "./RaffleModalStepNumber";
import RaffleModalTicketNumber from "./RaffleModalTicketNumber";

const DonationFinishModal = ({ response, modalStatus, clearRequestInterval }) => {
  const timerRef = useRef();
  const remainingSeconds = useRef();
  const modalRef = useRef();
  const donationModal = useRef();

  let timerInterval = null;
  const closeModal = () => {
    try {
      clearInterval(timerInterval);
    } catch (e) { }
  }
  let timePassed = 0;
  let FULL_DASH_ARRAY = 283;
  let WARNING_THRESHOLD = 600;
  let ALERT_THRESHOLD = 200;
  let TIME_LIMIT = 900;
  let timeLeft = TIME_LIMIT;
  let timerCircle = timerRef.current;
  const resetFunction = () => {
    timerCircle = timerRef.current;
    timePassed = 0;
    FULL_DASH_ARRAY = 283;
    WARNING_THRESHOLD = 600;
    ALERT_THRESHOLD = 200;
    TIME_LIMIT = 900;
    timeLeft = TIME_LIMIT;
  }
  if (donationModal.current) {
    donationModal.current.addEventListener("shown.bs.modal", function () {
      try { clearInterval(timerInterval); } catch (e) { }
      resetFunction();
      startTimer();
    });
  }
  if (donationModal.current) {
    donationModal.current.addEventListener("hide.bs.modal", function () {
      resetFunction();
      onTimesUp();
      clearRequestInterval();
    });
  }

  const onTimesUp = () => {
    clearInterval(timerInterval);
    clearRequestInterval();
  }

  const startTimer = () => {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      try {
        remainingSeconds.current.innerHTML = `${timeLeft} Seconds`;
      } catch (e) {
        if (timerInterval) {
          clearInterval(timerInterval);
          clearRequestInterval()
        }
      }
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

  useEffect(() => {
    modalRef.current.click();
  }, []);

  return (<>
    <div data-bs-toggle="modal" data-bs-target="#donation-modal" className="d-none" ref={modalRef} />
    <div
      className="modal fade"
      id="donation-modal"
      ref={donationModal}
      tabIndex="-1"
      aria-labelledby="donationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <p className="donation-modal-instruction">
              Copy the Address from below and Send <span className="donation-amount">
                <b>
                  <Erg erg={response.erg} shouldDisplay={true} />
                </b>
              </span> to it.
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
            <RaffleModalAddress modInfo={response} />
            <RaffleModalTicketNumber modInfo={response} />
            <RaffleModalStepNumber
              remainingSeconds={remainingSeconds}
              timerRef={timerRef}
              modInfo={response}
              modStatus={modalStatus}
            />
          </div>

        </div>
      </div>
    </div>
  </>)
};

export default DonationFinishModal;