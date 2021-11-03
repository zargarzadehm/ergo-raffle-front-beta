import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import ThemeContext from "../../context";

const StepThreeDonation = memo(({ handleFeedback }) => {
  const context = useContext(ThemeContext);
  const [response, setResponse] = useState('');
  const handleChange = (e) => {
    const { checked } = e.target;
    let enabled = false;
    if (checked) {
      if (context.info.required) {
        if (response.length > 5) {
          enabled = true
        } else {
          enabled = false;
        }
      } else {
        enabled = true;
      }
      handleFeedback(enabled, response)
    } else {
      handleFeedback(false, null);
    }
  }

  const verifyCallback = (res) => {
    setResponse(res);
    let enabled = false;
    if (context.info.required) {
      if (res.length > 5) {
        enabled = true;
      } else {
        enabled = false;
      }
    } else {
      enabled = true;
    }
    handleFeedback(enabled, res)
  };
  return (<>
    <ThemeContext.Consumer>
      {({ info }) => (<>
        <h3 className="step-title">Please accept our terms of use</h3>
        <div className="row accept-terms my-5">
          <div className="col-lg-6 verify-recaptcha text-center">
            {info.required ?
              <ReCAPTCHA
                sitekey={info.pubKey}
                onChange={verifyCallback}
              />
              : null}
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
      </>)}
    </ThemeContext.Consumer>
  </>)
});

export default StepThreeDonation;