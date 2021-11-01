import { memo, useState } from "react";

const StepTwoA = memo(({ formFeedback, defaultValue }) => {
  const [ergGoal, setErgGoal] = useState(defaultValue);
  const handleChange = (e) => {
    const { value } = e.target;
    setErgGoal(value);
    formFeedback('ergGoal', value)
  }
  return (<div className="second-step step-2-a">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        How many ERG do you want to allow to this raffle?
      </h3>
      <form>
        <div
          className="form-floating create-raffle-input raffle-donation-input">
          <input
            value={ergGoal}
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Donation Amount"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Amount (ERG)</label>
        </div>
      </form>
    </div>
  </div>
  )
});

export default StepTwoA;