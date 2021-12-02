import { memo } from "react";
import { Link } from "react-router-dom";
import defaultImg from '../assets/img/default.jpg'
import ErgProgressBar from "./ErgProgressBar";
import RemainingBox from "./RemainingBox";

const Raffle = ({raffle}) => {
    let raffle_class = "";
    let picture = defaultImg
    if(raffle) {
        raffle_class = ((raffle.status === 'succeed') ? " raffle-success" : (raffle.status === 'failed') ? "raffle-unsuccess" : "")
        picture = Array.isArray(raffle.picture) && raffle.picture.length > 0 ? raffle.picture[0] : picture
    }

    return (
        <Link className="raffle-card-link" to={'/raffle/show/' + (raffle && raffle.id)}>
        <div className={`card raffle-card ${raffle_class}`}>
            <div className="card-body">
                <div className="raffle-img-container">
                    <div className="raffle-image-inner">
                        <img src={picture} className='full-width' alt=""/>
                    </div>
                </div>
                <h3 className="raffle-title mt-3 mb-3 text-center">
                    {raffle && raffle.name}
                </h3>
                <p className="raffle-text">
                    {raffle && raffle.description}
                </p>
                <RemainingBox raffle={raffle}/>
                <ErgProgressBar raffle={raffle}/>
            </div>
        </div>
    </Link>)
};

export default Raffle;
