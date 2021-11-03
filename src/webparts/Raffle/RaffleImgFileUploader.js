import { memo } from "react";
import staticText from "../../statics";

const RaffleImgFileUploader = memo(({ isLoading, getBase64, files, item, row, fillContent, preview }) => {
  return (<div className="col-3 col-lg-2">
    <form>
      <div className="mb-3 overflow-hidden">
        <input
          disabled={isLoading[row]}
          className={isLoading[row] ? "upload-image pt-4 disabled" : "upload-image pt-4"}
          type="file"
          id={item}
          onChange={(e) => getBase64(e, fillContent, row)} />
        <label htmlFor={item} />
        <img src={files[row] ? files[row].split(staticText.FILE_TO_SEND_PREFIX).join(staticText.FILE_URL_PREVIEW) : preview}
          className={'image-preview'} alt={'preview one'} />
      </div>
    </form>
  </div>)
});

export default RaffleImgFileUploader;