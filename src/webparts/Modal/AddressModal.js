import { memo } from "react";

const AddressModal = memo(()=>{
    return (<div
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
                    type="text"
                    className="form-control"
                    id="Wallet-address"
                    placeholder="Wallet address"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer mt-3 d-flex justify-content-center">
              <button type="button" className="btn clear-modal">Clear</button>
              <button type="button" className="btn set-modal">Set</button>
            </div>
          </div>
        </div>
      </div>)
});

export default AddressModal;