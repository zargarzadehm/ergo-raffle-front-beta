import { memo, useContext } from "react";
import Erg from "../../components/Erg";
import piggy from '../../assets/img/piggy.png'
import handHeart from '../../assets/img/hand-heart.png'
import ticket from '../../assets/img/ticket.png'
import piggyDark from '../../assets/img/piggy-dark.png'
import handHeartDark from '../../assets/img/hand-heart-dark.png'
import ticketDark from '../../assets/img/ticket-dark.png'
import ThemeContext, { DARK_THEME } from "../../context";

const RaffleIconBox = memo(({ raffle }) => {
  const context = useContext(ThemeContext);
  return (<div className="row">
    <div className="col-4 text-center">
      <span className="slider-icon raffle-icon"><img src={context.theme === DARK_THEME ? handHeartDark : handHeart} alt={'people donation'} /></span>

      <p className="ico-text mt-2">
        <span className="people-number">{raffle.donatedPeople}</span><br />
        people donated!
      </p>
    </div>

    <div className="col-4 text-center">
      <span className="slider-icon raffle-icon"><img src={context.theme === DARK_THEME ? piggyDark : piggy} alt={'ticket price'} /></span>

      <p className="ico-text mt-2">
        <span className="people-number"><Erg shouldDisplay={false} erg={((raffle.ticket && raffle.ticket.erg) || 0)} /></span><br />
        ERG gathered
      </p>
    </div>
    <div className="col-4 text-center">
      <span className="slider-icon raffle-icon"><img src={context.theme === DARK_THEME ? ticketDark : ticket} alt={'ticket sold'} /></span>

      <p className="ico-text mt-2">
        <span className="people-number">{(raffle.ticket && raffle.ticket.sold)}</span><br />
        tickets sold
      </p>
    </div>
  </div>)
});

export default RaffleIconBox;