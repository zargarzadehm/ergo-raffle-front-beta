import { memo } from "react"
import StepTwoA from "../../webparts/Raffle/FormSteps/StepTwoA";
import StepTwoB from "../../webparts/Raffle/FormSteps/StepTwoB";
import StepTwoC from "../../webparts/Raffle/FormSteps/StepTwoC";
import StepTwoD from "../../webparts/Raffle/FormSteps/StepTwoD";
const CreateRaffleStepTwo = memo(({ formFeedback, deadline, ticketPercent, ticketPrice, ergGoal, activeStep }) => {
  const handleSteps = (key, value) => {
    formFeedback(key, value);
  }
  return (<>{activeStep === 6 ?
    <StepTwoA formFeedback={(key, value) => handleSteps(key, value)} defaultValue={ergGoal} />
    : activeStep === 7 ?
      <StepTwoB formFeedback={(key, value) => handleSteps(key, value)} defaultValue={ticketPrice} />
      : activeStep === 8 ?
        <StepTwoC formFeedback={(key, value) => handleSteps(key, value)} defaultValue={deadline} />
        : activeStep === 9 ?
          <StepTwoD formFeedback={(key, value) => handleSteps(key, value)} defaultValue={ticketPercent} deadline={deadline} />
          : null}</>)
});

export default CreateRaffleStepTwo;