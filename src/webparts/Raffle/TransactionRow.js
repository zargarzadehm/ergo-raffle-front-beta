const TransactionRow = ({ transaction, row }) => {
    return (<>{transaction.type === 'Ticket' ?<div className="transaction-container my-5">
    <div className="row g-1 g-md-2 mb-2">
      <div className="col-1">
        <div
          className="transaction-id gray-field text-center row-number-box"
        >
          <p>
            <span className="row-number">{row}</span>
          </p>
        </div>
      </div>
      <div className="col-11">
        <div className="wallet-address-box gray-field">
          <p>
            Wallet Address:
            <span className="tickets-number"
              >{transaction.address}</span>
          </p>
        </div>
      </div>
    </div>
    <div
      className="
        row
        g-1 g-md-2
        justify-content-start justify-content-lg-end
      "
    >
      <div className="col-11 col-lg-8 offset-1 offset-lg-0">
        <div className="transaction-id gray-field">
          <p>
            Transaction ID
            <span className="transaction-id-text">{transaction.id}</span>
          </p>
        </div>
      </div>
      <div className="col-6 col-lg-3 offset-1 offset-lg-0">
        <div className="transaction-id gray-field">
          <p>
            Number of tickets:
            <span className="tickets-number"> {transaction.tickets} </span>
          </p>
        </div>
      </div>
    </div>
  </div> : null}</>)
}

export default TransactionRow;