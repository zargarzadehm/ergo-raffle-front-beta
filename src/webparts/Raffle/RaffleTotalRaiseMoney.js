import Erg from "../../components/Erg";

const TotalRaisedMoney = ({ raffle }) => {
    const raisedErg = () => {
        return (raffle.ticket && raffle.ticket.erg) || 0;
    }

    return (<p>Total Raised Money: <span className="total-raised"><Erg erg={raisedErg()} shouldDisplay={true} /></span></p>)
}

export default TotalRaisedMoney;