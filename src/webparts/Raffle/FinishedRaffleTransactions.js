import staticText from "../../statics";
import TransactionRow from "./TransactionRow";

const FinishedRaffleTransactions = ({ winnerRaffleTransactions, charityRaffleTransactions, ticketRaffleTransactions, titleRef, page }) => {
    const pageRowNumber = (key) => {
        return page > 2
            ?
            ((page - 1) * (staticText.PAGE_SIZE) + key - 1)
            :
            ((page - 1) * (staticText.PAGE_SIZE - winnerRaffleTransactions.length - charityRaffleTransactions.length)) + key + 1
    }
    return (<section id="raffle-transactions">
        <div className="container mt-5">
            <h2 className="transaction-title text-center mb-4" ref={titleRef}>
                {Array.isArray(ticketRaffleTransactions) && ticketRaffleTransactions.length > 0 ? "Details of transactions" : null}
            </h2>
            <div className="winner-box mb-5">
                {
                    winnerRaffleTransactions.map((item, key) =>
                    (
                        <TransactionRow
                            isWinner={true}
                            isCharity={false}
                            key={key + item.id + '-items'}
                            transaction={item} />
                    )
                    )
                }
                {
                    charityRaffleTransactions.map((item, key) => (
                        <TransactionRow
                            isWinner={false}
                            isCharity={true}
                            key={key + item.id + '-items-charity'}
                            transaction={item} />
                    )
                    )
                }
            </div>
        </div>
        <div className="container all-transactions">
            {
                ticketRaffleTransactions.map((item, key) =>
                (
                    <TransactionRow
                        isWinner={false}
                        isCharity={false}
                        key={key + item.id + '-items'}
                        transaction={item}
                        row={pageRowNumber(key)} />
                )
                )
            }
        </div>
    </section>)
}

export default FinishedRaffleTransactions;