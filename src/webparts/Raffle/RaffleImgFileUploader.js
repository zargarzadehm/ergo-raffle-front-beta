import { memo } from "react";

const RaffleImgFileUploader = memo(({ isLoading, imageTwoRef, imageThreeRef, imageFourRef, getBase64, preview, imageOneRef, item, row, fillContent }) => {
  return (<div className="col-3 col-lg-2">
    <form>
      <div className="mb-3 overflow-hidden">
        <input
          disabled={isLoading[row]}
          className={isLoading[row] ? "upload-image pt-4 disabled" : "upload-image pt-4"}
          type="file"
          id={item}
          onChange={(e) => getBase64(e, fillContent, row)}
        />
        <img ref={row === 0 ? imageOneRef : row === 1 ? imageTwoRef : row === 2 ? imageThreeRef : imageFourRef} src={preview} className={'image-preview'} alt={'preview one'} />
      </div>
    </form>
  </div>)
});

export default RaffleImgFileUploader;