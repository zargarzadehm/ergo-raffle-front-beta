import { useContext } from "react";
import ThemeContext from "../context";
import staticText from "../statics";

const Days = ({ raffle }) => {
    const { info } = useContext(ThemeContext);
    const remainingOrPassedDays = () => {
        return raffle.status === 'active' ?
            Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) === 0
                ?
                Math.abs((Math.ceil(((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) * 24))) + ' Hours to Go'
                :
                Math.abs(Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE)) + ' Days to Go'
            :
            Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) === 0
                ?
                (Math.abs(Math.ceil((((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) * 24)))) + ' hours passed'
                :
                Math.abs(Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE)) + ' days passed';
    }
    return (
        remainingOrPassedDays().indexOf('1 Hours') === 0 || remainingOrPassedDays().indexOf('1 Days') === 0
            ?
            remainingOrPassedDays().split('Days').join('Day').split('Hours').join('Hour')
            :
            remainingOrPassedDays()
    )
}

export default Days;
