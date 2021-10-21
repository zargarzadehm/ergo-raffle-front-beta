import { memo, useState } from "react";

const StepOneE = memo(({formFeedback, defaultValue})=>{
    const [ walletAddress, setWalletAddress ] = useState(defaultValue);
    const handleChange = (e) => {
      const { value } = e.target;
      setWalletAddress(value);
      formFeedback(value);
    }
    return (<div className="first-step step-1-e">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        Please write the address of your wallet
      </h3>
      <form>
        <div
          className="
            form-floating
            create-raffle-input
            raffle-wallet-input
          "
        >
          <input
            value={walletAddress}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Wallet Address"
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Address</label>
        </div>
      </form>
    </div>
  </div>)
});

export default StepOneE;