import staticText from "../../statics";

const ShareModal = () => {
    const shareInfo = staticText.shareInfo;
    return (<div
        className="modal fade"
        id="shareModal"
        tabIndex="-1"
        aria-labelledby="shareModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <label htmlFor="Wallet-address" className="col-form-label text-center d-flex"
                    >Where do you want to share?</label>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className={'row'}>
                            {Object.keys(shareInfo).map((key) => (
                                <div className={'col-4 text-center'} key={(key + (Math.random)) + '-share-tab'}><a
                                    href={shareInfo[key](window.location.href)}
                                    rel="noreferrer" target="_blank">{key}</a>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
};

export default ShareModal;
