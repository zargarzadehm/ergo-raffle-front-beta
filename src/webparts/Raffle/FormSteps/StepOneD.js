import { memo, useState } from "react";

const StepOneD = memo(({ formFeedback, defaultValue }) => {
  const [address, setAddress] = useState(defaultValue);
  const handleChange = (e) => {
    const { value } = e.target;
    setAddress(value);
    formFeedback('address', value);
  }
  return (<div className="first-step step-1-d">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        Please write the address of the charity
      </h3>
      <form>
        <div
          className="
            form-floating
            create-raffle-input
            raffle-charity-input
          "
        >
          <input
            type="text"
            value={address}
            className="form-control"
            id="floatingInput"
            placeholder="charity Address"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Address</label>
        </div>
      </form>
    </div>
  </div>)
});

export default StepOneD;