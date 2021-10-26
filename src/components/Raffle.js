
import { memo } from "react";
import { Link } from "react-router-dom";
import '../assets/css/raffles.css';
import defaultImg from '../assets/img/default.jpg'
import ThemeContext from "../context";
import staticText from "../statics";

const Raffle = memo(({raffle}) => {
    return (<ThemeContext.Consumer>
      {({info})=>(
    <Link className="raffle-card-link" to={(raffle && raffle.status === 'active') ? '/raffle/donate/'+(raffle && raffle.id) : '/raffle/show/'+(raffle && raffle.id)}>
    <div className={(raffle && raffle.status === 'succeed') ? "card raffle-card raffle-success" : (raffle && raffle.status === 'failed') ? "card raffle-card raffle-unsuccess" : "card raffle-card"}>
      <div className="card-body">
        <div className="raffle-img-container">
          <img src={raffle && Array.isArray(raffle.picture) && raffle.picture.length > 0 ? raffle.picture[0] : defaultImg} className={'full-width'} alt="" />
        </div>
        <h3 className="raffle-title mt-3 mb-3 text-center">
          {raffle && raffle.name}
        </h3>
        <p className="raffle-text">
          {raffle && raffle.description}
        </p>
        <div className="remain-box mt-lg-5">
          {raffle.status === 'active' ? <p className="remaining-days">{Math.floor((raffle.deadline-info.height)/(720))} days remaining</p> : <p className="remaining-days">{Math.abs(Math.floor((raffle.deadline-info.height)/(720)))} days passed</p>}
        </div>
        <div className="progress-container mb-5">
          <div className="progress-bar" style={{width: (parseFloat((!isNaN(raffle.erg) ? raffle.erg : (raffle && raffle.ticket && raffle.ticket.erg))/raffle.goal)*100)+'%'}}></div>
          <div className="raised">
            <p className="mt-1">
              <span className="remaining-erg">{(!isNaN(raffle.erg) ? raffle.erg : (raffle && raffle.ticket && raffle.ticket.erg))/staticText.ERG_SCALE}</span> ERG raised of
              <span className="total-erg"> {raffle.goal/staticText.ERG_SCALE} </span>
              ERG
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>)}</ThemeContext.Consumer>)
});

export default Raffle;
