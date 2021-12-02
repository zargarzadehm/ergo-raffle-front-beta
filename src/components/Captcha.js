import { useContext } from "react";
import ThemeContext from "../context";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({verifyCallback}) => {
    const context = useContext(ThemeContext);
    if (context.info.required)
        return <ReCAPTCHA sitekey={context.info.pubKey} onChange={verifyCallback} onExpired={() => verifyCallback('')}/>
    return null

}

export default Captcha;
