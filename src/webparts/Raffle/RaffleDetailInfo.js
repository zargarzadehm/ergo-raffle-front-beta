import { memo, useContext } from "react";
import { toast } from "react-toastify";
import Day from "../../components/Day";
import ThemeContext from "../../context";

const RaffleDetailInfo = memo(({ raffle }) => {
  const context = useContext(ThemeContext);
  const notify = (msg) => toast(msg);
  const tagRaffle = () => {
    if (window.localStorage.getItem('pin') !== null) {
      const data = window.localStorage.getItem('pin').split(',');
      const exists = data.includes(raffle.id);
      if (!exists) {
        data.unshift(raffle.id);
        if (data.length > 8) {
          data.pop();
        }
        window.localStorage.setItem('pin', data.join(','));
        notify('Raffle Pinned');
      } else {
        const deletedItem = data.filter((a) => a !== raffle.id);
        window.localStorage.setItem('pin', deletedItem.join(','));
        let pinnedRaffles = [...context.pinnedRaffles];
        context.setPinnedRaffles(pinnedRaffles.filter((a) => a.id !== raffle.id));
        notify('Raffle Un Pinned');
      }
    } else {
      window.localStorage.setItem('pin', raffle.id);
      notify('Raffle Pinned');
    }
  }
  return (<>
    <h2 className="raffle-title">{raffle.name}</h2>
    <p className="raffle-full-text my-1">
      {raffle.description}
    </p>
    <div className="raffle-bottom-container d-flex align-items-center">
      <span className="icon-deadline deadline"></span>
      <p className="deadline-date">Deadline: <Day deadline={raffle.deadline} add_suffix={true} /></p>
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
