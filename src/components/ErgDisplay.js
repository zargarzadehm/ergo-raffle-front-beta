import Erg from "./Erg";

const ErgDisplay = ({ raffle }) => {
    return (<p className="mt-1">
        <span className="remaining-erg"><Erg shouldDisplay={true} erg={!isNaN(raffle.erg) ?
            raffle.erg :
            raffle &&
            raffle.ticket &&
            raffle.ticket.erg} /></span> raised of
        <span className="total-erg"> <Erg erg={raffle.goal} shouldDisplay={false} /> </span>
        ERG
    </p>)
}

export default ErgDisplay;