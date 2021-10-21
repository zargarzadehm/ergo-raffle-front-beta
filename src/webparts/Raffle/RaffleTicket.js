import { memo } from "react"

const RaffleTicket = memo(({raffle})=>{
    return (<div className="row mb-2">
    <div className="col-md-1">
      <div className=""></div>
    </div>
    <div className="col-lg-8">
      <div className="wallet-address-box text-start">
        <p className="wallet-address-title">Transaction ID: {raffle.id}</p>
      </div>
    </div>
    <div className="d-none d-lg-block col-lg-3">
      <div className="transaction-id text-start">
        <p className="tickets-number-title">Number of tickets: {raffle.tickets}</p>
      </div>
    </div>
  </div>)
})

export default RaffleTicket;