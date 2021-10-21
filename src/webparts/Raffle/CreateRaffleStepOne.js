import { memo } from "react";
import StepOneA from "../../webparts/Raffle/FormSteps/StepOneA";
import StepOneB from "../../webparts/Raffle/FormSteps/StepOneB";
import StepOneC from "../../webparts/Raffle/FormSteps/StepOneC";
import StepOneD from "../../webparts/Raffle/FormSteps/StepOneD";
import StepOneE from "../../webparts/Raffle/FormSteps/StepOneE";
import preview from '../../assets/img/preview.png';

const CreateRaffleStepOne = memo(({activeStep, raffleName, files, description, address,walletAddress, formFeedback}) => {
    const handleSteps = (value)=> {
        formFeedback(value)
    }
    return (<>{activeStep === 1 ?
        <StepOneA formFeedback={(value) => handleSteps(value)} defaultValue={raffleName} />
      : activeStep === 2 ?
        <StepOneB formFeedback={(value) => handleSteps(value)} defaultValue={files} preview={preview} />
      : activeStep === 3 ? 
        <StepOneC formFeedback={(value) => handleSteps(value)} defaultValue={description} />
      : activeStep === 4 ? 
        <StepOneD formFeedback={(value) => handleSteps(value)} defaultValue={address} />
      : activeStep === 5 ? 
        <StepOneE formFeedback={(value) => handleSteps(value)} defaultValue={walletAddress} />
      : null}
      </>)
})

export default CreateRaffleStepOne;