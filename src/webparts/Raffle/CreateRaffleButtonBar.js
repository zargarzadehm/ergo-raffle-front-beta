const CreateRaffleButtonBar = ({ activeStep, isActive, nextStep, prevStep, isTermsAccepted, submitRaffleCreate }) => {
    return (<div className="row action-button mb-5 justify-content-center">
        <div id="back-container" className="col-6 text-end">
            {activeStep > 1 ?
                <button className="btn create-back back-btn mt-3" onClick={prevStep}>
                    Back
                </button>
                : null}
        </div>
        <div id="next-container" className="col-6 text-center">
            {activeStep < 10 ?
                <button disabled={isActive ? null : 'disabled'} className="btn create-next next-btn mt-3" onClick={nextStep}>
                    Next
                </button>
                : null}
            {activeStep === 10 ?
                <button
                    disabled={!isTermsAccepted}
                    type="button"
                    className="btn create-next finish mt-3"
                    onClick={() => submitRaffleCreate()}>
                    Finish
                </button>
                : null}
        </div>
    </div>)
}

export default CreateRaffleButtonBar;
