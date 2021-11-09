import { useContext } from "react";
import ThemeContext from "../context";
import staticText from "../statics";

const Days = ({ raffle }) => {
    const { info } = useContext(ThemeContext);
    const remainingOrPassedDays = () => {
        return raffle.status === 'active' ?
            Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) === 0
                ?
                Math.abs((Math.ceil(((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) * 24))) + ' hours remaining'
                :
                Math.abs(Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE)) + ' days remaining'
            :
            Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) === 0
                ?
                (Math.abs(Math.ceil((((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE) * 24)))) + ' hours passed'
                :
                Math.abs(Math.floor((raffle.deadline - info.height) / staticText.DAY_CONVERSION_SCALE)) + ' days passed';
    }
    return (
        remainingOrPassedDays().indexOf('1 hours') >= 0 || remainingOrPassedDays().indexOf('1 days') >= 0
            ?
            remainingOrPassedDays().split('days').join('day').split('hours').join('hour')
            :
            remainingOrPassedDays()
    )
}

export default Days;