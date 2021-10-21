import { memo } from "react";

const RaffleModalTicketNumber = memo(({modInfo})=>{
    return (<div className="row donation-details mt-3 mt-lg-0">
    <div className="col-5 col-lg-4 text-start">
      <p className="tickets-number">
        Number of tickets: <span>{modInfo.ticketCount}</span>
      </p>
    </div>
    <div className="col-7 col-lg-8 text-end text-lg-start">
      <p className="tickets-number">
        Total donate amount: <span>{modInfo.ticketCount*modInfo.erg} ERG</span>
      </p>
    </div>
  </div>)
});

export default RaffleModalTicketNumber;