import CreateRaffleSpecification from "./CreateRaffleSpecification";
import CreateRaffleDonationGoal from "./CreateRaffleDonationGoal";
import RaffleBarSubStepsOne from "./RaffleBarSubStepsOne";
import RaffleBarSubStepsTwo from "./RaffleBarSubStepsTwo";

const CreateRaffleStepIndicator = ({ setIsActive, activeStep, subStep, barTitle, raffleName, address, description,
    files, activeStepsTotal, walletAddress, handleSteps, ergGoal, ticketPercent, ticketPrice, deadline }) => {
    return (<>
        <div className="create-raffle-body my-5">
            <div className="mobile-raffle-steps d-lg-none text-start mb-5">
                <p className="substeps-mobile">
                    field <span className="substep-number">{subStep}</span> of
                    <span className="total-substeps">{activeStepsTotal[activeStep < 4 ? 0 : activeStep < 8 ? 1 : 2]}</span>:
                    <span className="substep-name">{barTitle[activeStep]}</span>
                </p>
            </div>
            <div className={activeStep >= 4 ? "row step-1-container d-done" : "row step-1-container"}>
                <div
                    className="
                    d-none d-lg-flex
                    flex-lg-column
                    col-lg-4
                    create-raffle-sidebar
                  "
                >
                    {activeStep < 6 ? <>
                        <RaffleBarSubStepsOne activeStep={activeStep} />
                    </> : null}
                </div>
                <div className="col-lg-8 create-raffle-steps-content">
                    <CreateRaffleSpecification
                        formFeedback={(key, value) => handleSteps(key, value)}
                        setIsActive={setIsActive}
                        activeStep={activeStep}
                        raffleName={raffleName}
                        address={address}
                        description={description}
                        files={files}
                        walletAddress={walletAddress} />
                </div>
            </div>
            {activeStep > 5 ?
                <div className={"row step-2-container"}>
                    <div
                        className="
                    d-none d-lg-flex
                    flex-lg-column
                    col-lg-4
                    create-raffle-sidebar
                  ">
                        {activeStep < 10 ?
                            <RaffleBarSubStepsTwo activeStep={activeStep} /> : null}
                    </div>
                    <div className="col-lg-8 create-raffle-steps-content">
                        <CreateRaffleDonationGoal
                            formFeedback={(key, value) => handleSteps(key, value)}
                            activeStep={activeStep}
                            ergGoal={ergGoal}
                            ticketPrice={ticketPrice}
                            ticketPercent={ticketPercent}
                            deadline={deadline} />
                    </div>
                </div>
                : null}
        </div>
    </>)
}

export default CreateRaffleStepIndicator;