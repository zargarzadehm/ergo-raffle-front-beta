import React, { useContext } from "react";
import { toast } from "react-toastify";
import Day from "../../components/Day";
import { getPinnedRaffles, setPinnedRaffles } from "../../utils/utils";

const DetailInfo = ({raffle}) => {
    const tagRaffle = () => {
        let pinned = getPinnedRaffles().reverse();
        if(pinned.includes(raffle.id)){
            pinned = pinned.filter(item => item !== raffle.id)
            toast('Raffle Un Pinned');
        }else{
            pinned.push(raffle.id)
            toast('Raffle Pinned');
        }
        setPinnedRaffles(pinned.reverse())
    }
    return (
        <React.Fragment>
            <h2 className="raffle-title">{raffle.name}</h2>
            <p className="raffle-full-text my-1">
                {raffle.description}
            </p>
            <div className="raffle-bottom-container d-flex align-items-center">
                <span className="icon-deadline deadline"/>
                <p className="deadline-date">Deadline: <Day deadline={raffle.deadline} add_suffix={true}/></p>
                <div className="raffle-icons flex-grow-1 d-flex justify-content-end">
                    <button className="tag" id="tag-icon" onClick={tagRaffle}>
                        <span className="icon-tag tag-icon"/>
                    </button>
                    <button className="share" id="share-icon" data-bs-toggle="modal" data-bs-target="#shareModal">
                        <span className="icon-share share-icon"/>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
};

export default DetailInfo;
