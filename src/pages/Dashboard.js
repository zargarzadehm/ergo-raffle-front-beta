import { useState, useEffect } from 'react';
import Title from '../components/Title';
import { getAllYourDonations, getAllYourRafflesYouWin } from '../service/raffle.service';
import staticText from '../statics';
import DashboardRaffleDonation from '../webparts/Dashboard/DashboardRaffleDonation';
import DashboardRaffleWinner from '../webparts/Dashboard/DashboardRaffleWinner';
import DashboardFaq from '../webparts/Dashboard/DashboardFaq';
import Tabs from '../components/Tabs';
import DashboardRafflePin from '../webparts/Dashboard/DashboardRafflePin';

const Dashboard = ({ history }) => {
  const tabContent = staticText.dashboardTabs;
  const faqs = staticText.faq;
  const [activeTab, setActiveTab] = useState(1);
  const [donationRaffle, setDonationRaffle] = useState([]);
  const [yourRaffle, setYourRaffle] = useState([]);
  const [isWinnerRaffleFinished, setIsWinnerRaffleFinished] = useState(false);
  const [isDonationFinished, setIsDonationFinished] = useState(false);
  useEffect(() => {
    const myWallAddress = window.atob(window.localStorage.getItem('wallet'));

    getAllYourDonations(myWallAddress, 0, staticText.PAGE_SIZE).then(
      ({ data }) => {
        setDonationRaffle(data.items);
        setIsDonationFinished(true);
      })
    getAllYourRafflesYouWin(myWallAddress, 0, 30).then(
      ({ data }) => {
        setIsWinnerRaffleFinished(true)
        setYourRaffle(data.items);
      });
  }, []);
  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex === 0) {
      history.push('/support');
    }
  }
  return (<>
    <Title title={'Ergo Raffle - Dashboard'} />
    <main>

      <DashboardRafflePin pinnedRaffles={window.localStorage.getItem('pin') !== null ? window.localStorage.getItem('pin') : '[]'} />
      <DashboardRaffleDonation loading={isDonationFinished} donationRaffle={donationRaffle} />
      <DashboardRaffleWinner loading={isWinnerRaffleFinished} yourRaffle={yourRaffle} />
      <div className="dashboard-support-choice d-flex justify-content-around">
        <Tabs 
        tabs={tabContent} 
        defaultActiveTab={1} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        changeTabContent={(tabIndex) => changeTab(tabIndex)} />
      </div>
      <DashboardFaq faqs={faqs} />
    </main>
  </>);
}

export default Dashboard;