import { memo } from "react";
import Erg from "../../components/Erg";

const RaffleIconBox = memo(({ raffle }) => {
  return (<div className="row">
    <div className="col-4 text-center">
      <span className="slider-icon raffle-icon icon-donated"></span>

      <p className="ico-text mt-2">
        <span className="people-number">{raffle.donatedPeople}</span><br />
        people donated!
      </p>
    </div>

    <div className="col-4 text-center">
      <span className="slider-icon raffle-icon icon-piggy"></span>

      <p className="ico-text mt-2">
        <span className="people-number"><Erg shouldDisplay={false} erg={((raffle.ticket && raffle.ticket.erg) || 0)} /></span><br />
        ERG gathered
      </p>
    </div>
    <div className="col-4 text-center">
      <span className="slider-icon raffle-icon icon-ticket"></span>

      <p className="ico-text mt-2">
        <span className="people-number">{(raffle.ticket && raffle.ticket.sold)}</span><br />
        tickets sold
      </p>
    </div>
  </div>)
});

export default RaffleIconBox;