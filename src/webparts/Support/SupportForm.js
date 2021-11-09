import { memo, useState } from "react";
import { toast } from 'react-toastify';
import { supportFormSubmission } from "../../service/support.service";
import Captcha from "../../components/Captcha";

const SupportForm = memo(() => {
  const [shouldDisable, setShouldDisable] = useState(true);
  const [supportText, setSupportText] = useState('');
  const [response, setResponse] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSupportText(value);
    if (value.length > 2) {
      setShouldDisable(false);
    } else {
      setShouldDisable(true);
    }
  }
  const notify = (msg) => toast(msg);

  const supportSubmit = () => {
    supportFormSubmission(supportText, response).then(
      ({ data }) => {
        if (data.state === 'success') {
          setShouldDisable(true);
          notify("Support Has Been Sent!");
          setSupportText('');
        } else {
          setShouldDisable(false);
          notify(data.message)
        }

      }).catch((e) => {
        setShouldDisable(false);
        notify(e.response.data.message);
      });
  }
  const support = (e) => {
    e.preventDefault();
    supportSubmit();
  }
  function verifyCallback(value) {
    setResponse(value);
  }
  return (<>
    <h2 className="faq-title text-center mb-4">Want help?</h2>
    <div className="support-ticket-container">
      <form>
        <fieldset>
          <legend>Write your message here</legend>
          <textarea
            className="form-control support-ticket-textarea"
            id="support-ticket-textarea"
            rows="7"
            value={supportText}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        <div className="recaptcha-cont">
          <Captcha verifyCallback={(response) => verifyCallback(response)} />
        </div>
        <div className="submit-btn-container text-center">
          <button type="Submit" className="btn support-submit mt-5" disabled={shouldDisable} onClick={support}>
            Submit
          </button>
        </div>
      </form>
    </div>
  </>)
});

export default SupportForm;