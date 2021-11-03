import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ThemeContext from '../../context';

const WalletModal = ({ walletProp }) => {
  const context = useContext(ThemeContext);
  const [wallet, setWallet] = useState(walletProp);
  const setWalletAddress = () => {
    if (wallet.length > 5) {
      window.localStorage.setItem('wallet', window.btoa(wallet));
    } else {
      window.localStorage.removeItem('wallet');
    }
    context.setHasWallet(wallet);
    notify('wallet submitted');
  }
  const clearWalletAddress = () => {
    window.localStorage.removeItem('wallet');
    context.setHasWallet('');
    notify('wallet removed');
  }
  const handleChange = (e) => {
    setWallet(e.target.value);
  }
  const notify = (msg) => toast(msg);
  return (
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
                  value={wallet}
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
            <button type="button" className="btn clear-modal" onClick={() => clearWalletAddress()} data-bs-dismiss="modal">Clear</button>
            <button type="button" className="btn set-modal" data-bs-dismiss="modal" onClick={() => setWalletAddress()}>Set</button>
          </div>
        </div>
      </div>
    </div>)
};

export default WalletModal;