import { useState, useEffect, useContext, useCallback } from 'react';
import Title from '../../components/Title';
import { getAllYourDonations, getAllYourRafflesYouWin, getSingleRaffle } from '../../service/raffle.service';
import staticText from '../../statics';
import DashboardRaffleDonation from './DashboardRaffleDonation';
import DashboardRaffleWinner from './DashboardRaffleWinner';
import DashboardFaq from './DashboardFaq';
import Tabs from '../../components/Tabs';
import DashboardRafflePin from './DashboardRafflePin';
import ThemeContext from '../../context';

const Dashboard = ({ history }) => {
  const context = useContext(ThemeContext);
  const tabContent = staticText.dashboardTabs;
  const faqs = staticText.faq;
  const [activeTab, setActiveTab] = useState(1);
  const [donationRaffle, setDonationRaffle] = useState([]);
  const [yourRaffle, setYourRaffle] = useState([]);
  const [isWinnerRaffleFinished, setIsWinnerRaffleFinished] = useState(false);
  const [isDonationFinished, setIsDonationFinished] = useState(false);

  const getUniquePinnedRaffles = useCallback(() => {
    if (window.localStorage.getItem('pin') !== null) {
      const pins = window.localStorage.getItem('pin').split(',');
      const rafflePinned = [];
      const newPins = [];
      const pinnedContextId = [];
      for (let item of context.pinnedRaffles) {
        pinnedContextId.push(item.id);
      }
      for (let id of pins) {
        if (!pinnedContextId.includes(id)) {
          newPins.push(id);
        }
      }
      for (let a = 0; a < newPins.length; a++) {
        getSingleRaffle(newPins[a]).then(
          ({ data }) => {
            rafflePinned.push(data);
            if (a === newPins.length - 1) {
              const resultRaffles = [...context.pinnedRaffles, ...rafflePinned];
              context.setPinnedRaffles(resultRaffles);
            }
          }
        )
      }
    }
  }, [context]);
  useEffect(() => {
    const myWallAddress = window.atob(window.localStorage.getItem('wallet'));
    getUniquePinnedRaffles();
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
  }, [getUniquePinnedRaffles]);
  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex === 0) {
      history.push('/faq');
    }
  }
  return (<>
    <Title title={'Ergo Raffle - Dashboard'} />
    <main>
      <DashboardRafflePin pinnedRaffles={context.pinnedRaffles} />
      <DashboardRaffleDonation loading={isDonationFinished} donationRaffle={donationRaffle} />
      <DashboardRaffleWinner loading={isWinnerRaffleFinished} yourRaffle={yourRaffle} />
      <div className="dashboard-support-choice d-flex justify-content-around mt-4">
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
