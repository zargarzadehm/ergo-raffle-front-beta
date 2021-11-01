import staticText from "../statics";

const ErgDisplay = ({ raffle }) => {
    const remainingRaffle = () => {
        return (!isNaN(raffle.erg) ? raffle.erg/staticText.ERG_SCALE :((raffle && raffle.ticket && raffle.ticket.erg)) / staticText.ERG_SCALE);
    }

    return (<p className="mt-1">
        <span className="remaining-erg">{remainingRaffle()}</span> ERG raised of
        <span className="total-erg"> {raffle.goal / staticText.ERG_SCALE} </span>
        ERG
    </p>)
}

export default ErgDisplay;