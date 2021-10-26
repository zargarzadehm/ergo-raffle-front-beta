import '../assets/css/dashboard.css';
import '../assets/css/faq.css';
import { useState,  useEffect } from 'react';
import Title from '../components/Title';
import { getAllYourDonations, getAllYourRafflesYouWin } from '../service/raffle.service';
import staticText from '../statics';
import DashboardRaffleDonation from '../webparts/Dashboard/DashboardRaffleDonation';
import DashboardRaffleWinner from '../webparts/Dashboard/DashboardRaffleWinner';
import DashboardFaq from '../webparts/Dashboard/DashboardFaq';
import Tabs from '../components/Tabs';
import DashboardRafflePin from '../webparts/Dashboard/DashboardRafflePin';

const Dashboard = ({history}) => {
  const [ activeTab, setActiveTab ] = useState(1);
  const [ tabContent ] = useState(staticText.dashboardTabs);
  const [faqs] = useState(staticText.faq)
  const [ donationRaffle, setDonationRaffle ] = useState([]);
  const [ yourRaffle, setYourRaffle ] = useState([]);
  useEffect(()=> {
    const myWallAddress = window.atob(window.localStorage.getItem('wallet'));

    getAllYourDonations(myWallAddress, 0, staticText.PAGE_SIZE).then(
      ({data})=> {
        setDonationRaffle(data.items);
      })
      getAllYourRafflesYouWin(myWallAddress, 0 , 30).then(
        ({data})=> {
          setYourRaffle(data.items);
      });
  },[]);
  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
    if(tabIndex === 0) {
      history.push('/support');
    }
  }
    return (<>
    <Title title={'Ergo Raffle - Dashboard'} />
  <main>
    
      <DashboardRafflePin pinnedRaffles={window.localStorage.getItem('pin') !== null ? window.localStorage.getItem('pin') : '[]'} />
      <DashboardRaffleDonation donationRaffle={donationRaffle} />
      <DashboardRaffleWinner yourRaffle={yourRaffle} />
      <div className="dashboard-support-choice d-flex justify-content-around">
          <Tabs tabs={tabContent} defaultActiveTab={1} activeTab={activeTab} setActiveTab={setActiveTab} changeTabContent={(tabIndex)=> changeTab(tabIndex)} />
      </div>
      <DashboardFaq faqs={faqs} />
  </main>
  </>);
}

export default Dashboard;