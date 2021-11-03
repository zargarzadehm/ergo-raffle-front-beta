import RaffleTicket from "./RaffleTicket";

const RaffleTickets = ({ raffleTransactions }) => {
    return (<section id="your-tickets" className="my-5">
        <div className="container">
            <div className="your-tickets-box text-center p-3">
                {window.localStorage.getItem('wallet') !== null ? <>
                    <h3 className="your-tickets-title mt-3">Your Tickets</h3>
                    {((Array.isArray(raffleTransactions) ? raffleTransactions : [])).map((item, key) =>
                        (<RaffleTicket raffle={item} key={Math.random() + key + '-transaction-raffle'} />))}
                </> : null}
            </div>
        </div>
    </section>)
}

export default RaffleTickets;