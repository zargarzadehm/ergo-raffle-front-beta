import RaffleTicket from "./RaffleTicket";

const RaffleTickets = ({ raffleTransactions }) => {
    return (<section id="your-tickets" className="my-5">
        <div className="container">
            <div className="your-tickets-box text-center p-3">
                {window.localStorage.getItem('wallet') !== null ? <>
                    <h3 className="your-tickets-title mt-3">{raffleTransactions.length === 0 ? "No Tickets Yet" : "Your Tickets"}</h3>
                    {
                        raffleTransactions.map((item, key) =><RaffleTicket raffle={item} key={item.id + key + '-transaction-raffle'} />)
                    }
                </>
                    :
                    null
                }
            </div>
        </div>
    </section>)
}

export default RaffleTickets;
