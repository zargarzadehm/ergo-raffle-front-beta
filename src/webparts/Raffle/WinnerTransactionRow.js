import { memo } from "react";

const WinnerTransactionRow = memo(({ transaction, isWinner }) => {
  return (<>
    {
      <h2 className="winner-title text-left mb-4">
        {isWinner ?
          "Winner Transaction" :
          "Charity Transaction"}
      </h2>
    }
    <div className="winner-address-box mb-2 bordered-field-orange">
      <p>
        Wallet Address : <span className="wallet-address-text">{transaction.address}</span>
      </p>
    </div>
    <div className="row g-1 g-md-2 mb-4">
      <div className={isWinner ? "col-lg-9" : "col-lg-12"}>
        <div className="transaction-id bordered-field-orange">
          <p>
            Transaction ID :<a href={transaction.link} target="_blank" rel="noreferrer">
              <span className="transaction-id-text">{transaction.id}</span>
            </a>
          </p>
        </div>
      </div>
      {isWinner ? (
        <div className={"col-lg-3"}>
          <div className="transaction-id bordered-field-orange mt-2 mt-lg-0">
            <p>
              Number of tickets :
              <span className="tickets-number"> {transaction.tickets} </span>
            </p>
          </div>
        </div>)
        :
        null
      }
    </div>
  </>)
})

export default WinnerTransactionRow;