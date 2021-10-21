import { memo, useState } from "react";

const StepTwoD = memo(({formFeedback, defaultValue}) => {
    const [ ticketPercent, setTicketPercent ] = useState(defaultValue);
    const handleChange = (e) => {
      const { value } = e.target;
      setTicketPercent(value);
      formFeedback(value)
    }
    return(<div className="second-step step-2-d">
                    <div className="step-content text-center text-lg-start">
                      <h3 className="step-title mb-4">
                        What percentage do you prefer for each share?
                      </h3>
                      <div className="row">
                        <div className="col-4">
                          <form>
                            <div
                              className="
                                form-floating
                                create-raffle-input
                                charity-share-input
                              "
                            >
                              <input
                                value={ticketPercent}
                                type="text"
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
                          <p className="raffle-sharing winner-share">Estimation:</p>
                        </div>
                        <div className="col-4">
                          <p className="raffle-sharing service-share">Service: 5%</p>
                        </div>
                      </div>
                    </div>
                  </div>
    )
});

export default StepTwoD;