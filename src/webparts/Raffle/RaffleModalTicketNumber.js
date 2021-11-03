import { memo } from "react";
import Erg from "../../components/Erg";

const RaffleModalTicketNumber = memo(({ modInfo }) => {
  return (<>{modInfo.ticketCount ?
    <div className="row donation-details mt-3 mt-lg-0">
      <div className="col-5 col-lg-4 text-start">
        <p className="tickets-number">
          Number of tickets: <span>{modInfo.ticketCount}</span>
        </p>
      </div>
      <div className="col-7 col-lg-8 text-end text-lg-start">
        <p className="tickets-number">
          Total donate amount: <span><Erg erg={parseFloat(modInfo.ticketCount * modInfo.erg)} shouldDisplay={true} /></span>
        </p>
      </div>
    </div>
    : null}
  </>)
});

export default RaffleModalTicketNumber;