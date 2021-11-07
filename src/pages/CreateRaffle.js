import { useContext, useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { toast } from 'react-toastify';
import ThemeContext from "../context";
import { getRaffleStatus, postRaffle } from "../service/raffle.service";
import { useLocation } from "react-router-dom";
import RaffleBarStep from "../webparts/Raffle/RaffleBarStep";
import CreateRaffleStepThree from "../webparts/Raffle/CreateRaffleStepThree";
import CreateRaffleButtonBar from "../webparts/Raffle/CreateRaffleButtonBar";
import CreateRaffleStepIndicator from "../webparts/Raffle/CreateRaffleStepIndicator";
import staticText from "../statics";

let intervallerItem = null;
function CreateRaffle() {
  const activeStepsTotal = [5, 4, 1];
  const barTitle = [
    "Your raffle name",
    "Your raffle cover photo",
    "Your raffle description",
    "charity address",
    "Wallet address",
    "Donation goal",
    "Ticket Price",
    "Deadline",
    "Shares percentage",
    "Last Step : Agree to our terms",
  ]
  const [maxStep, setMaxStep] = useState(1);
  const context = useContext(ThemeContext)
  const location = useLocation();
  const stepBarRef = useRef();
  const [activeStep, setActiveStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [isActive, setIsActive] = useState('');
  const [formParams, setFormParams] = useState({
    address: '', walletAddress: (window.localStorage.getItem('wallet') !== null) ?
      window.atob(window.localStorage.getItem('wallet')) : '', files: [], ergGoal: '', ticketPrice: 0.25,
    ticketPercent: '', deadline: '', description: ''
  })
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [response, setResponse] = useState('');
  const notify = (msg) => toast(msg);

  const handleSteps = (key, value) => {
    if (value.length === 0) {
      setIsActive(false);
    } else {
      if (key === 'deadline' && value > 262800) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }
    setFormParams({ ...formParams, [key]: value })
  }

  const nextStep = (e) => {
    e.preventDefault();
    if (maxStep < activeStep - 1) {
      setMaxStep(activeStep - 1);
    }
    if (activeStep !== 1 && activeStep !== 4) {
      if (activeStep <= maxStep) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      setIsActive(true);
    }
    setIsTermsAccepted(false);
    const newStep = activeStep + 1;
    setActiveStep(newStep);
    setSubStep(newStep);
    if (activeStep === 5) {
      stepBarRef.current.style.width = "41%";
      setSubStep(1);
    } else if (activeStep === 9) {
      stepBarRef.current.style.width = "83%";
      setSubStep(1);
    }
  };
  const prevStep = (e) => {
    setIsTermsAccepted(false);
    e.preventDefault()
    const newStep = activeStep - 1;
    setActiveStep(newStep);
    setSubStep(newStep);
    setIsActive(true);

    if (activeStep <= 6) {
      setSubStep(1);
      stepBarRef.current.style.width = "0%";
    } else if (newStep <= 9) {
      stepBarRef.current.style.width = "41%";
      setSubStep(1);
    }
  };
  const submitRaffleCreate = () => {
    setIsTermsAccepted(true);
    const fileArrays = [...formParams.files].sort((a, b) => a - b);
    const removeNulls = [...fileArrays].filter((a) => a != null);
    postRaffle(formParams.raffleName,
      formParams.address,
      formParams.walletAddress,
      removeNulls, parseInt(formParams.ergGoal) * staticText.ERG_SCALE,
      parseInt((formParams.ticketPrice) * staticText.ERG_SCALE),
      parseFloat(formParams.ticketPercent),
      parseFloat(formParams.deadline),
      formParams.description,
      response).then(
        ({ data }) => {
          notify('Donation Perfomerd!');
          setIsTermsAccepted(false);
          data.ticketPrice = null;
          context.setModalInfo(data);
          getRaffleStatus(data.requestId).then(
            ({ data }) => {
              context.setModalStatus(data.status);
            }
          )
          context.finishModalToggle.current.click();
          context.finishModalRef.current.addEventListener("hidden.bs.modal", function () {
            if (intervallerItem) {
              clearInterval(intervallerItem);
            }
          });
          intervallerItem = setInterval(() => {
            getRaffleStatus(data.requestId).then(
              ({ data }) => {
                context.setModalStatus(data.status);

              }
            )
          }, 10000);
        }
      ).catch((e) => {
        setIsTermsAccepted(false);
        try {
          notify(e.response.data.message);
        } catch (e) { }
      })
  }

  useEffect(() => {
    if (intervallerItem) {
      clearInterval(intervallerItem);
    }
  }, [location]);
  return (<ThemeContext.Consumer>
    {({ info, setModalStatus, setModalInfo }) => (
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
            <CreateRaffleStepIndicator setIsActive={setIsActive}
              activeStep={activeStep}
              ticketPercent={formParams.ticketPercent}
              ticketPrice={formParams.ticketPrice}
              handleSteps={handleSteps}
              ergGoal={formParams.ergGoal}
              barTitle={barTitle}
              address={formParams.address}
              raffleName={formParams.raffleName}
              subStep={subStep}
              description={formParams.description}
              files={formParams.files}
              activeStepsTotal={activeStepsTotal}
              deadline={formParams.deadline}
              walletAddress={formParams.walletAddress} />
            {activeStep > 9 ?
              <CreateRaffleStepThree info={info}
                setIsTermsAccepted={setIsTermsAccepted}
                isTermsAccepted={isTermsAccepted}
                setResponse={setResponse}
                response={response} />
              : null}
            <CreateRaffleButtonBar
              isTermsAccepted={isTermsAccepted}
              activeStep={activeStep}
              prevStep={prevStep}
              nextStep={nextStep}
              isActive={isActive}
              submitRaffleCreate={submitRaffleCreate}
              setModInfo={setModalInfo}
              setModalStatus={setModalStatus} />
          </div>
        </section>
      </main>)}
  </ThemeContext.Consumer>)
}

export default CreateRaffle;