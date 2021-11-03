import { memo, useContext } from "react";
import { toast } from "react-toastify";
import ThemeContext from "../../context";
import staticText from "../../statics";

const RaffleDetailInfo = memo(({ raffle }) => {
  const context = useContext(ThemeContext);
  const notify = (msg) => toast(msg);
  const tagRaffle = () => {
    if (window.localStorage.getItem('pin') !== null) {
      const data = JSON.parse(window.localStorage.getItem('pin'));
      let exists = false;
      for (let item of data) {
        if (item.id === raffle.id) {
          exists = true;
        }
      }
      if (!exists) {
        data.push(raffle);
      }
      window.localStorage.setItem('pin', JSON.stringify(data));
    } else {
      window.localStorage.setItem('pin', JSON.stringify([raffle]));
    }
    notify('Raffle Pinned');
  }
  const remainingDays = () => {
    return Math.floor(((raffle.deadline - context.info.height) / staticText.DAY_CONVERSION_SCALE)) === 0 ?
      Math.ceil((((raffle.deadline - context.info.height) / staticText.DAY_CONVERSION_SCALE) * 24)) + ' hours remaining' :
      Math.ceil(((raffle.deadline - context.info.height) / staticText.DAY_CONVERSION_SCALE)) + ' days remaining'
  }
  const passedDays = () => {
    return Math.abs(Math.floor((raffle.deadline - context.info.height) / (staticText.DAY_CONVERSION_SCALE)))
  }
  return (<>
    <h2 className="raffle-title">{raffle.name}</h2>
    <p className="raffle-full-text my-1">
      {raffle.description}
    </p>
    <div className="raffle-bottom-container d-flex align-items-center">
      <span className="icon-deadline deadline"></span>
      <p className="deadline-date">Deadline: {raffle.status === 'active' ? <span className="remaining-days">{remainingDays()} </span> :
        <span className="remaining-days">{passedDays()} days passed</span>}</p>
      <div
        className="raffle-icons flex-grow-1 d-flex justify-content-end"
      >
        <button className="tag" id="tag-icon" onClick={tagRaffle}>
          <span className="icon-tag tag-icon"></span>
        </button>
        <button className="share" id="share-icon" data-bs-toggle="modal" data-bs-target="#shareModal">
          <span className="icon-share share-icon"></span>
        </button>
      </div>
    </div>
  </>)
});

export default RaffleDetailInfo;