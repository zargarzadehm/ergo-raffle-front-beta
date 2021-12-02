import React from "react";
import RaffleTicketPriceBadge from "./RaffleTicketPriceBadge";
import * as constant from '../../../statics';

const RaffleTicketPrice = ({init, setValue, setValid}) => {
    setValid(init > 0);
    return (
        <div className="step-content text-center text-lg-start">
            <h3 className="step-title mb-4">
                Set each Ticket's Price.
            </h3>
            <div className="row mt-3">
                <div className="text-center text-lg-start ticket-options-container">
                    {constant.TICKET_PRICES.map(item =>
                        <RaffleTicketPriceBadge
                            ticketPrice={item}
                            handleChange={() => setValue(item)}
                            value={init}/>
                    )}
                </div>
            </div>
            <form>
                <div className="form-floating create-raffle-input raffle-donation-input mt-4">
                    <input
                        value={init}
                        type="number"
                        className="form-control"
                        id="ticket-price"
                        placeholder="Custom Price"
                        onChange={(e) => setValue(Number(e.target.value + ''))}
                    />
                    <label htmlFor="ticket-price">Custom Price</label>
                </div>
            </form>
        </div>
    )
};

export default RaffleTicketPrice;
