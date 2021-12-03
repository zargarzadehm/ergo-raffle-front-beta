import React from "react";

const BetaModal = ({close, show}) => {
    return (
        <React.Fragment>
            <div
                className={"modal fade" + (show ? " show" : "")}
                tabIndex="-1"
                style={{display: show ? "block" : "none"}}
                aria-labelledby="donationModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">
                        <div className="modal-header">
                            <button
                                onClick={close}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            This is the Ergo Raffle Beta. No new raffles can be created anymore. The Beta version is
                            being maintained in order to complete running raffles.
                        </div>
                        <div className="modal-footer">
                            <a className="btn btn-create-raffle" href={"http://ergoraffle.com"}>
                                Go to ergoraffle.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"modal-backdrop fade" + (show ? " show" : "")} onClick={close}/>
        </React.Fragment>
    )
}

export default BetaModal;
