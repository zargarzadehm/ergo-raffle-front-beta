
import { useState } from 'react';
import defaultImg from '../../assets/img/default.jpg';
import { Lightbox } from "react-modal-image";
import RaffleGalleryNavigation from './RaffleGalleryNavigation';
const RaffleGallery = ({ raffle }) => {
  let [lightBoxImage, setLightBoxImage] = useState('');
  let [open, setOpen] = useState(false);
  const toggleModal = (img) => {
    setLightBoxImage(img);
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }
  return (<div
    id="carouselExampleIndicators"
    className="carousel slide"
    data-bs-ride="carousel"
  >  {open && (<Lightbox
    medium={lightBoxImage}
    large={lightBoxImage}
    onClose={closeModal}
  />)}
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
            onClick={() => toggleModal(item)} className={raffle.status === 'succeed' ? 'raffle-success' : raffle.status === 'failed' ? 'raffle-unsuccess' : ''}>
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
  </div>)
}

export default RaffleGallery;