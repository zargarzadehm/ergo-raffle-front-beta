import { useState } from "react";

const CreateRaffleName = ({formFeedback, defaultValue}) => {
    const [raffleName, setRaffleName] = useState(defaultValue || '');
    const handleChange = (e) => {
        let {value} = e.target;
        setRaffleName(value);
        formFeedback('raffleName', value)
    }

    return (<div className="first-step step-1-a">
            <div className="step-content text-center text-lg-start">
                <h3 className="step-title mb-4">
                    Set Raffle's Title.
                </h3>
                <form>
                    <div
                        className="form-floating create-raffle-input raffle-name-input">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Title"
                            required
                            value={raffleName}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default CreateRaffleName;
