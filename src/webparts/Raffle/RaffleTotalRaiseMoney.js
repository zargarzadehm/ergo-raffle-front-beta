import staticText from "../../statics";

const TotalRaisedMoney = ({raffle}) => {
    const raisedErg = () => {
        return (((raffle.ticket && raffle.ticket.erg) || 0) / staticText.ERG_SCALE);
    }

    return (<p>Total Raised Money: <span className="total-raised">{raisedErg()}</span> ERG</p>)
}

export default TotalRaisedMoney;