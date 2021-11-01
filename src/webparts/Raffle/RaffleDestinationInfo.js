import { memo } from "react";
import staticText from "../../statics";

const RaffleDestinationInfo = memo(({ raffle }) => {
  return (<>
    <div className="col-lg-5">
      <div className={raffle.status !== 'active' ? "donation-goal-box bordered-field" : "donation-goal-box bordered-field bordered-field-orange"}>
        <p className="total-donation">
          Total donation goal:
          <span className="total-donation-number"> {isNaN(raffle.goal / staticText.ERG_SCALE) ? 0 : raffle.goal / staticText.ERG_SCALE} </span> ERG
        </p>
      </div>
      <div className="raffle-shares-box d-flex bordered-field">
        <div className="charity-share flex-grow-1">
          <p>Charity: <span className="charity-share-text">{raffle.percent && raffle.percent.charity}%</span></p>
        </div>
        <div className="winner-share flex-grow-1">
          <p>Winner: <span className="winner-share-text">{raffle.percent && raffle.percent.winner}%</span></p>
        </div>
        <div className="service-share flex-grow-1">
          <p>Service: <span className="service-share-text">5%</span></p>
        </div>
      </div>
    </div>
    <div className="col-lg-7 raffle-keys">
      <div className="raffle-id-box bordered-field">
        <p>
          Raffle ID:
          <span className="raffle-id-text"
          > {raffle.id}</span>
        </p>
      </div>
      <div className="charity-address-box bordered-field">
        <p>
          Charity Address:
          <span className="charity-address-text"
          > {raffle.charity}</span>
        </p>
      </div>
    </div></>)
});

export default RaffleDestinationInfo;