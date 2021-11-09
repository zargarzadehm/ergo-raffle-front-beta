import TicketTransactionRow from "./TicketTransactionRow"
import WinnerTransactionRow from "./WinnerTransactionRow"

const TransactionRow = ({ transaction, isWinner, isCharity, row }) => {
  return (
    isWinner
      ?
      <WinnerTransactionRow transaction={transaction} isWinner={true} />
      :
      isCharity
        ?
        <WinnerTransactionRow transaction={transaction} isWinner={false} />
        :
        <TicketTransactionRow transaction={transaction} row={row} />
  )
}

export default TransactionRow;