import { memo, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { supportFormSubmission } from "../../service/support.service";
const SupportForm = memo(()=> {
    const supportTextRef = useRef();
    const [ shouldDisable, setShouldDisable ] = useState(true);
    const handleChange = () => {
      if(supportTextRef.current.value.length > 2) {
        setShouldDisable(false);
      } else {
        setShouldDisable(true);
      }
    }
    const notify = (msg) => toast(msg);

    const supportSubmit = (text) => {
      supportFormSubmission(text).then(
        ({data})=> {
          if(data.state === 'success') {
            setShouldDisable(true);
            notify("Support Has Been Sent!");  
            supportTextRef.current.value = '';
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
      supportSubmit(supportTextRef.current.value);
    }
    
    return (<>
    <h2 className="faq-title text-center mb-4">Want help?</h2>
    <div className="support-ticket-container">
      <form>
        <fieldset>
          <legend>Write your message here</legend>
          <textarea
            ref={supportTextRef}
            className="form-control support-ticket-textarea"
            id="support-ticket-textarea"
            rows="7"
            onChange={handleChange}
          ></textarea>
        </fieldset>
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