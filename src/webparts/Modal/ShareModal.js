const ShareModal = () => {

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
              <div className={'col-4 text-center'}><a href={`https://t.me/share/url?url=${window.location.href}&text=Ergo Raffle`}
                rel="noreferrer" target="_blank">Telegram</a></div>
              <div className={'col-4 text-center'}><a href={`http://twitter.com/share?text=Ergo Raffle&url=${window.location.href}`}
                rel="noreferrer" target="_blank">Twitter</a></div>
              <div className={'col-4 text-center'}><a href={`whatsapp://send?text=${window.location.href}`} rel="noreferrer"
                target="_blank" data-action="share/whatsapp/share">WhatsApp</a></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>)
};

export default ShareModal;