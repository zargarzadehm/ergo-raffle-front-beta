import { memo } from "react";
import CreateRaffleName from "./FormSteps/CreateRaffleName";
import CreateRaffleFiles from "./FormSteps/CreateRaffleFiles";
import CreateRaffleDescription from "./FormSteps/CreateRaffleDescription";
import CreateRaffleAddress from "./FormSteps/CreateRaffleAddress";
import CreateRaffleWalletAddress from "./FormSteps/CreateRaffleWalletAddress";
import preview from '../../assets/img/preview.png';

const CreateRaffleSpecification = memo(({ activeStep, raffleName, files, description, address, walletAddress, formFeedback, setIsActive }) => {
  const handleSteps = (key, value) => {
    formFeedback(key, value)
  }
  return (<>
    {activeStep === 1 ?
      <CreateRaffleName formFeedback={(key, value) => handleSteps(key, value)}
        defaultValue={raffleName} />
      : activeStep === 2 ?
        <CreateRaffleFiles formFeedback={(key, value) => handleSteps(key, value)}
          defaultValue={files}
          preview={preview}
          setIsActive={setIsActive} />
        : activeStep === 3 ?
          <CreateRaffleDescription formFeedback={(key, value) => handleSteps(key, value)}
            defaultValue={description} />
          : activeStep === 4 ?
            <CreateRaffleAddress formFeedback={(key, value) => handleSteps(key, value)}
              defaultValue={address} />
            : activeStep === 5 ?
              <CreateRaffleWalletAddress formFeedback={(key, value) => handleSteps(key, value)}
                defaultValue={walletAddress} />
              : null}
  </>)
})

export default CreateRaffleSpecification;