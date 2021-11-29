import { memo } from "react"

const RaffleBarSubStepsOne = memo(({activeStep}) => {
    return (
        <>
            <p className={activeStep === 1 ? "create-raffle-substep active-substep" : "create-raffle-substep done-substep"}>
                Title
            </p>
            <p className={
                activeStep === 2
                    ?
                    "create-raffle-substep active-substep"
                    :
                    activeStep > 2
                        ?
                        "create-raffle-substep done-substep" : "create-raffle-substep"}>Upload Photos</p>
            <p className={activeStep === 3
                ?
                "create-raffle-substep active-substep"
                :
                activeStep > 3
                    ?
                    "create-raffle-substep done-substep" : "create-raffle-substep"}>Description</p>
            <p className={
                activeStep === 4
                    ?
                    "create-raffle-substep active-substep"
                    :
                    activeStep > 4
                        ?
                        "create-raffle-substep done-substep" : "create-raffle-substep"}>Charity Address</p>
            <p className={
                activeStep === 5
                    ?
                    "create-raffle-substep active-substep"
                    :
                    activeStep > 5
                        ?
                        "create-raffle-substep done-substep" : "create-raffle-substep"}>Wallet Address</p></>)
});

export default RaffleBarSubStepsOne;
