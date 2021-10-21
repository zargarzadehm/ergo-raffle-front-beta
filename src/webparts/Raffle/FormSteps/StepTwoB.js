import { memo, useState } from "react";

const StepTwoB = memo(({formFeedback, defaultValue}) => {
    const [ ticketPrice, setTicketPrice ] = useState(defaultValue)
    const handleChange = (value) => {
      setTicketPrice(value);
      formFeedback(value)
    }
    return(<div className="second-step step-2-b">
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
              <input
                type="radio"
                className="btn-check"
                name="options-outlined"
                id="erg0.25"
                onChange={()=> handleChange('0.25')}
                checked={ticketPrice === '0.25'}
              />
              <label className="btn btn-outline-danger" htmlFor="erg0.25"
                >0.25 ERG</label>
              <input
                type="radio"
                className="btn-check"
                name="options-outlined"
                id="erg0.5"
                onChange={()=> handleChange('0.5')}
                checked={ticketPrice === '0.5'}
              />
              <label className="btn btn-outline-danger" htmlFor="erg0.5"
                >0.5 ERG</label>
              <input
                type="radio"
                className="btn-check"
                name="options-outlined"
                id="erg1"
                checked={ticketPrice === '1'}
                onChange={()=> handleChange('1')}
              />
              <label className="btn btn-outline-danger" htmlFor="erg1"
                >1 ERG</label>
              <input
                type="radio"
                className="btn-check"
                name="options-outlined"
                id="erg3"
                onChange={()=> handleChange('3')}
                checked={ticketPrice === '3'}
              />
              <label className="btn btn-outline-danger" htmlFor="erg3"
                >3 ERG</label>
            </div>
          </div>
          <form>
            <div
              className="
                form-floating
                create-raffle-input
                raffle-donation-input
                mt-4
              "
            >
              <input
                value={ticketPrice}
                type="text"
                className="form-control"
                id="ticket-price"
                placeholder="Custom Price"
                onChange={(e)=> handleChange(e.target.value+'')}
              />
              <label htmlFor="ticket-price">Custom Price</label>
            </div>
          </form>
        </div>
      </div>
    )
});

export default StepTwoB;