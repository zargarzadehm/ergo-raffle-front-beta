import staticText from "../../statics";

const EstimationBox = ({ deadline }) => {
  const calculateEstimation = () => {
    return (deadline / staticText.DAY_CONVERSION_SCALE) < 1
      ?
      Math.floor(((parseInt(deadline) / staticText.DAY_CONVERSION_SCALE) * 24)) + ' Hours!'
      :
      Math.floor(deadline / staticText.DAY_CONVERSION_SCALE) + ' Days!';
  }
  return <div className="col-6">
    <p className="">Estimation: {isNaN(parseInt(calculateEstimation())) ? 'No Estimation' : 'Almost ' + calculateEstimation()} </p>
  </div>
}

export default EstimationBox;