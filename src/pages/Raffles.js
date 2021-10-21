import { lazy, memo, useCallback, useEffect, useState } from 'react';
import loader from '../assets/img/loader.svg';
import Raffle from '../components/Raffle';
import { getActiveRaffle, getAllRaffle, getFailedRaffle, getSucceedRaffle } from '../service/raffle.service';
import '../assets/css/raffles.css';
import Title from '../components/Title';
import staticText from '../statics';
import ThemeContext from '../context';

const CircleTabs = lazy(()=> import('../components/CircleTabs'));
const Pagination = lazy(()=> import('../webparts/Shared/Pagination'));

const Raffles = memo(() => {
    let [tabsContent] = useState(staticText.raffleListTabs);
    let [ inProgress, setInProgress ] = useState(true);
    let [ activeTab, setActiveTab ] = useState(0);
    const [raffles, setRaffles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ totalItems, setTotalItems ] = useState(1);

    const fetchLatestRaffles = useCallback((p) => {
      getAllRaffle(staticText.PAGE_SIZE*(p-1),staticText.PAGE_SIZE*p).then(
        ({data})=> {
          setInProgress(false);
          setRaffles(data.items);
          setTotalPages(Math.ceil(data.total/staticText.PAGE_SIZE));
          setTotalItems(data.total);
        }
      )
    },[])
    const fetchSucceedRaffles = useCallback((p) => {
      getSucceedRaffle(staticText.PAGE_SIZE*(p-1),staticText.PAGE_SIZE*p).then(
        ({data})=> {
          setInProgress(false);
          setRaffles(data.items);
          setTotalPages(Math.ceil(data.total/staticText.PAGE_SIZE));
          setTotalItems(data.total);
        }
      )
    },[])
    const fetchFailedRaffles = useCallback((p) => {
      getFailedRaffle(staticText.PAGE_SIZE*(p-1),staticText.PAGE_SIZE*p).then(
        ({data})=> {
          setInProgress(false);
          setRaffles(data.items);
          setTotalPages(Math.ceil(data.total/staticText.PAGE_SIZE));
          setTotalItems(data.total);
        }
      )
    },[])
    const fetchActiveRaffles = useCallback((p) => {
      getActiveRaffle(staticText.PAGE_SIZE*(p-1),staticText.PAGE_SIZE*p).then(
        ({data})=> {
          setInProgress(false);
          setRaffles(data.items);
          setTotalPages(Math.ceil(data.total/staticText.PAGE_SIZE));
          setTotalItems(data.total);
        }
      )
    },[])
    const fetchData = useCallback((tab, p) => {
      setInProgress(true);
      setRaffles([]);
      if(tab === 0) {
        fetchLatestRaffles(p);
      } else if(tab === 2) {
        fetchSucceedRaffles(p)
      } else if(tab === 3) {
        fetchFailedRaffles(p);
      } else if(tab === 1) {
        fetchActiveRaffles(p);
      }
    }, [fetchLatestRaffles, fetchSucceedRaffles, fetchFailedRaffles, fetchActiveRaffles])
    const nextPage = (ref) => {
      
      ref.current.scrollTo(0,0);
      const newPage = page + 1;
      setPage(newPage);
      fetchData(activeTab, newPage);
    }
    const prevPage = (ref) => {
      ref.current.scrollTo(0,0);
      let newPage = page - 1;
      if(newPage <= 0) {
        newPage = 1;
      }
      setPage(newPage);
      fetchData(activeTab, newPage);
    }
    useEffect(()=>{
      fetchData(0,1)
    },[fetchData]);
    
    const changeTab = (tabIndex) => {
      setPage(1);
      setActiveTab(tabIndex);
      fetchData(tabIndex, 1);
    }

    return (<>
    <Title title={'Ergo Raffle - All Raffles'} />
    <ThemeContext.Consumer>
      {({wrapperRef})=>(
    <main>
      <section id="Raffles-title-box" className="p-lg-5 mb-3 mt-header">
        <div className="container">
          <h2 className="raffles-title text-center mb-4">Raffles in categories</h2>
          <div className="row category-box">
            <div className="col-12 pt-2 category-box-col">
              <div className="text-center">
                <CircleTabs tabs={tabsContent} changeTabContent={(tabIndex)=>changeTab(tabIndex)} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="raffle-cards" className="p-lg-5">
        <div className="container">
          <div className="row g-4">
            {inProgress ?  <div className={'loading-wrapper'}><img src={loader} alt={'Loading Spinner'} /></div> :
              [...raffles].map((item)=>(
                
                  <div className="col-6 col-lg-4" key={item.name+Math.random()+1000+'-item'}>
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
        <Pagination currentPage={page} totalPages={totalPages} prevPage={()=>prevPage(wrapperRef)} nextPage={()=>nextPage(wrapperRef)} PAGE_SIZE={staticText.PAGE_SIZE} totalItems={totalItems} />
        : null }
      </section>
    </main>
      )}
    </ThemeContext.Consumer>
  </>);
})

export default Raffles;