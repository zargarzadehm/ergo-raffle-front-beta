import { memo } from "react";
import staticText from "../../statics";

const AskForDonationBox = memo(({ raffle }) => {
  const remainingErg = () => {
    return (((((raffle.goal) || 0) / staticText.ERG_SCALE) - (((raffle.ticket && raffle.ticket.erg) || 0) / staticText.ERG_SCALE))) > 0 ? 
    ((((((raffle.goal) || 0) / staticText.ERG_SCALE) - (((raffle.ticket && raffle.ticket.erg) || 0) / staticText.ERG_SCALE) < 0 ? 0 : (((raffle.goal) || 0) / staticText.ERG_SCALE) - (((raffle.ticket && raffle.ticket.erg) || 0) / staticText.ERG_SCALE)))) : null
  }

  const collectedErg = () => {
    return ((raffle.ticket && raffle.ticket.erg) || 0) / staticText.ERG_SCALE;
  }

  const progress = () => {
    return ((1 - (raffle.goal - ((raffle.ticket && raffle.ticket.erg) || 0)) / raffle.goal)) * 100;
  }
  return (<div className="ask-for-donation-box text-center mt-5">
    <div className="heart-jar"></div>

    <div className="progress-container mb-5">
      <div className="progress-bar" style={{ width: progress() + '%' }}></div>
      <div className="raised">
        <p className="mt-1">
          <span className="collected-erg">{collectedErg()}</span> ERG have been collected
          so far!
          <br className="d-lg-none" />
          <span className="total-erg"> {remainingErg()} </span>
          ERG remaining!
        </p>
      </div>
    </div>
    <h3 className="help-request mt-5">
      {"Why not help this raffle fund " + remainingErg() + " more ERG now!"}
    </h3>
  </div>)
})

export default AskForDonationBox;