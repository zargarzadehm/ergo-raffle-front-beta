import { memo } from "react";

const RaffleModalAddress = memo(({modInfo})=>{
    return(<>
    <p className="charity-address text-start">Charity address</p>
        <div className="row charity-address-box">
            <div className="col-lg-9">
                <div className="charity-address-field">
                <p className="charity-address-text">
                    {modInfo.address}
                </p>
                </div>
            </div>
            <div className="col-lg-3">
                <button type="button" className="btn copy-charity mt-3 mt-lg-0">
                copy
                </button>
            </div>
        </div>
    </>)
});

export default RaffleModalAddress;