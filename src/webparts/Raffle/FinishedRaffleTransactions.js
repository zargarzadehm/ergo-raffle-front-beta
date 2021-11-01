import TransactionRow from "./TransactionRow";
import WinnerTransactionRow from "./WinnerTransactionRow";

const FinishedRaffleTransactions = ({ winnerRaffleTransactions, charityRaffleTransactions, ticketRaffleTransactions, titleRef }) => {
    return (<section id="raffle-transactions">
        <div className="container mt-5">
            <h2 className="transaction-title text-center mb-4" ref={titleRef}>
                {Array.isArray(ticketRaffleTransactions) && ticketRaffleTransactions.length > 0 ? "Details of transactions" : null}
            </h2>
            <div className="winner-box mb-5">
                {[...winnerRaffleTransactions].map((item, key) => (<WinnerTransactionRow isWinner={true} key={key + Math.random() + '-items'} transaction={item} />))}
                {[...charityRaffleTransactions].map((item, key) => (<WinnerTransactionRow isWinner={false} key={key + Math.random() + '-items-charity'} transaction={item} />))}
            </div>
        </div>
        <div className="container all-transactions">
            {(Array.isArray(ticketRaffleTransactions) ? [...ticketRaffleTransactions] : []).map((item, key) => (<TransactionRow key={key + Math.random() + '-items'} transaction={item} row={key + 1} />))}
        </div>
    </section>)
}

export default FinishedRaffleTransactions;