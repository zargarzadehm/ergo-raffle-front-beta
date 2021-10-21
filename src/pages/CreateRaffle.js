
import "../assets/css/donate.css";
import "../assets/css/timer.css";
import "../assets/css/editor.css";
import "../assets/css/create-raffle.css";
import { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { toast } from 'react-toastify';
import ThemeContext from "../context";
import { getRaffleStatus, postRaffle } from "../service/raffle.service";
import { useLocation } from "react-router-dom";
import RaffleBarStep from "../webparts/Raffle/RaffleBarStep";
import RaffleBarSubStepsOne from "../webparts/Raffle/RaffleBarSubStepsOne";
import RaffleBarSubStepsTwo from "../webparts/Raffle/RaffleBarSubStepsTwo";
import CreateRaffleStepOne from "../webparts/Raffle/CreateRaffleStepOne";
import CreateRaffleStepTwo from "../webparts/Raffle/CreateRaffleStepTwo";
import CreateRaffleStepThree from "../webparts/Raffle/CreateRaffleStepThree";

let intervallerItem = null;
const CreateRaffle = () => {
    const location = useLocation();
    const modalRef = useRef();
    const stepBarRef = useRef();
    const [ activeStep, setActiveStep ] = useState(1);
    const [ subStep, setSubStep ] = useState(1);
    const [activeStepsTotal] = useState([5,4,1]);
    const [ raffleName, setRaffleName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ walletAddress, setWalletAddress ] = useState(window.localStorage.getItem('wallet') !== null ? window.atob(window.localStorage.getItem('wallet')) : '');
    const [ files, setFiles ] = useState([]);
    const [ ergGoal, setErgGoal ] = useState('');
    const [ ticketPrice, setTicketPrice ] = useState('0.25');
    const [ ticketPercent, setTicketPercent ] = useState('');
    const [ deadline, setDeadline ] = useState('');
    const [ isActive, setIsActive ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ isTermsAccepted, setIsTermsAccepted ] = useState(false);
    const [ response, setResponse ] = useState('');
    const [ barTitle ] = useState([
      "Your raffle name",
      "Your raffle cover photo",
      "Your raffle description",
      "Charity address",
      "Wallet address",
      "Donation goal",
      "Ticket Price",
      "Deadline",
      "Shares percentage",
      "Last Step : Agree to our terms",
    ])
    const notify = (msg) => toast(msg);

    const nextStep = (e)=> {
      e.preventDefault();
      setIsActive(false);
      setIsTermsAccepted(false);
      const newStep = activeStep + 1;
      if(newStep === 1) {
        if(raffleName.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 2) {
        if(files.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 3) {
        if(description.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 4) {
        if(address.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 5) {
        if(walletAddress.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 6) {
        if(ergGoal.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 7) {
        if(ticketPrice.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 8) {
        if(deadline.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      } else if(newStep === 9) {
        if(ticketPercent.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false)
        }
      }

      setActiveStep(newStep);
      setSubStep(newStep);
      if (activeStep === 5) {
        stepBarRef.current.style.width = "41%";
        setSubStep(1);
      } else if(activeStep === 9) {
        stepBarRef.current.style.width = "83%";
        setSubStep(1);
      }
    };
    const prevStep =  (e) => {
      setIsTermsAccepted(false);
      e.preventDefault()
      const newStep = activeStep - 1;
      setActiveStep(newStep);
      setSubStep(newStep);
      setIsActive(true);
      
      if(activeStep <= 6) {
        setSubStep(1);
        stepBarRef.current.style.width = "0%";
      } else if (newStep <= 9) {
        stepBarRef.current.style.width = "41%";
        setSubStep(1);
      }
    };
    const submitRaffleCreate = (setModStatus, setModInfo) => {
      postRaffle(raffleName,address,walletAddress, files, ergGoal, ticketPrice, ticketPercent, deadline, description, response).then(
        ({data})=> {
            notify('Raffle Submitted');
            modalRef.current.click();
            setModInfo(data);
            let count = 0;
            intervallerItem = setInterval(()=> {

            getRaffleStatus(data.id).then(
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
      )
    }
    const handleSteps = (value) => {
      if(activeStep === 1) {
        if(value.length === 0) {
          setIsActive(false)
        } else {
          setIsActive(true);
        }
        setRaffleName(value);
      } else if(activeStep === 2) {
        if(value.length === 0) {
          setIsActive(false);
        } else {
          setIsActive(true);
        }
        setFiles(value);
      } else if(activeStep === 3) {
        if(value.length === 0) {
          setIsActive(false);
        } else {
          setIsActive(true);
        }
        setDescription(value);
      } else if(activeStep === 4) {
        if(value.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        setAddress(value);
      } else if(activeStep === 5) {
        if(value.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        setWalletAddress(value);
      } else if(activeStep === 6) {
        if(value.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        setErgGoal(value);
      } else if(activeStep === 7) {
        if(value.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        setTicketPrice(value);
      } else if(activeStep === 9) {
        if(value.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        setTicketPercent(value);
      } else if(activeStep === 8) {
        if(value.length > 0) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        setDeadline(value);
      }

    }    
    useEffect(()=>{
      if(intervallerItem) {
        clearInterval(intervallerItem);
      }
    },[location]);
    return (<ThemeContext.Consumer>
      {({info, setModalStatus, setModalInfo})=>(
    <main>
      <Title title={'Ergo Raffle - Create Raffle'} />
        <section id="create-raffle">
          <div className="container mt-header">
            {activeStep <= 5 ?
            <div
              className={"create-raffle-img-container first-step-img text-center"}
            ></div>
            : null}
            {activeStep > 5 ?
            <div
              className={"create-raffle-img-container second-step-img text-center"}></div>
            : null}
            <RaffleBarStep activeStep={activeStep} stepBarRef={stepBarRef} />
            <div className="create-raffle-body my-5">
              <div className="mobile-raffle-steps d-lg-none text-start mb-5">
                <p className="substeps-mobile">
                  field <span className="substep-number">{subStep}</span> of
                  <span className="total-substeps">{activeStepsTotal[activeStep < 4 ? 0 : activeStep < 8 ? 1 : 2]}</span>:
                  <span className="substep-name">{barTitle[activeStep]}</span>
                </p>
              </div>
              <div className={activeStep >= 4 ? "row step-1-container d-done" : "row step-1-container"}>
                <div
                  className="
                    d-none d-lg-flex
                    flex-lg-column
                    col-lg-4
                    create-raffle-sidebar
                  "
                >
                      {activeStep < 6 ?<>
                 <RaffleBarSubStepsOne activeStep={activeStep} />
                  </>: null}
                </div>
                <div className="col-lg-8 create-raffle-steps-content">
                  
                  {/* <!-- ---------------------Step 1A ----------------- --> */}
                  <CreateRaffleStepOne formFeedback={(value) => handleSteps(value)} activeStep={activeStep} raffleName={raffleName} address={address} description={description} files={files} walletAddress={walletAddress} />
                </div>
              </div>
              {activeStep > 5 ?
              <div className={"row step-2-container"}>
                <div
                  className="
                    d-none d-lg-flex
                    flex-lg-column
                    col-lg-4
                    create-raffle-sidebar
                  ">
                    {activeStep < 10 ?
                    <RaffleBarSubStepsTwo activeStep={activeStep} />: null}
                </div>
                <div className="col-lg-8 create-raffle-steps-content">
                  <CreateRaffleStepTwo formFeedback={(value) => handleSteps(value)} activeStep={activeStep}  ergGoal={ergGoal} ticketPrice={ticketPrice} ticketPercent={ticketPercent} deadline={deadline} />
                </div>
            </div>
            : null}
            {activeStep > 9 ?
              <CreateRaffleStepThree info={info} setIsTermsAccepted={setIsTermsAccepted} isTermsAccepted={isTermsAccepted} setResponse={setResponse} response={response} />
            :null}
            {/* <!-- action buttons: next / back /finish --> */}
            <div className="row action-button mb-5 justify-content-center">
              <div id="back-container" className="col-6 text-end">
                {activeStep > 1 ? 
                <button className="btn create-back back-btn mt-3" onClick={prevStep}>
                  back
                </button>
                : null}
              </div>
              <div id="next-container" className="col-6 text-center">
                {activeStep < 10 ?
                <button disabled={isActive ? null : 'disabled'} className="btn create-next next-btn mt-3" onClick={nextStep}>
                  Done, next
                </button>
                : null}
                {activeStep === 10 ? 
                <button
                  disabled={!isTermsAccepted}
                  type="button"
                  className="btn create-next finish mt-3"
                  onClick={()=>submitRaffleCreate(setModalStatus, setModalInfo)}
                >
                  Finish
                </button>
                : null }
                
                <button 
                ref={modalRef}
                data-bs-toggle="modal"
                data-bs-target="#donation-modal"
                className={'d-none'}/>
              </div>
            </div>
      </div>
      </div>
    </section>
  </main>)}</ThemeContext.Consumer>)
}

export default CreateRaffle;