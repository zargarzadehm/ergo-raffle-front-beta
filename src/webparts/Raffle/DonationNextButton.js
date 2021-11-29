import { memo } from "react";

const DonationNextButton = memo(({ toggleNextStep }) => {
    return (<div className="col-6 text-start">
        <button type="button" onClick={toggleNextStep} className="btn donate-next next2 mt-3">
            Next
        </button>
    </div>)
});

export default DonationNextButton;
