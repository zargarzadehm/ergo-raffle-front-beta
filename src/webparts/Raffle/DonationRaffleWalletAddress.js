import { memo } from "react";

const DonationRaffleWalletAddress = memo(({toggleNextStep, walletAddress, changeWalletAddress}) => {
    return (<>
        <div className={"step-content step-1 text-center"}>
            <h3 className="step-title">What is Your Wallet Address?</h3>
            <form className={'my-5'}>
                <div className="form-floating wallet-address-input">
                    <input
                        type="text"
                        value={walletAddress}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Wallet Address"
                        onChange={(e) => changeWalletAddress(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingInput">Wallet Address</label>
                </div>
            </form>
            <div className="row action-button mb-5">
                <div className="col-12 text-center">
                    <button type="button"
                            disabled={walletAddress.length === 0 ? 'disabled' : null}
                            onClick={toggleNextStep}
                            className="btn donate-next next1 mt-3">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </>);
});

export default DonationRaffleWalletAddress;
