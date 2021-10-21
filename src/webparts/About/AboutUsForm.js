import { memo, useRef, useState } from "react"
import { toast } from 'react-toastify';
import { aboutFormSubmission } from "../../service/support.service";

const AboutUsForm = memo(() => {
    const emailRef = useRef();
    const messageRef = useRef();
    const [ shouldDisable, setShouldDisable ] = useState(true);
    const notify = (msg) => toast(msg);
    const handleSubmit = (e) => {
      e.preventDefault();
      aboutFormSubmission(emailRef.current.value, messageRef.current.value).then(
        ({data})=> {
          if(data.state === 'success') {
            setShouldDisable(true);
            toast('Form Fubmitted');
            emailRef.current.value = '';
            messageRef.current.value = '';
          } else {
            setShouldDisable(false);
            toast(data.message);
          }
        }
      ).catch((e)=>{
        setShouldDisable(false);
        notify(e.response.data.message);
      });
    }
    const handleChange = () => {
      let sDisable = true;
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(emailRef.current.value)) {
        if(messageRef.current.value.length > 2) {
          sDisable = false;
        } else {
          sDisable = true;
        }
      } else {
        sDisable = true;
      }
      setShouldDisable(sDisable);
    }
    return(<><h2 className="about-us-title text-center mb-4">Contact Us</h2>
    <div className="contact-form-container">
      <form action="">
        <h4 className="about-form-subtitle about-email">
          What's your email address?
        </h4>
        <div className="form-floating about-email-form">
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <h4 className="about-form-subtitle about-message mt-5">
          What's your message?
        </h4>
        <div className="form-floating">
          <textarea
            ref={messageRef}
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea2">Your Message</label>
        </div>
        <div className="text-center">
          <button type="submit" disabled={shouldDisable} className="btn contact-us-btn" onClick={handleSubmit}>Send</button>
        </div>
      </form>
    </div></>)
});

export default AboutUsForm;