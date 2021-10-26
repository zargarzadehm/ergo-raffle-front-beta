import { memo } from "react"
import StepTwoA from "../../webparts/Raffle/FormSteps/StepTwoA";
import StepTwoB from "../../webparts/Raffle/FormSteps/StepTwoB";
import StepTwoC from "../../webparts/Raffle/FormSteps/StepTwoC";
import StepTwoD from "../../webparts/Raffle/FormSteps/StepTwoD";
const CreateRaffleStepTwo = memo(({formFeedback, deadline, ticketPercent, ticketPrice, ergGoal, activeStep}) => {
    const handleSteps = (value) => {
        formFeedback(value);
    }
    return (<>{activeStep === 6 ?
        <StepTwoA formFeedback={(value) => handleSteps(value)} defaultValue={ergGoal} />
      : activeStep === 7 ?
        <StepTwoB formFeedback={(value) => handleSteps(value)} defaultValue={ticketPrice} />
      : activeStep === 8 ?
        <StepTwoC formFeedback={(value) => handleSteps(value)} defaultValue={deadline} />
      : activeStep === 9 ?
        <StepTwoD formFeedback={(value) => handleSteps(value)} defaultValue={ticketPercent} deadline={deadline} />
      : null }</>)
});

export default CreateRaffleStepTwo;