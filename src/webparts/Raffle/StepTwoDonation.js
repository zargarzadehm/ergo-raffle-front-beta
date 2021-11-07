import { useState } from "react";
import Erg from "../../components/Erg";
import TicketPriceRadioCheck from "./TicketPriceRadioCheck";

const StepTwoDonation = ({ handleRadioChange, defaultValue, raffle }) => {
  const [radioCheck, setRadioCheck] = useState(typeof defaultValue === 'undefined' ? 5 : defaultValue);
  const handleChange = (e) => {
    const { value } = e.target
    setRadioCheck(parseInt(value));
    handleRadioChange(parseInt(value));
  };
  return (<>
    <h3 className="step-title">How much do you want to donate?</h3>
    <form className={'my-5'}>
      <div className="row mt-3">
        <div className="col-lg-3">
          <p
            className="
            ticket-price-text
            text-center text-lg-end
            mb-3 mb-lg-0
          "
          >
            Ticket Price(ERG):
            <span className="ticket-price-number"> <Erg erg={raffle.ticket.price} shouldDisplay={false} /> </span>
          </p>
        </div>
        <div className="col-lg-6 text-center ticket-options-container">
          <TicketPriceRadioCheck radioCheck={radioCheck} handleChange={handleChange} value={5} />
          <TicketPriceRadioCheck radioCheck={radioCheck} handleChange={handleChange} value={10} />
          <TicketPriceRadioCheck radioCheck={radioCheck} handleChange={handleChange} value={20} />
          <TicketPriceRadioCheck radioCheck={radioCheck} handleChange={handleChange} value={30} />
        </div>
        <div className="form-floating ticket-count-input">
          <input
            onChange={handleChange}
            type="number"
            min={0}
            step={1}
            className="form-control"
            id="floatingInput"
            placeholder="Ticket Counts"
            value={parseInt(radioCheck)}
          />
          <label htmlFor="floatingInput">Ticket Counts</label>
        </div>
          <p className="text-center mb-4">Total Amount Will Be: <Erg erg={radioCheck*raffle.ticket.price} shouldDisplay={true} /> </p>
      </div>
    </form>
  </>)
};

export default StepTwoDonation;