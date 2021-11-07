import { useState } from 'react';
import SupportForm from '../webparts/Support/SupportForm';
import Tabs from '../components/Tabs';
import Title from '../components/Title';
import { getActiveRaffle, getAllRaffle } from '../service/raffle.service';
import loader from '../assets/img/loader.svg';
import Raffle from '../components/Raffle';
import staticText from '../statics';
import DashboardFaq from '../webparts/Dashboard/DashboardFaq';

const Support = () => {
  const tabsContent = staticText.supportTabs;
  const faqs = staticText.faq;
  const [activeTab, setActiveTab] = useState(2);
  const [raffles, setRaffles] = useState([]);
  const [inProgress, setInProgress] = useState(true);

  const changeTab = (tabIndex) => {
    if (tabIndex !== 2) {
      setInProgress(true);
    }

    setActiveTab(tabIndex);
    if (tabIndex === 0) {
      getActiveRaffle(0, staticText.PAGE_SIZE).then(
        ({ data }) => {
          setRaffles(data.items);
          setInProgress(false);
        }
      )
    } else if (tabIndex === 1) {
      getAllRaffle(0, staticText.PAGE_SIZE).then(
        ({ data }) => {
          setRaffles(data.items);
          setInProgress(false);
        }
      )
    }
  }
  return (<>
    <Title title={'Ergo Raffle - Support'} />
    <main>
      <section id="dashboard-top-options" className="p-lg-5 mt-header">
        <div className="container text-center">
          <div className="support-options-container d-flex justify-content-between">
            <Tabs
              tabs={tabsContent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              defaultActiveTab={2}
              changeTabContent={(tabIndex) => changeTab(tabIndex)} />
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row g-4">
          {activeTab !== 2 ? inProgress ? <div className={'loading-wrapper'}><img src={loader} alt={'Loading Spinner'} /></div> :
            (Array.isArray(raffles) ? raffles : []).map((item) => (

              <div className="col-6 col-lg-4" key={item.name + 1000 + Math.random() + '-item'}>
                <div className="card raffle-card">
                  <Raffle raffle={item} />
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
      {activeTab === 2 ? <>
        <DashboardFaq faqs={faqs} />

        {/* <!-- Support ticket --> */}
        <section id="support-ticket" className="my-5">
          <div className="container">
            <SupportForm />
          </div>
        </section>
      </> : null}
    </main>
  </>);
}

export default Support;