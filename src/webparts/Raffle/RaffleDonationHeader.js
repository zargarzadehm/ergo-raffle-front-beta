import DestinationInfo from "../../pages/raffle/DestinationInfo";
import DetailInfo from "../../pages/raffle/DetailInfo";
import Gallery from "../../pages/raffle/Gallery";

const RaffleDonationHeader = ({raffle}) => {
    return (<>
        <section id="raffle-intorduction" className="p-2 p-lg-5 mb-4 mt-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <Gallery raffle={raffle}/>
                    </div>
                    <div className="col-lg-7 pt-4 pt-lg-0 raffle-intorduction-right">
                        <DetailInfo raffle={raffle}/>
                    </div>
                </div>
            </div>
        </section>
        <section id="raffle-details">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <DestinationInfo raffle={raffle}/>
                </div>
            </div>
        </section>
    </>)
}

export default RaffleDonationHeader;
