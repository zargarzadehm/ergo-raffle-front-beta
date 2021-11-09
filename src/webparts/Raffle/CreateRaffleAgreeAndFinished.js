import { memo, useContext } from "react";
import ThemeContext from "../../context";
import { Link } from "react-router-dom";
import Captcha from "../../components/Captcha";


const CreateRaffleAgreeAndFinished = memo(({ setResponse, response, setIsTermsAccepted }) => {
  const context = useContext(ThemeContext);
  const handleTerms = (e) => {
    const { checked } = e.target;
    if (checked) {
      let enabled = true;
      if (context.info.required && response.length < 10) {
        enabled = false;
      }
      setIsTermsAccepted(enabled);
    } else {
      setIsTermsAccepted(false);
    }
  }
  function verifyCallback(value) {
    setResponse(value);
    let enabled = true;
    if (context.info.required && value.length < 10) {
      enabled = false;
    }
    setIsTermsAccepted(enabled);
  }
  return (<ThemeContext.Consumer>
    {({ info }) => (
      <div className={"row step-3-container"}>
        <h3 className="step-title">Please accept our terms of use</h3>
        <div className="row accept-terms my-5">
          <div className="col-lg-6 verify-recaptcha text-center">
            <Captcha verifyCallback={(response)=> verifyCallback(response)} />
          </div>
          <div
            className="
                my-5 my-lg-0
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
                value="on"
                id="flexCheckDefault"
                onChange={handleTerms}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I agree to the <Link to={'/'} className="terms-link"> terms of use</Link>
              </label>
            </div>
          </div>
        </div>
      </div>)}
  </ThemeContext.Consumer>)
});

export default CreateRaffleAgreeAndFinished;