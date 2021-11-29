import { memo, useContext, useState } from "react";
import ThemeContext from "../../../context";

const CreateRaffleTicketSharePercent = memo(({formFeedback, defaultValue}) => {
    const [ticketPercent, setTicketPercent] = useState(729);
    const context = useContext(ThemeContext);
    const handleChange = (e) => {
        const {value} = e.target;
        console.log(parseInt(value));
        console.log("info is ", context.info);
        if ((parseInt(value) < (100 - context.info.serviceFee) && parseInt(value) > 0) || value === '') {
            setTicketPercent(value);
            formFeedback('ticketPercent', value)
        }
    }
    return (<div className="second-step step-2-d">
        <div className="step-content text-center text-lg-start">
            <h3 className="step-title mb-4">
                Set the Charity Share.
            </h3>
            <div className="row">
                <div className="col-4">
                    <form>
                        <div className="form-floating create-raffle-input charity-share-input">
                            <input
                                value={ticketPercent}
                                type="number"
                                className="form-control"
                                id="charity-share"
                                placeholder="Ticket Share Percent"
                                required
                                onChange={handleChange}
                            />
                            <label htmlFor="charity-share">Charity Share</label>
                        </div>
                    </form>
                </div>
                <div className="col-4">
                    <p className="raffle-sharing winner-share">Winner
                        Percent: {100 - ticketPercent - context.info.serviceFee}%</p>
                </div>
                <div className="col-4">
                    <p className="raffle-sharing service-share">Service: {context.info.serviceFee}%</p>
                </div>
            </div>
        </div>
    </div>)
});

export default CreateRaffleTicketSharePercent;
