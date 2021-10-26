import { useState } from "react";

const StepTwoDonation = ({handleRadioChange, defaultValue})=> {
    const [ radioCheck, setRadioCheck] = useState(typeof defaultValue === 'undefined' ? 5 : defaultValue);
    const handleChange = (e) => {
      const { value } = e.target
      setRadioCheck(value);
      handleRadioChange(value);
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
          <span className="ticket-price-number">0.5</span>
        </p>
      </div>
      <div className="col-lg-6 text-center ticket-options-container">
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="five-tickets"
          value={5}
          checked={radioCheck === 5}
          onChange={handleChange}
        />
        <label className="btn btn-outline-danger" htmlFor="five-tickets">5 ticket</label>
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="ten-tickets"
          value={10}
          checked={radioCheck === 10}
          onChange={handleChange}
        />
        <label className="btn btn-outline-danger" htmlFor="ten-tickets"
          >10 Ticket</label>
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="twenty-tickets"
          value={20}
          checked={radioCheck === 20}
          onChange={handleChange}
        />
        <label className="btn btn-outline-danger" htmlFor="twenty-tickets">20 Ticket</label>
        <input
          type="radio"
          className="btn-check"
          name="options-outlined"
          id="thirty-tickets"
          value={30}
          checked={radioCheck === 30}
          onChange={handleChange}
        />
        <label className="btn btn-outline-danger" htmlFor="thirty-tickets">30 Ticket</label>
      </div>
      <div className="col-lg-3">
    </div>
      <div className="form-floating ticket-count-input">
        <input
          onChange={handleChange}
          type="number"
          className="form-control"
          id="floatingInput"
          placeholder="Ticket Counts"
          value={radioCheck}
        />
        <label htmlFor="floatingInput">Ticket Counts</label>
      </div>
      </div>
    </form>
    </>)
};

export default StepTwoDonation;