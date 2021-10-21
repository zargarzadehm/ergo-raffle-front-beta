
import { memo } from 'react';
import defaultImg from '../../assets/img/default.jpg';

const RaffleGallery = memo(({raffle}) => {
    return (<div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
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
        <div className="carousel-inner">
          <div className="carousel-item active">
            {(raffle.picture && raffle.picture.length > 0 ? raffle.picture : [defaultImg]).map((item, key)=>(<img
                key={key+Math.random()+'-gallery-image-item'}
                src={item || defaultImg}
                className="d-block w-100"
                alt={raffle.name}
              />))}
          </div>
        </div>
      </div>)
})

export default RaffleGallery;