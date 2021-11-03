const CreateRaffleTicketPrice = ({ value, handleChange, ticketPrice }) => {
    return (<>
        <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id={`erg${ticketPrice}`}
            onChange={() => handleChange(ticketPrice)}
            checked={ticketPrice === value}
        />
        <label className="btn btn-outline-danger" htmlFor={`erg${ticketPrice}`}
        >{ticketPrice} ERG</label>
    </>)
}

export default CreateRaffleTicketPrice;