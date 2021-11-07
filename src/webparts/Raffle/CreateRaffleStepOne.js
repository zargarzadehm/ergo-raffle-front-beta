import { memo } from "react";
import StepOneA from "../../webparts/Raffle/FormSteps/StepOneA";
import StepOneB from "../../webparts/Raffle/FormSteps/StepOneB";
import StepOneC from "../../webparts/Raffle/FormSteps/StepOneC";
import StepOneD from "../../webparts/Raffle/FormSteps/StepOneD";
import StepOneE from "../../webparts/Raffle/FormSteps/StepOneE";
import preview from '../../assets/img/preview.png';

const CreateRaffleStepOne = memo(({ activeStep, raffleName, files, description, address, walletAddress, formFeedback, setIsActive }) => {
  const handleSteps = (key, value) => {
    formFeedback(key, value)
  }
  return (<>{activeStep === 1 ?
    <StepOneA formFeedback={(key, value) => handleSteps(key, value)}
      defaultValue={raffleName} />
    : activeStep === 2 ?
      <StepOneB formFeedback={(key, value) => handleSteps(key, value)}
        defaultValue={files}
        preview={preview}
        setIsActive={setIsActive} />
      : activeStep === 3 ?
        <StepOneC formFeedback={(key, value) => handleSteps(key, value)}
          defaultValue={description} />
        : activeStep === 4 ?
          <StepOneD formFeedback={(key, value) => handleSteps(key, value)}
            defaultValue={address} />
          : activeStep === 5 ?
            <StepOneE formFeedback={(key, value) => handleSteps(key, value)}
              defaultValue={walletAddress} />
            : null}
  </>)
})

export default CreateRaffleStepOne;