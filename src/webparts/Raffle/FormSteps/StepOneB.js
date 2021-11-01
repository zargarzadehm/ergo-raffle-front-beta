import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import staticText from "../../../statics";
import RaffleImgFileUploader from "../RaffleImgFileUploader";

const StepOneB = memo(({ formFeedback, defaultValue, preview, setIsActive }) => {
  const imageOneRef = useRef();
  const imageTwoRef = useRef();
  const imageThreeRef = useRef();
  const imageFourRef = useRef();
  const [isLoading,setIsLoading] = useState([false,false,false,false]);
  const [files, setFiles] = useState(defaultValue);
  const fillContent = async (result, index) => {
    const filesTemp = [...files];
    filesTemp[index] = staticText.FILE_TO_SEND_PREFIX+result;
    setFiles(filesTemp);
    if (index === 0) {
      try {
        imageOneRef.current.src = result;
      } catch (e) { }
    } else if (index === 1) {
      try {
        imageTwoRef.current.src = result;
      } catch (e) { }
    } else if (index === 2) {
      try {
        imageThreeRef.current.src = result;
      } catch (e) { }
    } else {
      try {
        imageFourRef.current.src = result;
      } catch (e) { }
    }
    formFeedback('files',[...filesTemp]);
  }
  const notify = (msg) => toast(msg);
  const isFileImage = (file) => {
    return file && file['type'].split('/')[0] === 'image';
  }
  const getBase64 = async (e, cb, index) => {
    const file = e.target.files[0];
    const tempLoad = [false,false,false,false];
    setIsActive(false);
    tempLoad[index] = true;
    setIsLoading([...tempLoad]);
    if (isFileImage(file)) {
      if(file.size < staticText.FILE_SIZE_LIMITATION) {
      const file = e.target.files[0]
      let form = new FormData();
      form.append('file', file);

      return fetch(staticText.UPLOAD_API_URL, {
        method: 'POST',
        body: form,
      }).then(res => res.json())
        .then(res => {
          notify('File Uploaded');
          setIsActive(true);
          setIsLoading([false,false,false,false]);
          cb(`${res.value.cid}`, index);
        })
      } else {
        setIsLoading([false,false,false,false]);
        notify('File is Too Large');  
      }
    } else {
      notify('File is not image');
    }
  }

  useEffect(() => {
    if (typeof files[0] === 'string') {
      try {
        imageOneRef.current.src = files[0].split(staticText.FILE_TO_SEND_PREFIX).join(staticText.FILE_URL_PREVIEW);
      } catch (e) { }
    }
    if (typeof files[1] === 'string') {
      try {
        imageTwoRef.current.src = files[1].split(staticText.FILE_TO_SEND_PREFIX).join(staticText.FILE_URL_PREVIEW);
      } catch (e) { }
    }
    if (typeof files[2] === 'string') {
      try {
        imageThreeRef.current.src = files[2].split(staticText.FILE_TO_SEND_PREFIX).join(staticText.FILE_URL_PREVIEW);
      } catch (e) { }
    }
    if (typeof files[3] === 'string') {
      try {
        imageFourRef.current.src = files[3].split(staticText.FILE_TO_SEND_PREFIX).join(staticText.FILE_URL_PREVIEW);
      } catch (e) { }
    };
  }, [files]);

  return (<div className="first-step step-1-b">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        You can choose 4 photos as your raffle cover
      </h3>
      <div className="row">
        {['raffle-img1', 'raffle-img2', 'raffle-img3', 'raffle-img4'].map((item, key) => (
          <RaffleImgFileUploader imageOneRef={imageOneRef} isLoading={isLoading} preview={preview} fillContent={fillContent} imageTwoRef={imageTwoRef} imageThreeRef={imageThreeRef} imageFourRef={imageFourRef} getBase64={getBase64} item={item} row={key} key={key} />
        ))}
      </div>
    </div>
  </div>);
});

export default StepOneB;
