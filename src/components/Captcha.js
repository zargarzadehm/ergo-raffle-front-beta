import { useContext } from "react";
import ThemeContext from "../context";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({verifyCallback}) => {
    const context = useContext(ThemeContext);
    const verifyCall = (response) => {
        verifyCallback(response)
    }
    return (context.info.required ?
        <ReCAPTCHA
          sitekey={context.info.pubKey}
          onChange={verifyCall}
        />
        :
        null
      )
}

export default Captcha;