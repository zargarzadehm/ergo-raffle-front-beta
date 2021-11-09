import { memo, useState } from "react";
import EstimationBox from "../EstimationBox";

const CreateRaffleDeadline = memo(({ formFeedback, defaultValue }) => {
  const [deadline, setDeadline] = useState(defaultValue);
  const handleChange = (e) => {
    const { value } = e.target;
    setDeadline(value.split('.').join('').split('-').join(''));
    formFeedback('deadline', value);
  }
  return (<div className="second-step step-2-c">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">What is your deadline?</h3>
      <div className="row">
        <div className="col-6">
          <form>
            <div
              className="
                  form-floating
                  create-raffle-input
                  raffle-deadline-input">
              <input
                value={deadline}
                type="number"
                min={0}
                step={1}
                className="form-control"
                id="raffle-deadline"
                placeholder="Deadline"
                required
                onChange={handleChange}
              />
              <label htmlFor="raflfle-deadline">Deadline blocks</label>
            </div>
          </form>
        </div>
        <EstimationBox deadline={deadline} />
      </div>
    </div>
  </div>)
});

export default CreateRaffleDeadline;