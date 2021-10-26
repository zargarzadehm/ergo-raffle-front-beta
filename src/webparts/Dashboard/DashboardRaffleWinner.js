import Raffle from '../../components/Raffle';
import { Link } from 'react-router-dom';

const DashboardRaffleWinner = ({yourRaffle})=>{
    return (    <section id="all-your-raffles-container" className="mt-5">
    <div className="container">
      <h2 className="dashboard-title text-center mb-4">Raffles You Win</h2>
      <p className="text-start mb-4">Recent</p>
      <div id="all-your-raffles" className="row g-4">
          
      {(Array.isArray(yourRaffle) ? yourRaffle : []).map((item,key)=>(
        <div className="col-6 col-lg-3" key={key+Math.random()+6000+'-elem'}>
          <Raffle raffle={item} />
        </div>
      ))}
      </div>
      <div className="see-more-raffles text-center mt-5">
        <Link to={"/raffle/list"} className="nav-link see-more-link">
          show more &#62;
        </Link>
      </div>
    </div>
  </section>
)
}

export default DashboardRaffleWinner;