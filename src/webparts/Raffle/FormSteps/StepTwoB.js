import { memo, useState } from "react";
import CreateRaffleTicketPrice from "../CreateRaffleTicketPrice";

const StepTwoB = memo(({ formFeedback, defaultValue }) => {
  const [ticketPrice, setTicketPrice] = useState(defaultValue)
  const handleChange = (value) => {
    setTicketPrice(value);
    formFeedback('ticketPrice',value)
  }
  return (<div className="second-step step-2-b">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        How much should each ticket price be?
      </h3>
      <div className="row mt-3">
        <div
          className="
                text-center text-lg-start
                ticket-options-container
              "
        >
          <CreateRaffleTicketPrice ticketPrice={0.25} handleChange={(value) => handleChange(value)} value={ticketPrice} />
          <CreateRaffleTicketPrice ticketPrice={0.5} handleChange={(value) => handleChange(value)} value={ticketPrice} />
          <CreateRaffleTicketPrice ticketPrice={1} handleChange={(value) => handleChange(value)} value={ticketPrice} />
          <CreateRaffleTicketPrice ticketPrice={3} handleChange={(value) => handleChange(value)} value={ticketPrice} />
        </div>
      </div>
      <form>
        <div
          className="
                form-floating
                create-raffle-input
                raffle-donation-input
                mt-4
              ">
          <input
            value={ticketPrice}
            type="number"
            className="form-control"
            id="ticket-price"
            placeholder="Custom Price"
            onChange={(e) => handleChange(e.target.value + '')}
          />
          <label htmlFor="ticket-price">Custom Price</label>
        </div>
      </form>
    </div>
  </div>
  )
});

export default StepTwoB;