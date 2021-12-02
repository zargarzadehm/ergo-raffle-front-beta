import React from 'react';
import Title from '../../components/Title';
import { getSingleRaffle } from '../../service/raffle.service';
import Header from './Header';
import StatusInfo from './StatusInfo';
import IconBox from "./IconBox";
import Transactions from "./Transactions";
import Donation from "./donate/Donation";
import DonationHeader from "./donate/DonationHeader";
import Tickets from "./Tickets";
import ThemeContext from "../../context";

class Raffle extends React.Component {
    state = {
        raffle: {}
    }

    componentDidMount() {
        getSingleRaffle(this.props.match.params.id).then(
            ({data}) => {
                this.setState({raffle: data});
            }
        )
    }

    render = () => {
        return (
            <React.Fragment>
                {/*{raffle ?*/}
                {/*    <Title title={'Ergo Raffle - ' + raffle.name}/>*/}
                {/*    :*/}
                {/*    null*/}
                {/*}*/}
                <main>
                    <Header raffle={this.state.raffle}/>
                    <StatusInfo raffle={this.state.raffle}/>
                    <section id="raffle-icons" className="mt-5">
                        <div className="container">
                            <IconBox raffle={this.state.raffle}/>
                        </div>
                    </section>
                    {this.state.raffle && this.state.raffle.id ? (
                        <React.Fragment>
                            {this.state.raffle.status === 'active' ? (
                                <React.Fragment>
                                    <section id="ask-for-donation" className="mt-5">
                                        <div className="container">
                                            <DonationHeader raffle={this.state.raffle}/>
                                        </div>
                                    </section>
                                    <Donation ticketPrice={this.state.raffle.ticket.price} id={this.state.raffle.id}/>
                                    {this.context.hasWallet ? <Tickets id={this.state.raffle.id}/> : null}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Transactions status={this.state.raffle.status} id={this.state.raffle.id}/>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ) : null}
                    {/*{*/}
                    {/*    Array.isArray(ticketRaffleTransactions) && ticketRaffleTransactions.length > 0*/}
                    {/*        ?*/}
                    {/*        <FinishedRaffleTransactions*/}
                    {/*            titleRef={titleRef}*/}
                    {/*            page={page}*/}
                    {/*            winnerRaffleTransactions={winnerRaffleTransactions}*/}
                    {/*            charityRaffleTransactions={charityRaffleTransactions}*/}
                    {/*            ticketRaffleTransactions={ticketRaffleTransactions}/>*/}
                    {/*        :*/}
                    {/*        null*/}
                    {/*}*/}
                    {/*<section id="pagination" className="p-5">*/}
                    {/*    {*/}
                    {/*        !(totalTransactionPagess < 1 || (page === 1 && totalTransactionPagess === 1))*/}
                    {/*            ?*/}
                    {/*            <Pagination*/}
                    {/*                currentPage={page}*/}
                    {/*                totalPages={totalTransactionPagess}*/}
                    {/*                totalItems={total}*/}
                    {/*                PAGE_SIZE={staticText.PAGE_SIZE}*/}
                    {/*                prevPage={prevPage}*/}
                    {/*                nextPage={nextPage}/>*/}
                    {/*            :*/}
                    {/*            null*/}
                    {/*    }*/}
                    {/*</section>*/}
                    {/*<ShareModalPortal/>*/}
                </main>
            </React.Fragment>
        )
    }
}
Raffle.contextType = ThemeContext;

/*
const RaffleSuccessFul = ({history}) => {
    const titleRef = useRef();
    let {id} = useParams();
    const [page, setPage] = useState(1);
    const [raffle, setRaffle] = useState({name: '', description: ''})
    const [winnerRaffleTransactions, setWinnerRaffleTransactions] = useState([]);
    const [ticketRaffleTransactions, setTicketRaffleTransactions] = useState([]);
    const [charityRaffleTransactions, setCharityRaffleTransactions] = useState([]);
    const [totalTransactionPagess, setTotalTransactionPages] = useState(0);
    const [total, setTotal] = useState(0);
    const getTransactions = useCallback(() => {
        getRaffleTransactions(id, 0, staticText.PAGE_SIZE).then(
            ({data}) => {
                const items = data.items;
                setWinnerRaffleTransactions([...items].filter((a) => a.type === staticText.winnerStateType));
                setCharityRaffleTransactions([...items].filter((a) => a.type === staticText.charityStateType));
                setTicketRaffleTransactions([...items].filter((a) => a.type !== staticText.winnerStateType && a.type !== staticText.charityStateType));
                setTotalTransactionPages(isNaN(Math.ceil(data.total / staticText.PAGE_SIZE)) ? 1 : Math.ceil(data.total / staticText.PAGE_SIZE));
                setTotal(typeof data.total === 'undefined' ? 0 : data.total);
            }
        )
    }, [id]);
    useEffect(() => {
        getSingleRaffle(id).then(
            ({data}) => {
                setRaffle(data);
                if (data.status === 'active') {
                    history.push('/raffle/donate/' + id)
                }
            }
        )
        getTransactions();
    }, [id, history, getTransactions]);
    const nextPage = () => {
        const newPage = page + 1;
        setPage(newPage);
        titleRef.current.scrollIntoView();
        getRaffleTransactions(id, (newPage - 1) * staticText.PAGE_SIZE, staticText.PAGE_SIZE).then(
            ({data}) => {
                const items = data.items;
                setTicketRaffleTransactions([...items].filter((a) => a.type !== staticText.winnerStateType && a.type !== staticText.charityStateType));
            }
        )
    }
    const prevPage = () => {
        const newPage = page - 1;
        titleRef.current.scrollIntoView();
        setPage(newPage);
        getRaffleTransactions(id, (newPage - 1) * staticText.PAGE_SIZE, staticText.PAGE_SIZE).then(
            ({data}) => {
                const items = data.items;
                setTicketRaffleTransactions([...items].filter((a) => a.type !== staticText.winnerStateType && a.type !== staticText.charityStateType));
            }
        )
    }
    const ShareModalPortal = () => {
        return document.getElementById('share-modal') ? createPortal(
            <ShareModal/>, document.getElementById('share-modal')) : null;
    }
    return (
        <>
            {raffle ?
                <Title title={'Ergo Raffle - ' + raffle.name}/>
                :
                null
            }
            <main>
                <Header raffle={raffle}/>
                <StatusInfo raffle={raffle}/>
                {
                    Array.isArray(ticketRaffleTransactions) && ticketRaffleTransactions.length > 0
                        ?
                        <FinishedRaffleTransactions
                            titleRef={titleRef}
                            page={page}
                            winnerRaffleTransactions={winnerRaffleTransactions}
                            charityRaffleTransactions={charityRaffleTransactions}
                            ticketRaffleTransactions={ticketRaffleTransactions}/>
                        :
                        null
                }
                <section id="pagination" className="p-5">
                    {
                        !(totalTransactionPagess < 1 || (page === 1 && totalTransactionPagess === 1))
                            ?
                            <Pagination
                                currentPage={page}
                                totalPages={totalTransactionPagess}
                                totalItems={total}
                                PAGE_SIZE={staticText.PAGE_SIZE}
                                prevPage={prevPage}
                                nextPage={nextPage}/>
                            :
                            null
                    }
                </section>
                <ShareModalPortal/>
            </main>
        </>
    )
};
*/
export default Raffle;
