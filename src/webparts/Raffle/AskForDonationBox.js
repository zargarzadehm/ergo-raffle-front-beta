import { memo } from "react";

const AskForDonationBox = memo(({raffle}) => {
    return (<div className="ask-for-donation-box text-center mt-5">
    <div className="heart-jar"></div>

    <div className="progress-container mb-5">
      <div className="progress-bar" style={{width: ((1-(raffle.goal - ((raffle.ticket && raffle.ticket.erg)||0))/raffle.goal))*100+'%'}}></div>
      <div className="raised">
        <p className="mt-1">
          <span className="collected-erg">{((raffle.ticket && raffle.ticket.erg)||0)/1000000000}</span> ERG have been collected
          so far!
          <br className="d-lg-none" />
          <span className="total-erg"> {(((raffle.goal)||0)/1000000000) - (((raffle.ticket && raffle.ticket.erg)||0)/1000000000) < 0 ? 0 : (((raffle.goal)||0)/1000000000) - (((raffle.ticket && raffle.ticket.erg)||0)/1000000000)} </span>
          ERG remaining!
        </p>
      </div>
    </div>
    <h3 className="help-request mt-5">
      {(((((raffle.goal)||0)/1000000000) - (((raffle.ticket && raffle.ticket.erg)||0)/1000000000))) > 0 ? ("Why not help this raffle fund " + ((((raffle.goal)||0)/1000000000) - (((raffle.ticket && raffle.ticket.erg)||0)/1000000000) < 0 ? 0 : (((raffle.goal)||0)/1000000000) - (((raffle.ticket && raffle.ticket.erg)||0)/1000000000)) + " more ERG now!") : null}
    </h3>
  </div>)
})

export default AskForDonationBox;