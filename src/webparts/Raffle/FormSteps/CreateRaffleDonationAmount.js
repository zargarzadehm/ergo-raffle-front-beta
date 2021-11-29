import { memo, useState } from "react";

const CreateRaffleWalletAddress = memo(({formFeedback, defaultValue}) => {
    const [ergGoal, setErgGoal] = useState(defaultValue);
    const handleChange = (e) => {
        const {value} = e.target;
        setErgGoal(value.split('-').join('').split('.').join(''));
        formFeedback('ergGoal', value)
    }
    return (<div className="second-step step-2-a">
            <div className="step-content text-center text-lg-start">
                <h3 className="step-title mb-4">
                    How Many ERG to Collect?
                </h3>
                <form>
                    <div className="form-floating create-raffle-input raffle-donation-input">
                        <input
                            type="number"
                            min={1}
                            step={1}
                            className="form-control"
                            id="floatingInput"
                            placeholder="Donation Amount"
                            onChange={handleChange}
                            onKeyDown={(e) => setErgGoal(e.target.value.split('-').join('').split('.').join(''))}
                            value={ergGoal}
                        />
                        <label htmlFor="floatingInput">Amount (ERG)</label>
                    </div>
                </form>
            </div>
        </div>
    )
});

export default CreateRaffleWalletAddress;
