import { memo } from "react";

const DonationRaffleStepOne = memo(({toggleNextStep, raffleWalletAddressRef, walletAddress, changeWalletAddress})=>{
    return (<>
    <div className={ "step-content step-1 text-center"}>
    <h3 className="step-title">What is your wallet address?</h3>
    <form className={'my-5'}>
      <div className="form-floating wallet-address-input">
        <input
          ref={raffleWalletAddressRef}
          type="text"
          value={walletAddress}
          className="form-control"
          id="floatingInput"
          placeholder="Wallet Address"
          onChange={changeWalletAddress}
          required
        />
        <label htmlFor="floatingInput">Wallet address</label>
      </div>
    </form>
    <div className="row action-button mb-5">
      <div className="col-12 text-center">
        {/* <!-- next button --> */}
        <button type="button" disabled={walletAddress.length === 0 ? 'disabled': null} onClick={toggleNextStep} className="btn donate-next next1 mt-3">
          next step
        </button>
      </div>
    </div>
  </div> 
  </>
  );
});

export default DonationRaffleStepOne;