import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import ThemeContext from "../../context";

const WalletModal = () => {
    const closeBtnRef = useRef();
    const [ walletVal, setWalletVal ] = useState(window.localStorage.getItem('wallet') !== null ? window.atob(window.localStorage.getItem('wallet')): '');

    const setWalletAddress = (hasWallet) => {
      if(walletVal.length > 5) {
        window.localStorage.setItem('wallet', window.btoa(walletVal));
        hasWallet(true);
      } else {
        window.localStorage.removeItem('wallet');
        hasWallet(false);
      }
      closeBtnRef.current.click();
      notify('wallet submitted');
    }
    const handleChange = (e) => {
      const { value } = e.target;
      setWalletVal(value);
    }
    const notify = (msg) => toast(msg);
    return (<ThemeContext.Consumer>
      {({setHasWallet})=>(
    <div
        className="modal fade"
        id="walletModal"
        tabIndex="-1"
        aria-labelledby="walletModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <label htmlFor="Wallet-address" className="col-form-label"
                >Your fund will be sent to this address.</label>
              <button
                ref={closeBtnRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    value={walletVal}
                    type="text"
                    className="form-control"
                    id="Wallet-address"
                    placeholder="Wallet address"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer mt-3 d-flex justify-content-center">
              <button type="button" className="btn clear-modal" data-bs-dismiss="modal">Clear</button>
              <button type="button" className="btn set-modal" onClick={()=>setWalletAddress(setHasWallet)}>Set</button>
            </div>
          </div>
        </div>
      </div>)}</ThemeContext.Consumer>)
};

export default WalletModal;