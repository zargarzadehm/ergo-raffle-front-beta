import { memo, useContext } from "react";
import ThemeContext from "../../../context";

const StepOneE = memo(({formFeedback})=>{
    const context = useContext(ThemeContext);
    const handleChange = (e) => {
      const { value } = e.target;
      formFeedback(value);
      context.setHasWallet(value);
    }
    return (<ThemeContext>
      {({hasWallet})=>(
    <div className="first-step step-1-e">
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
            value={hasWallet}
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
  </div>
  )}
  </ThemeContext>)
});

export default StepOneE;