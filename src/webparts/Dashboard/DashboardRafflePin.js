
import Raffle from "../../components/Raffle"

const DashboardRafflePin = ({ pinnedRaffles }) => {
  return (<section id="all-your-donations-container" className="mt-header">
    <div className="container">
      <h2 className="dashboard-title text-center mb-4">Pinned Raffles</h2>
      <div id="all-your-donations" className="row g-4">
        {((pinnedRaffles.length === 0 ||
          typeof pinnedRaffles === 'undefined') ||
          pinnedRaffles === '[]') ?
          <p className="text-center mb-4">No Raffles Found</p>
          : null}
        {(Array.isArray(JSON.parse(pinnedRaffles)) ?
          JSON.parse(pinnedRaffles) :
          []).map((item, key) => (
            <div className="col-6 col-lg-3" key={key + Math.random() + 12000 + 'elem'}>
              <Raffle raffle={item} />
            </div>))}
      </div>
    </div>
  </section>)
}

export default DashboardRafflePin;