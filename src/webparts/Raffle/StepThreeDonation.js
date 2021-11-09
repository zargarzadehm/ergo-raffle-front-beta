import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../context";
import Captcha from "../../components/Captcha";

const StepThreeDonation = memo(({ handleFeedback }) => {
  const context = useContext(ThemeContext);
  const [response, setResponse] = useState('');
  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      let enabled = context.info.required ? response.length > 5 : true;
      handleFeedback(enabled, response)
    } else {
      handleFeedback(false, null);
    }
  }

  const verifyCallback = (res) => {
    setResponse(res);
    let enabled = context.info.required ? res.length > 5 : true;
    handleFeedback(enabled, res)
  };
  return (<>
    <h3 className="step-title">Please accept our terms of use</h3>
    <div className="row accept-terms my-5">
      <div className="col-lg-6 verify-recaptcha text-center">
        <Captcha verifyCallback={(response) => verifyCallback(response)} />
      </div>
      <div
        className="
          my-3 my-lg-0
          col-lg-6
          verify-terms
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            I agree to the <Link to={'/'}> terms of use</Link>
          </label>
        </div>
      </div>
    </div>
  </>)
});

export default StepThreeDonation;