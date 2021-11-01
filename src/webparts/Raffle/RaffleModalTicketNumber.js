import { memo } from "react";
import staticText from "../../statics";

const RaffleModalTicketNumber = memo(({ modInfo, isDonation }) => {
  return (isDonation ? <>
    <div className="row donation-details mt-3 mt-lg-0">
      <div className="col-5 col-lg-4 text-start">
        <p className="tickets-number">
          Number of tickets: <span>{modInfo.ticketCount}</span>
        </p>
      </div>
      <div className="col-7 col-lg-8 text-end text-lg-start">
        <p className="tickets-number">
          Total donate amount: <span>{parseFloat((modInfo.ticketCount * modInfo.erg) / staticText.ERG_SCALE)} ERG</span>
        </p>
      </div>
    </div>
  </> : null)
});

export default RaffleModalTicketNumber;