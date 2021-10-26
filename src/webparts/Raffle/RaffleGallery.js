
import { useState } from 'react';
import defaultImg from '../../assets/img/default.jpg';
import { Lightbox } from "react-modal-image";
const RaffleGallery = ({raffle}) => {
  let [ lightBoxImage, setLightBoxImage ] = useState('');
  let [ open, setOpen ] = useState(false);
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
          {(raffle.picture && raffle.picture.length > 0 ? raffle.picture : [defaultImg]).map((item,key)=>(<span key={Math.random()+'-arrows'}>
          {key === 0 ?
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={key}
            className="active"
            aria-current="true"
            aria-label={"Slide " + key}
          ></button>
          :
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={key}
            aria-label={"Slide " + key}
          ></button>
          }
          </span>
          ))}
        </div>
        <div className={"carousel-inner"}>
          <div className="carousel-item active">
            {(raffle.picture && raffle.picture.length > 0 ? raffle.picture : [defaultImg]).map((item, key)=>(<div 
                onClick={()=>toggleModal(item)} key={key+Math.random()+'-gallery-image-item'} className={raffle.status === 'succeed' ? 'raffle-success' : raffle.status === 'failed' ? 'raffle-unsuccess' : ''}>
            <div className={'raffle-img-container'}>
            <img
                src={item || defaultImg}
                className="d-block w-100"
                alt={raffle.name}
              />
              </div>
              </div>))}
          </div>
        </div>
      </div>)
}

export default RaffleGallery;