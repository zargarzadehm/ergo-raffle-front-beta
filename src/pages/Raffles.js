import React from 'react';
import loader from '../assets/img/loader.svg';
import Raffle from '../components/Raffle';
import { getRaffle, getRafflesByState } from '../service/raffle.service';
import Title from '../components/Title';
import staticText from '../statics';
import ThemeContext from '../context';
import CircleTabs from '../components/CircleTabs';
import Pagination from '../webparts/Shared/Pagination';
import Tabs from '../components/Tabs';
import { RAFFLE_SORTING_TABS, RAFFLE_STATUS_TABS, PAGE_SIZE } from '../statics';

class Raffles extends React.Component {
    state = {
        status: 'active',
        total: 0,
        sorting: 0,
        page: 0,
        progress: false,
        raffle: {
            status: '',
            sorting: -1,
            page: -1,
        },
        raffles: []
    }

    check_changed = () => {
        return this.state.raffle.status !== this.state.status ||
            this.state.raffle.sorting !== this.state.sorting ||
            this.state.raffle.page !== this.state.page
    }

    fetch_data = () => {
        if (!this.state.progress && this.check_changed()) {
            this.setState({progress: true});
            const status = this.state.status
            const sortingIndex = this.state.sorting;
            const page = this.state.page;
            let sorting = status !== 'active' ? "" : RAFFLE_SORTING_TABS[sortingIndex].sorting
            getRaffle(page * PAGE_SIZE, PAGE_SIZE, sorting, status).then(response => {
                this.setState({
                    total: response.data.total,
                    raffles: response.data.items,
                    progress: false,
                    raffle: {status: status, sorting: sortingIndex, page: page}
                })
            })
        }
    }

    prevPage = () => {
        if (this.state.page > 0) {
            this.setState(state => ({...state, page: state.page - 1}))
        }
    }
    nextPage = () => {
        if (this.state.page < Math.ceil(this.state.total / PAGE_SIZE) - 1) {
            this.setState(state => ({...state, page: state.page + 1}))
        }
    }

    componentDidMount = () => {
        const params = new URLSearchParams(window.location.search) // id=123
        const sortingIndex = RAFFLE_SORTING_TABS.map(item =>item.sorting).indexOf(params.get('sorting'));
        if (sortingIndex > 0 && sortingIndex < RAFFLE_SORTING_TABS.length) {
            this.setState({sorting: sortingIndex});
        }
        this.fetch_data()
    }

    componentDidUpdate = () => {
        this.fetch_data()
    }

    render = () => {
        const tabsContent = RAFFLE_SORTING_TABS.map(item => item.title);
        return (
            <React.Fragment>
                <Title title={'Ergo Raffle - All Raffles'}/>
                <main>
                    <section id="Raffles-title-box" className="p-lg-5 mb-3 mt-header">
                        <div className="container">
                            <div className="row category-box">
                                <div className="col-12 pt-2 category-box-col">
                                    <div className="text-center">
                                        <CircleTabs
                                            tabs={RAFFLE_STATUS_TABS}
                                            activeTab={this.state.status}
                                            changeTabContent={(tabIndex) => this.setState({
                                                status: tabIndex,
                                                sorting: 0,
                                                page: 0
                                            })}/>
                                    </div>
                                    <br/>
                                    {this.state.status === 'active' ? (
                                        <div className="text-center">
                                            <Tabs tabs={tabsContent}
                                                  setActiveTab={tabIndex => this.setState({sorting: tabIndex, page: 0})}
                                                  activeTab={this.state.sorting}/>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="raffle-cards">
                        <div className="container">
                            <div className="row g-4">
                                {this.state.progress ? (
                                    <div className={'loading-wrapper'}>
                                        <img src={loader} alt={'Loading Spinner'}/>
                                    </div>
                                ) : this.state.raffles.map((item, key) => (
                                        <div className="col-6 col-lg-4" key={item.name + `1000-item${key}`}>
                                            <div className="card raffle-card">
                                                <Raffle raffle={item}/>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                    <section id="pagination" className="p-5">
                        {this.state.total < PAGE_SIZE ? null : (
                            <Pagination
                                currentPage={this.state.page + 1}
                                totalPages={Math.ceil(this.state.total / PAGE_SIZE)}
                                prevPage={() => this.prevPage()}
                                nextPage={() => this.nextPage()}/>
                        )}
                    </section>
                </main>
            </React.Fragment>
        );
    }
}

/*
const Raffles2 = () => {
    const params = new URLSearchParams(window.location.search) // id=123
    const sorting = params.get('s');
    const context = useContext(ThemeContext)

    const [inProgress, setInProgress] = useState(true);
    const [activeTab, setActiveTab] = useState(sorting ? 'active' : 'all');
    const [activeSort, setActiveSort] = useState(sorting ? sorting === 'activity' ? 1 : sorting === 'deadline' ? 2 : 0 : 0);
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
        setActiveSort(0);
        setActiveTab(tabIndex);
    }

    const scrollToTop = useCallback(() => {
        context.wrapperRef.current.scrollTo(0, 0);
    }, [context.wrapperRef])
    const fetchTabRaffles = useCallback((p, status, sort) => {
        scrollToTop()
        getRafflesByState(staticText.PAGE_SIZE * (p - 1), staticText.PAGE_SIZE, status, sort).then(
            ({data}) => {
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
        <Title title={'Ergo Raffle - All Raffles'}/>
        <main>
            <section id="Raffles-title-box" className="p-lg-5 mb-3 mt-header">
                <div className="container">
                    <div className="row category-box">
                        <div className="col-12 pt-2 category-box-col">
                            <div className="text-center">
                                <CircleTabs
                                    tabs={tabsContent}
                                    defaultActiveTab={activeTab}
                                    changeTabContent={(tabIndex) => changeTab(tabIndex)}/>
                            </div>
                            <br/>
                            <div className="text-center">
                                <Tabs
                                    tabs={sortContent}
                                    setActiveTab={setActiveSort}
                                    activeTab={activeSort}
                                    disableTab={activeTab === 'succeed' ? [3] : activeTab === 'failed' ? [3] : []}
                                    changeTabContent={(tabIndex) => changeTabSort(tabIndex)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="raffle-cards">
                <div className="container">
                    <div className="row g-4">
                        {
                            inProgress ?
                                <div className={'loading-wrapper'}>
                                    <img src={loader} alt={'Loading Spinner'}/>
                                </div>
                                :
                                raffles.map((item, key) => (
                                        <div className="col-6 col-lg-4" key={item.name + `1000-item${key}`}>
                                            <div className="card raffle-card">
                                                <Raffle raffle={item}/>
                                            </div>
                                        </div>
                                    )
                                )
                        }
                    </div>
                </div>
            </section>
            <section id="pagination" className="p-5">
                {
                    !(totalPages < 1 || (totalPages === 1 && page === 1))
                        ?
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            prevPage={() => prevPage()}
                            nextPage={() => nextPage()}
                            PAGE_SIZE={staticText.PAGE_SIZE}
                            totalItems={totalItems}/>
                        :
                        null
                }
            </section>
        </main>
    </>);
}
*/
export default Raffles;
