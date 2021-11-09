import { memo } from "react"
import CreateRaffleWalletAddress from "./FormSteps/CreateRaffleDonationAmount";
import CreateRaffleTickets from "./FormSteps/CreateRaffleTickets";
import CreateRaffleDeadline from "./FormSteps/CreateRaffleDeadline";
import CreateRaffleTicketSharePercent from "./FormSteps/CreateRaffleTicketSharePercent";
const CreateRaffleDonationGoal = memo(({ formFeedback, deadline, ticketPercent, ticketPrice, ergGoal, activeStep }) => {
  const handleSteps = (key, value) => {
    formFeedback(key, value);
  }
  return (<>
    {
      activeStep === 6 ?
        <CreateRaffleWalletAddress formFeedback={(key, value) => handleSteps(key, value)}
          defaultValue={ergGoal} />
        :
        activeStep === 7 ?
          <CreateRaffleTickets formFeedback={(key, value) => handleSteps(key, value)}
            defaultValue={ticketPrice} />
          :
          activeStep === 8 ?
            <CreateRaffleDeadline formFeedback={(key, value) => handleSteps(key, value)}
              defaultValue={deadline} />
            :
            activeStep === 9 ?
              <CreateRaffleTicketSharePercent formFeedback={(key, value) => handleSteps(key, value)}
                defaultValue={ticketPercent}
                deadline={deadline} />
              :
              null
    }
  </>)
});

export default CreateRaffleDonationGoal;