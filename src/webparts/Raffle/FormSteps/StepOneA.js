import { useState } from "react";

const StepOneA = ({ formFeedback, defaultValue }) => {
  const [raffleName, setRaffleName] = useState(defaultValue);
  const handleChange = (e) => {
    let { value } = e.target;
    setRaffleName(value);
    formFeedback('raffleName', value)
  }

  return (<div className="first-step step-1-a">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        What's the name of your raffle?
      </h3>
      <form>
        <div
          className="form-floating create-raffle-input raffle-name-input">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Name"
            required
            value={raffleName}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
      </form>
    </div>
  </div>
  )
};

export default StepOneA;