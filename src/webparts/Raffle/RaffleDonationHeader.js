import RaffleDestinationInfo from "./RaffleDestinationInfo";
import RaffleDetailInfo from "./RaffleDetailInfo";
import RaffleGallery from "./RaffleGallery";

const RaffleDonationHeader = ({raffle}) => {
    return (<>
    <section id="raffle-intorduction" className="p-2 p-lg-5 mb-4 mt-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
            <RaffleGallery raffle={raffle}/>
        </div>
        <div className="col-lg-7 pt-4 pt-lg-0 raffle-intorduction-right">
          <RaffleDetailInfo raffle={raffle} />
        </div>
      </div>
    </div>
  </section>
  <section id="raffle-details">
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <RaffleDestinationInfo raffle={raffle} />
      </div>
    </div>
  </section>
  </>)
}

export default RaffleDonationHeader;