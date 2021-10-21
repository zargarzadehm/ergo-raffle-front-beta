import { memo } from "react";
import ThemeContext from "../../context";

const RaffleDetailInfo = memo(({raffle}) =>{
  const addDays = (days) => {
    var result = new Date();
      result.setDate(result.getDate() + days);
      return result.toDateString();
    }
    return (<>
    <ThemeContext.Consumer>
      {({info})=>(<>
    <h2 className="raffle-title">{raffle.name}</h2>
    <p className="raffle-full-text my-1">
      {raffle.description}
    </p>
    <div className="raffle-bottom-container d-flex align-items-center">
      <span className="icon-deadline deadline"></span>
      <p className="deadline-date">Deadline: {addDays((raffle.deadline-info.height)/720)}</p>
      <div
        className="raffle-icons flex-grow-1 d-flex justify-content-end"
      >
        <button className="tag" id="tag-icon">
          <span className="icon-tag tag-icon"></span>
        </button>
        <button className="share" id="share-icon">
          <span className="icon-share share-icon"></span>
        </button>
      </div>
    </div>
    </>)}
    </ThemeContext.Consumer>
    </>)
});

export default RaffleDetailInfo;