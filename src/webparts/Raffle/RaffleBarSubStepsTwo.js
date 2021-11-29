const RaffleBarSubStepsTwo = ({ activeStep }) => {
  return (<>
    <p className={
      activeStep === 6
        ?
        "create-raffle-substep active-substep" :
        "create-raffle-substep done-substep"
    }>
      Donation Goal
    </p>
    <p className={
      activeStep === 7
        ?
        "create-raffle-substep active-substep"
        :
        activeStep > 7
          ?
          "create-raffle-substep done-substep" : "create-raffle-substep"
    }>Ticket Price</p>
    <p className={activeStep === 8
      ?
      "create-raffle-substep active-substep"
      :
      activeStep > 8
        ?
        "create-raffle-substep done-substep" : "create-raffle-substep"
    }>Deadline</p>
    <p className={
      activeStep === 9
        ?
        "create-raffle-substep active-substep"
        :
        activeStep > 9
          ?
          "create-raffle-substep done-substep"
          :
          "create-raffle-substep"
    }>Distribution</p>
  </>)
}

export default RaffleBarSubStepsTwo;
