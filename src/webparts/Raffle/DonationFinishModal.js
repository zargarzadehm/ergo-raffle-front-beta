import { memo } from "react";
import RaffleModalAddress from "./RaffleModalAddress";
import RaffleModalStepNumber from "./RaffleModalStepNumber";
import RaffleModalTicketNumber from "./RaffleModalTicketNumber";

const DonationFinishModal = memo(({modStatus, modInfo})=>{
    return (<div
        className="modal fade"
        id="donation-modal"
        tabIndex="-1"
        aria-labelledby="walletModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <p className="donation-modal-instruction">
                Copy the charity addres from below and Send
                <span className="donation-amount">{modInfo.erg}</span> ERG to it.
              </p>
  
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <RaffleModalAddress modInfo={modInfo} />
              <RaffleModalTicketNumber modInfo={modInfo} />
              <RaffleModalStepNumber modInfo={modInfo} modStatus={modStatus} />
            </div>
            
          </div>
        </div>
      </div>)
});

export default DonationFinishModal;