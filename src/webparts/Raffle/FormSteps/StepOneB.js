import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import RaffleImgFileUploader from "../RaffleImgFileUploader";

const StepOneB = memo(({formFeedback, defaultValue, preview})=>{
    const imageOneRef = useRef();
    const imageTwoRef = useRef();
    const imageThreeRef = useRef();
    const imageFourRef = useRef();

    const [files, setFiles] = useState(defaultValue);
    
    const fillContent = (result, index) => {
      const filesTemp = [...files];
      filesTemp[index] = result;
      setFiles(filesTemp);
      if(index === 0) {
        imageOneRef.current.src = result;
      } else if(index === 1) {
        imageTwoRef.current.src = result
      } else if(index === 2) {
        imageThreeRef.current.src = result
      } else {
        imageFourRef.current.src = result
      }
      formFeedback([...filesTemp]);
    }
    const notify = (msg) => toast(msg);
    const isFileImage = (file) => {
      return file && file['type'].split('/')[0] === 'image';
    }
    const getBase64 = (e, cb, index) => {
      const file = e.target.files[0];
      if(isFileImage(file)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result, index)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
      } else {
        notify('File is not image');
      }
    }

    useEffect(()=> {
      if(typeof files[0] === 'string') {
        imageOneRef.current.src = files[0];
      }
      if(typeof files[1] === 'string') {
        imageTwoRef.current.src = files[1];
      }
      if(typeof files[2] === 'string') {
        imageThreeRef.current.src = files[2];
      }
      if(typeof files[3] === 'string') {
        imageFourRef.current.src = files[3];
      };
    },[files]);

    return (<div className="first-step step-1-b">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        You can choose 4 photos as your raffle cover
      </h3>
      <div className="row">
        {['raffle-img1','raffle-img2', 'raffle-img3', 'raffle-img4'].map((item,key)=>(
          <RaffleImgFileUploader imageOneRef={imageOneRef} preview={preview} fillContent={fillContent} imageTwoRef={imageTwoRef} imageThreeRef={imageThreeRef} imageFourRef={imageFourRef} getBase64={getBase64} item={item} row={key} key={key} />
        ))}
      </div>
    </div>
  </div>);
});

export default StepOneB;
