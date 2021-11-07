
import { useState } from 'react';
import defaultImg from '../../assets/img/default.jpg';
import Lightbox from 'lightbox-react';
import RaffleGalleryNavigation from './RaffleGalleryNavigation';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app

const RaffleGallery = ({ raffle }) => {
  const images = raffle.picture && raffle.picture.length > 0 ? raffle.picture : [defaultImg];
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (<>
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {(raffle.picture && raffle.picture.length > 0 ? raffle.picture : [defaultImg]).map((item, key) => (<span key={Math.random() + '-arrows'}>
          <RaffleGalleryNavigation row={key} />
        </span>
        ))}
      </div>
      <div className={"carousel-inner"}>
        {(raffle.picture && raffle.picture.length > 0 ? raffle.picture : [defaultImg]).map((item, key) => (
          <div className={key === 0 ? "carousel-item active" : "carousel-item"} key={key + Math.random() + '-gallery-image-item'}>
            <div
              onClick={() => { setIsOpen(true) }} className={raffle.status === 'succeed' ? 'raffle-success' : raffle.status === 'failed' ? 'raffle-unsuccess' : ''}>
              <div className={'raffle-img-container'}>
                <img
                  src={item || defaultImg}
                  className="d-block w-100"
                  alt={raffle.name}
                />
              </div>
            </div>
          </div>))}
      </div>
    </div>
    {isOpen ?
      <Lightbox
        mainSrc={images[startIndex]}
        nextSrc={images[(startIndex + 1) % images.length]}
        prevSrc={images[(startIndex + images.length - 1) % images.length]}
        onCloseRequest={() => setIsOpen(false)}
        onMovePrevRequest={() => setStartIndex((startIndex + images.length - 1) % images.length)}
        onMoveNextRequest={() => setStartIndex((startIndex + 1) % images.length)}
      />
      : null}
  </>)
}

export default RaffleGallery;