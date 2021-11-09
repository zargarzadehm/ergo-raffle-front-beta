import { memo, useState } from "react";
import { toast } from "react-toastify";
import staticText from "../../../statics";
import RaffleImgFileUploader from "../RaffleImgFileUploader";

const CreateRaffleFiles = memo(({ formFeedback, defaultValue, setIsActive, preview }) => {
  const [isLoading, setIsLoading] = useState([false, false, false, false]);
  const [files, setFiles] = useState(defaultValue);
  const fillContent = async (result, index) => {
    const filesTemp = [...files];
    filesTemp[index] = staticText.FILE_TO_SEND_PREFIX + result;
    setFiles(filesTemp);
    formFeedback('files', [...filesTemp]);
  }
  const notify = (msg) => toast(msg);
  const isFileImage = (file) => {
    return file && file['type'].split('/')[0] === 'image';
  }
  const getBase64 = async (e, cb, index) => {
    const file = e.target.files[0];
    const tempLoad = [false, false, false, false];
    setIsActive(false);
    tempLoad[index] = true;
    setIsLoading([...tempLoad]);
    if (isFileImage(file)) {
      if (file.size < staticText.FILE_SIZE_LIMITATION) {
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
            setIsLoading([false, false, false, false]);
            cb(`${res.value.cid}`, index);
          })
      } else {
        setTimeout(() => {
          setIsLoading([false, false, false, false]);
        }, 1000);

        setIsActive(true);
        notify('File is Too Large');
      }
    } else {
      setIsActive(true);
      notify('File is not image');
    }
  }

  return (<div className="first-step step-1-b">
    <div className="step-content text-center text-lg-start">
      <h3 className="step-title mb-4">
        You can choose 4 photos as your raffle cover
      </h3>
      <div className="row">
        {
          ['raffle-img1', 'raffle-img2', 'raffle-img3', 'raffle-img4'].map((item, key) => (
            <RaffleImgFileUploader
              isLoading={isLoading}
              files={files}
              preview={preview}
              fillContent={fillContent}
              getBase64={getBase64}
              item={item}
              row={key}
              key={key} />
          )
          )
        }
      </div>
    </div>
  </div>);
});

export default CreateRaffleFiles;
