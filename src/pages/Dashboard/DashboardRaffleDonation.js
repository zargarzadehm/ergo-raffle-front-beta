
import Raffle from "../../components/Raffle"

const DashboardRaffleDonation = ({ donationRaffle, loading }) => {
  return (<section id="all-your-donations-container" className="mt-header">
    <div className="container">
      <h2 className="dashboard-title text-center mb-4">All your donations</h2>
      <div id="all-your-donations" className="row g-4">
        {
          loading
          &&
          Array.isArray(donationRaffle)
          &&
          donationRaffle.length === 0
          &&
          <p className="text-center mb-4">No Raffles Found</p>
        }
        {
          donationRaffle.map((item, key) => (
            <div className="col-6 col-lg-3" key={key + '4000-elem'}>
              <Raffle raffle={item} />
            </div>
          )
          )
        }
      </div>
    </div>
  </section>)
}

export default DashboardRaffleDonation;