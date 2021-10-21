
import Raffle from "../../components/Raffle"

const DashboardRaffleDonation = ({donationRaffle})=> {
    return (<section id="all-your-donations-container" className="mt-header">
    <div className="container">
      <h2 className="dashboard-title text-center mb-4">All your donations</h2>
      <p className="text-start mb-4">Recent</p>
      <div id="all-your-donations" className="row g-4">
          {(Array.isArray(donationRaffle) ? donationRaffle : []).map((item,key)=>(
          <div className="col-6 col-lg-3" key={key+4000+'elem'}>
            <Raffle img={item} />  
          </div>
          ))}
      </div>
    </div>
  </section>)
}

export default DashboardRaffleDonation;