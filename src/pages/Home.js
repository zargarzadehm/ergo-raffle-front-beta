import loader from '../assets/img/loader.svg';
import RaffleWork from '../components/RaffleWork';
import { Link } from 'react-router-dom';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { getSucceedRaffle, getLatestRaffle, getNearDeadlineRaffle, getTopRaffle } from '../service/raffle.service';
import Raffle from '../components/Raffle';
import Title from '../components/Title';
import staticText from '../statics';
import CarouselBar from '../webparts/Home/CarouselBar';
import HeadingTitle from '../webparts/Shared/HeadingTitle';
import Tabs from '../components/Tabs';
import HomeHeader from '../webparts/Home/HomeHeader';

function Home() {
  const [raffles, setRaffles] = useState([]);
  const [successfulRaffles, setSuccessfulRaffles] = useState([]);
  const [inProgress, setInProgress] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const tabsContent = staticText.homeTabs;

  const fetchData = (tabIndex) => {
    if (tabIndex === 1) {
      fetchTopRaffles();
    } else if (tabIndex === 2) {
      fetchNearDeadlineRaffles();
    } else {
      fetchLatestRaffles();
    }
  }
  const fetchLatestRaffles = useCallback(() => {
    getLatestRaffle(0, 6).then(
      ({ data }) => {
        setRaffles(data.items);
        setInProgress(false);
      }
    )
  }, [])
  const fetchNearDeadlineRaffles = () => {
    getNearDeadlineRaffle(0, 6).then(
      ({ data }) => {
        setRaffles(data.items);
        setInProgress(false);
      }
    )
  }
  const fetchTopRaffles = useCallback(() => {
    getTopRaffle(0, 6).then(
      ({ data }) => {
        setRaffles(data.items);
        setInProgress(false);
      }
    )
  }, []);
  const fetchSuccessfulRaffles = useCallback(() => {
    getSucceedRaffle(0, 6).then(
      ({ data }) => {
        setSuccessfulRaffles(data.items);
      }
    )
  }, []);

  useEffect(() => {
    fetchSuccessfulRaffles();
    fetchLatestRaffles();
  }, [fetchSuccessfulRaffles, fetchLatestRaffles]);

  const changeTab = (tabIndex) => {
    fetchData(tabIndex);
    setActiveTab(tabIndex);
    setInProgress(true);
  }
  return (<>
    <Title title={'Ergo Raffle - Home'} />
    <HomeHeader />
    <section>
      <div className="container raffle-links-container mt-5">
        <Tabs tabs={tabsContent}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          changeTabContent={(tabIndex) => changeTab(tabIndex)} />
      </div>
    </section>
    <section id="raffle-cards" className="p-lg-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {
            inProgress ?
              <div className={'loading-wrapper'}>
                <img src={loader} alt={'loading spinner'} /></div>
              :
              raffles.map((item, key) =>
              (
                <div key={key+item.name + '-raffle-card'} className="col-6 col-lg-4">
                  <Raffle raffle={item} />
                </div>
              )
              )
          }
        </div>
        <div className="see-more-raffles text-center mt-5">
          <Link to={"/raffle/list?s=" + (activeTab === 0 ? '-createTime' : activeTab === 1 ? 'activity' : 'deadline')} className="nav-link see-more-link">
            see more &#62;
          </Link>
        </div>
      </div>
    </section>
    <HeadingTitle title={'Discover recent successfull raffles'} />
    <Suspense fallback={''}>
      {
        successfulRaffles && successfulRaffles.length > 0
          ?
          <CarouselBar raffles={successfulRaffles} />
          :
          <div className={'loading-wrapper'}>
            <img src={loader} alt={'loading spinner'} /></div>
      }
    </Suspense>
    <section>
      <div className="container">
        <RaffleWork />
      </div>
    </section>
  </>)
}

export default Home;