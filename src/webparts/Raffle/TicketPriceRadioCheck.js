const TicketPriceRadioCheck = ({ radioCheck, handleChange, value }) => {
    return (<>
        <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id={`${value}-tickets`}
            value={value}
            checked={radioCheck === value}
            onChange={handleChange}
        />
        <label className="btn btn-outline-danger" htmlFor={`${value}-tickets`}>{value} Ticket{value > 1 ? "s" : null}</label>
    </>)
}

export default TicketPriceRadioCheck;
