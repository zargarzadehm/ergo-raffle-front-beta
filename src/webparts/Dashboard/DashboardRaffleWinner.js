import Raffle from '../../components/Raffle';

const DashboardRaffleWinner = ({ yourRaffle, loading }) => {
  return (<section id="all-your-raffles-container" className="mt-5">
    <div className="container">
      <h2 className="dashboard-title text-center mb-4">Raffles You Win</h2>
      <div id="all-your-raffles" className="row g-4">
        {(loading &&
          Array.isArray(yourRaffle) &&
          yourRaffle.length === 0) ?
          <p className="text-center mb-4">No Raffles Found</p>
          : null}
        {(Array.isArray(yourRaffle) ?
          yourRaffle :
          []).map((item, key) => (
            <div className="col-6 col-lg-3" key={key + Math.random() + 6000 + '-elem'}>
              <Raffle raffle={item} />
            </div>
          ))}
      </div>
    </div>
  </section>
  )
}

export default DashboardRaffleWinner;