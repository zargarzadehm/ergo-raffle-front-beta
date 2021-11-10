import { memo } from "react";
import { toast } from "react-toastify";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const RaffleModalAddress = memo(({ modInfo }) => {
    const copyClipboard = () => {
        toast('Copied');
    }
    return (<>
        <p className="charity-address text-start">Address</p>
        <div className="row charity-address-box">
            <div className="col-lg-9">
                <div className="charity-address-field">
                    <p className="charity-address-text">
                        {modInfo.address}
                    </p>
                </div>
            </div>
            <div className="col-lg-3">
                <CopyToClipboard text={modInfo.address}
                    onCopy={() => copyClipboard}>
                    <button className="btn copy-charity mt-3 mt-lg-0" onClick={copyClipboard}>
                        copy
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    </>)
});

export default RaffleModalAddress;