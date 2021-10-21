
import { useRef, useState, useEffect, useCallback } from "react";
import { donateRaffle, getRaffleDonationStatus, getSingleRaffle, getYourActiveRaffleTickets } from "../service/raffle.service";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Title from "../components/Title";
import RaffleGallery from "../webparts/Raffle/RaffleGallery";
import RaffleDetailInfo from "../webparts/Raffle/RaffleDetailInfo";
import RaffleDestinationInfo from "../webparts/Raffle/RaffleDestinationInfo";
import RaffleIconBox from "../webparts/Raffle/RaffleIconBox";
import AskForDonationBox from "../webparts/Raffle/AskForDonationBox";
import RaffleTicket from "../webparts/Raffle/RaffleTicket";
import ThemeContext from "../context";
import { useLocation } from 'react-router-dom';
import DonationRaffleStepOne from "../webparts/Raffle/DonationRaffleStepOne";
import DonationRaffleStepTwo from "../webparts/Raffle/DonationRaffleStepTwo";
import DonationRaffleStepThree from "../webparts/Raffle/DonationRaffleStepThree";
import DonateRaffleProgress from "../webparts/Raffle/DonateRaffleProgress";
import "../assets/css/donate.css";

let intervallerItem = null;
const RaffleDonate = ({history}) => {
    const location = useLocation();
    const [isTermsAccepted, setIsTermsAccepted] = useState(true);
    const modalRef = useRef();
    const raffleWalletAddressRef = useRef();
    const [ ticketCount, setTicketCount ] = useState('5.00');
    const params = useParams();
    const [recaptcha, setRecaptcha] = useState('');
    const [ raffleTransactions, setRaffleTransactions ] = useState([]);
    const [raffle, setRaffle] = useState({});
    const stepBarRef = useRef();
    const [activeStep, setActiveStep] = useState(0);
    const [walletAddress, setWalletAddress] = useState(window.localStorage.getItem('wallet') !== null ? window.atob(window.localStorage.getItem('wallet')) : '');
    const notify = (msg) => toast(msg);

    const checkStatus = useCallback((status,id)=> {
      if(status !== 'active') {
        history.push('/raffle/show/'+id)
      }
    },[history]);
    useEffect(() => {
        try {
          if(intervallerItem) {
            clearInterval(intervallerItem);
          }
        } catch(e) {}
    }, [location]);
    useEffect(()=>{
      getSingleRaffle(params.id).then(({data})=>{
        setRaffle(data)
        checkStatus(data.status,params.id)
      });
      if(window.localStorage.getItem('wallet') !== null) {
        getYourActiveRaffleTickets(params.id, window.atob(window.localStorage.getItem('wallet') !== null ? window.localStorage.getItem('wallet') : '')).then(
          ({data})=> {
            setRaffleTransactions(data.items);
          }
        )
      }
    },[params.id, checkStatus]);
    const handleFeedback = (value, response) => {
      setIsTermsAccepted(!value);
      setRecaptcha(response);
    }
    const toggleNextStep = (e) => {
      e.preventDefault();
      const newStep = activeStep + 1;
      setActiveStep(newStep);
      setIsTermsAccepted(true);
      if(newStep === 1) {
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

      if(newStep === 1) {
        stepBarRef.current.style.width = "41%";
      } else if (newStep === 2) {
        stepBarRef.current.style.width = "83%";
      } else {
        stepBarRef.current.style.width = "0%";
      }
    }
    const changeWalletAddress = () => {
      setWalletAddress(raffleWalletAddressRef.current.value)
    }
    const ticketCountHandler = (count) => {
      setTicketCount(count);
    }
    const donate = (setModInfo,setModStatus) => {
      setIsTermsAccepted(true);
      donateRaffle(params.id, walletAddress, ticketCount, recaptcha).then(
        ({data})=> {
            modalRef.current.click();
            notify('Donation Perfomerd!');
            setIsTermsAccepted(false);
            data.ticketCount = ticketCount;
            setModInfo(data);
            let count = 0;
            intervallerItem = setInterval(()=> {
              getRaffleDonationStatus(params.id, data.id).then(
                ({data})=> {
                  setModStatus(data);
                  if(count === 72 && intervallerItem) {
                    clearInterval(intervallerItem);
                  }
                  count++;
                }
              )
            }, 1000);
        }
      ).catch((e) => {
        setIsTermsAccepted(false);
        notify(e.response.data.message);
      })
    }
    return (<>
    <ThemeContext.Consumer>
      {({setModalStatus, setModalInfo})=>(<>
    {raffle.name ? <Title title={'Ergo Raffle - ' + raffle.name} /> : null}
  <main>
    <section id="raffle-intorduction" className="p-2 p-lg-5 mb-4 mt-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
              <RaffleGallery raffle={raffle}/>
          </div>
          <div className="col-lg-7 pt-4 pt-lg-0 raffle-intorduction-right">
            <RaffleDetailInfo raffle={raffle} />
          </div>
        </div>
      </div>
    </section>
    <section id="raffle-details">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <RaffleDestinationInfo raffle={raffle} />
        </div>
      </div>
    </section>
    <section id="raffle-icons" className="mt-5">
      <div className="container">
        <RaffleIconBox raffle={raffle} />
      </div>
    </section>
    <section id="ask-for-donation" className="mt-5">
      <div className="container">
        <AskForDonationBox raffle={raffle} />
      </div>
    </section>
    <section id="steps" className="my-5">
      <div className="container">
        <DonateRaffleProgress activeStep={activeStep} stepBarRef={stepBarRef} />
        <div className="step-content-container my-3 py-5">
        {activeStep === 0 ? 
        <DonationRaffleStepOne walletAddress={walletAddress} toggleNextStep={toggleNextStep} raffleWalletAddressRef={raffleWalletAddressRef} changeWalletAddress={changeWalletAddress} />
        : null }
        {activeStep === 1 ? 
        <DonationRaffleStepTwo reduceStep={reduceStep} toggleNextStep={toggleNextStep} ticketCount={ticketCount} ticketCountHandler={ticketCountHandler} />
        : null}
        {activeStep === 2 ?
        <DonationRaffleStepThree donate={donate} isTermsAccepted={isTermsAccepted} handleFeedback={handleFeedback} setModalInfo={setModalInfo} setModalStatus={setModalStatus} reduceStep={reduceStep} />
        :null }
        <button 
        ref={modalRef}
        data-bs-toggle="modal"
        data-bs-target="#donation-modal"
        className={'d-none'}/>
        </div>
      </div>
    </section>
    <section id="your-tickets" className="my-5">
      <div className="container">
        <div className="your-tickets-box text-center p-3">
      {window.localStorage.getItem('wallet') !== null ? <>
          <h3 className="your-tickets-title mt-3">Your Tickets</h3>
          {((Array.isArray(raffleTransactions) ? raffleTransactions : [])).map((item,key)=>(<RaffleTicket raffle={item} key={Math.random()+key+'-transaction-raffle'} />))}
          </>: null }
        </div>

      </div>
    </section>
  </main>
  </>)}
  </ThemeContext.Consumer>
  </>)
}

export default RaffleDonate;