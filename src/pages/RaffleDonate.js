
import { useRef, useState, useEffect, useCallback, useContext } from "react";
import { donateRaffle, getRaffleDonationStatus, getSingleRaffle, getYourActiveRaffleTickets } from "../service/raffle.service";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Title from "../components/Title";
import ThemeContext from "../context";
import DonationRaffleStepOne from "../webparts/Raffle/DonationRaffleStepOne";
import DonationRaffleStepTwo from "../webparts/Raffle/DonationRaffleStepTwo";
import DonationRaffleStepThree from "../webparts/Raffle/DonationRaffleStepThree";
import DonateRaffleProgress from "../webparts/Raffle/DonateRaffleProgress";
import RaffleDonationHeader from "../webparts/Raffle/RaffleDonationHeader";
import RaffleDonateMiddleBar from "../webparts/Raffle/RaffleDonateMiddleBar";
import RaffleTickets from "../webparts/Raffle/RaffleTickets";

let intervallerItem = null;
const RaffleDonate = ({ history }) => {
  const context = useContext(ThemeContext);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [ticketCount, setTicketCount] = useState(5);
  const params = useParams();
  const [recaptcha, setRecaptcha] = useState('');
  const [raffleTransactions, setRaffleTransactions] = useState([]);
  const [raffle, setRaffle] = useState({});
  const stepBarRef = useRef();
  const [activeStep, setActiveStep] = useState(0);
  const [walletAddress, setWalletAddress] = useState(context.hasWallet);
  const notify = (msg) => toast(msg);

  const checkStatus = useCallback((status, id) => {
    if (status !== 'active') {
      history.push('/raffle/show/' + id)
    }
  }, [history]);
  const getRaffleTransactionsOnLoad = useCallback((id) => {
    getYourActiveRaffleTickets(id, walletAddress).then(
      ({ data }) => {
        setRaffleTransactions(data.items);
      }
    )
  }, [walletAddress]);
  useEffect(() => {
    getSingleRaffle(params.id).then(({ data }) => {
      setRaffle(data)
      checkStatus(data.status, params.id)
    });
    if (window.localStorage.getItem('wallet') !== null) {
      getRaffleTransactionsOnLoad(params.id);
    }
  }, [params.id, checkStatus, getRaffleTransactionsOnLoad]);
  const handleFeedback = (value, response) => {
    setIsTermsAccepted(!value);
    setRecaptcha(response);
  }
  const toggleNextStep = (e) => {
    e.preventDefault();
    const newStep = activeStep + 1;
    setActiveStep(newStep);
    setIsTermsAccepted(true);
    if (newStep === 1) {
      window.localStorage.setItem('wallet', window.btoa(walletAddress))
      context.setHasWallet(walletAddress);
      stepBarRef.current.style.width = "41%";
    } else if (newStep === 2) {
      stepBarRef.current.style.width = "83%";
    } else {
      stepBarRef.current.style.width = "0%";
    }
  }
  const reduceStep = (e) => {
    setIsTermsAccepted(true);
    e.preventDefault();
    const newStep = activeStep - 1;
    setActiveStep(newStep);

    if (newStep === 1) {
      stepBarRef.current.style.width = "41%";
    } else if (newStep === 2) {
      stepBarRef.current.style.width = "83%";
    } else {
      stepBarRef.current.style.width = "0%";
    }
  }
  const changeWalletAddress = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWalletAddress(e.target.value)
    context.setHasWallet(e.target.value)
  }
  const ticketCountHandler = (count) => {
    setTicketCount(count);
  }
  const donate = (setModInfo, setModStatus) => {
    setIsTermsAccepted(true);
    donateRaffle(params.id, walletAddress, ticketCount, recaptcha).then(
      ({ data }) => {
        notify('Donation Perfomerd!');
        setIsTermsAccepted(false);
        data.ticketCount = ticketCount;
        setModInfo(data);
        getRaffleDonationStatus(params.id, data.requestId).then(
          ({ data }) => {
            setModStatus(data.status);
          }
        )
        context.finishModalToggle.current.click();
        context.finishModalRef.current.addEventListener("hidden.bs.modal", function () {
          if (intervallerItem) {
            clearInterval(intervallerItem);
          }
        });
        intervallerItem = setInterval(() => {
          getRaffleDonationStatus(params.id, data.requestId).then(
            ({ data }) => {
              setModStatus(data.status);

            }
          )
        }, 10000);
      }
    ).catch((e) => {
      setIsTermsAccepted(false);
      try {
        notify(e && e.response && e.response.data && e.response.data.message);
      } catch (e) { }
    })
  }
  return (<>
    <ThemeContext.Consumer>
      {({ setModalStatus, setModalInfo }) => (<>
        {raffle.name ? <Title title={'Ergo Raffle - ' + raffle.name} /> : null}
        <main>
          <RaffleDonationHeader raffle={raffle} />
          <RaffleDonateMiddleBar raffle={raffle} />
          <section id="steps" className="my-5">
            <div className="container">
              <DonateRaffleProgress
                activeStep={activeStep}
                stepBarRef={stepBarRef} />
              <div className="step-content-container my-3 py-5">
                {activeStep === 0 ?
                  <DonationRaffleStepOne
                    walletAddress={walletAddress}
                    toggleNextStep={toggleNextStep}
                    changeWalletAddress={changeWalletAddress} />
                  : null}
                {activeStep === 1 ?
                  <DonationRaffleStepTwo
                    reduceStep={reduceStep}
                    raffle={raffle}
                    toggleNextStep={toggleNextStep}
                    ticketCount={ticketCount}
                    ticketCountHandler={ticketCountHandler} />
                  : null}
                {activeStep === 2 ?
                  <DonationRaffleStepThree
                    donate={donate}
                    isTermsAccepted={isTermsAccepted}
                    handleFeedback={handleFeedback}
                    setModalInfo={setModalInfo}
                    setModalStatus={setModalStatus}
                    reduceStep={reduceStep} />
                  : null}
              </div>
            </div>
          </section>
          <RaffleTickets raffleTransactions={raffleTransactions} />
        </main>
      </>)}
    </ThemeContext.Consumer>
  </>)
}

export default RaffleDonate;