import { useCallback, useEffect, useState, useContext } from 'react';
import loader from '../assets/img/loader.svg';
import Raffle from '../components/Raffle';
import { getRafflesByState } from '../service/raffle.service';
import Title from '../components/Title';
import staticText from '../statics';
import ThemeContext from '../context';
import CircleTabs from '../components/CircleTabs';
import Pagination from '../webparts/Shared/Pagination';
import Tabs from '../components/Tabs';

function Raffles() {
  const context = useContext(ThemeContext)
  const sortContent = staticText.homeTabs;;
  const tabsContent = staticText.raffleListTabs;
  const [inProgress, setInProgress] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [activeSort, setActiveSort] = useState(0);
  const [raffles, setRaffles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchData(activeTab, newPage);
  }

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage <= 0) {
      newPage = 1;
    }
    setPage(newPage);
    fetchData(activeTab, newPage);
  }

  const changeTab = (tabIndex) => {
    setPage(1);
    setActiveTab(tabIndex);
  }

  const scrollToTop = useCallback(() => {
    context.wrapperRef.current.scrollTo(0, 0);
  }, [context.wrapperRef])
  const fetchTabRaffles = useCallback((p, status, sort) => {
    scrollToTop()
    getRafflesByState(staticText.PAGE_SIZE * (p - 1), staticText.PAGE_SIZE, status, sort).then(
      ({ data }) => {
        setInProgress(false);
        setRaffles(data.items);
        setTotalPages(Math.ceil(data.total / staticText.PAGE_SIZE));
        setTotalItems(data.total);
      }
    )
  }, [scrollToTop]);

  const fetchData = useCallback((tab, p, sort) => {
    setInProgress(true);
    setRaffles([]);
    fetchTabRaffles(p, tab, sort);
  }, [fetchTabRaffles]);

  useEffect(() => {
    fetchData(activeTab, 1, activeSort);
  }, [fetchData, activeTab, activeSort]);

  const changeTabSort = (index) => {
    setActiveSort(index);
  }

  return (<>
    <Title title={'Ergo Raffle - All Raffles'} />
    <main>
      <section id="Raffles-title-box" className="p-lg-5 mb-3 mt-header">
        <div className="container">
          <h2 className="raffles-title text-center mb-4">Raffles in categories</h2>
          <div className="row category-box">
            <div className="col-12 pt-2 category-box-col">
              <div className="text-center">
                <CircleTabs
                  tabs={tabsContent}
                  changeTabContent={(tabIndex) => changeTab(tabIndex)} />
              </div>
              <br />
              <div className="text-center">
                <Tabs
                  tabs={sortContent}
                  setActiveTab={setActiveSort}
                  activeTab={activeSort}
                  changeTabContent={(tabIndex) => changeTabSort(tabIndex)} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="raffle-cards" className="p-lg-5">
        <div className="container">
          <div className="row g-4">
            {inProgress ? <div className={'loading-wrapper'}><img src={loader} alt={'Loading Spinner'} /></div> :
              [...raffles].map((item) => (

                <div className="col-6 col-lg-4" key={item.name + Math.random() + 1000 + '-item'}>
                  <div className="card raffle-card">
                    <Raffle raffle={item} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section id="pagination" className="p-5">
        {!(totalPages < 1 || (totalPages === 1 && page === 1)) ?
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            prevPage={() => prevPage()}
            nextPage={() => nextPage()}
            PAGE_SIZE={staticText.PAGE_SIZE}
            totalItems={totalItems} />
          : null}
      </section>
    </main>
  </>);
}

export default Raffles;