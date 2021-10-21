import { memo } from "react";

const DonationBackButton = memo(({reduceStep})=>{
    return (<div className="col-6 text-end">
    <button type="button" className="btn donate-back back-btn mt-3" onClick={reduceStep}>
    back
    </button>
    </div>)
});

export default DonationBackButton;

