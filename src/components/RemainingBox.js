import { useContext } from "react";
import ThemeContext from "../context";
import staticText from "../statics";

const RemainingBox = ({ raffle }) => {
    const { info } = useContext(ThemeContext);
    const remainingOrPassedDays = () => {
        return raffle.status === 'active' ?
            Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) === 0 ?
                Math.abs((Math.ceil(((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) * 24))) + ' hours remaining' :
                Math.abs(Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE)) + ' days remaining'
            :
            Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) === 0 ?
                (Math.abs(Math.ceil((((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) * 24)))) + ' hours passed' :
                Math.abs(Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE)) + ' days passed';
    }
    return (<div className="remain-box mt-lg-5">
        {raffle.status === 'active' ? <p className="remaining-days">{remainingOrPassedDays()}</p> : <p className="remaining-days">{remainingOrPassedDays()}</p>}
    </div>)
}

export default RemainingBox;