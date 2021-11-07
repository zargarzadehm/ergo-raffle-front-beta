
import { memo } from "react";
import { Link } from "react-router-dom";
import defaultImg from '../assets/img/default.jpg'
import ErgProgressBar from "./ErgProgressBar";
import RemainingBox from "./RemainingBox";

const Raffle = memo(({ raffle }) => {

  return (<Link className="raffle-card-link" to={(raffle && raffle.status === 'active') ? '/raffle/donate/' + (raffle && raffle.id) :
    '/raffle/show/' + (raffle && raffle.id)}>
    <div className={(raffle && raffle.status === 'succeed') ? "card raffle-card raffle-success" : (raffle && raffle.status === 'failed') ?
      "card raffle-card raffle-unsuccess" : "card raffle-card"}>
      <div className="card-body">
        <div className="raffle-img-container">
          <img src={raffle &&
            Array.isArray(raffle.picture) &&
            raffle.picture.length > 0 ?
            raffle.picture[0] :
            defaultImg} className={'full-width'} alt="" />
        </div>
        <h3 className="raffle-title mt-3 mb-3 text-center">
          {raffle && raffle.name}
        </h3>
        <p className="raffle-text">
          {raffle && raffle.description}
        </p>
        <RemainingBox raffle={raffle} />
        <ErgProgressBar raffle={raffle} />
      </div>
    </div>
  </Link>)
});

export default Raffle;
