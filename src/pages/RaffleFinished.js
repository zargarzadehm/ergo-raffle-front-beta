
import '../assets/css/donate.css';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/Title';
import { getRaffleTransactions, getSingleRaffle } from '../service/raffle.service';
import RaffleDetailInfo from '../webparts/Raffle/RaffleDetailInfo';
import RaffleDestinationInfo from '../webparts/Raffle/RaffleDestinationInfo';
import RaffleGallery from '../webparts/Raffle/RaffleGallery';
import TransactionRow from '../webparts/Raffle/TransactionRow';
import WinnerTransactionRow from '../webparts/Raffle/WinnerTransactionRow';
import Pagination from '../webparts/Shared/Pagination';
import staticText from '../statics';

const RaffleSuccessFul = ({history}) => {
    const titleRef = useRef();
    let { id } = useParams();
    const [page, setPage] = useState(1);
    const [ raffle, setRaffle ] = useState({name:'', description: ''})
    const [winnerRaffleTransactions, setWinnerRaffleTransactions] = useState([]);
    const [ ticketRaffleTransactions, setTicketRaffleTransactions ] = useState([]);
    const [ totalTransactionPagess, setTotalTransactionPages ] = useState(0);
    const [ total, setTotal ] = useState(0);

    const getTransactions = useCallback(()=>{
      getRaffleTransactions(id,0, staticText.PAGE_SIZE).then(
        ({data})=> {
          
          const items = data.items;
          setWinnerRaffleTransactions([...items].filter((a)=> a.type === 'Winner'));
          setTicketRaffleTransactions([...items].filter((a)=> a.type === 'Ticket'));
          setTotalTransactionPages(isNaN(Math.ceil(data.total/staticText.PAGE_SIZE)) ? 1 : Math.ceil(data.total/staticText.PAGE_SIZE));
          setTotal(typeof data.total === 'undefined' ? 0 : data.total);
        }
      )
    },[id]);
    useEffect(()=> {
      getSingleRaffle(id).then(
        ({data})=> {
          setRaffle(data);
          if(data.status === 'active') {
            history.push('/raffle/donate/'+id)
          }
        }
      )
      getTransactions();
    }, [id, history, getTransactions]);
    const nextPage = () => {
      const newPage = page + 1;
      setPage(newPage);
      titleRef.current.scrollIntoView();
      getRaffleTransactions(id,(newPage-1)*staticText.PAGE_SIZE,staticText.PAGE_SIZE).then(
        ({data})=> {
          const items = data.items;
          setWinnerRaffleTransactions([...items].filter((a)=> a.type === 'Winner'));
          setTicketRaffleTransactions([...items].filter((a)=> a.type === 'Ticket'));
        }
      )
    }
    const prevPage = () => {
      const newPage = page-1;
      setPage(newPage);
      titleRef.current.scrollIntoView();
      getRaffleTransactions(id,(newPage-1)*staticText.PAGE_SIZE,staticText.PAGE_SIZE).then(
        ({data})=> {
          const items = data.items;
          setWinnerRaffleTransactions([...items].filter((a)=> a.type === 'Winner'));
          setTicketRaffleTransactions([...items].filter((a)=> a.type === 'Ticket'));
        }
      )
    }
    return (<>
    {raffle ? <Title title={'Ergo Raffle -' + raffle.name} /> : null}
  <main>
    <section id="raffle-intorduction" className="p-2 p-lg-5 mb-4 mt-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <RaffleGallery raffle={raffle} />
          </div>
          <div className="col-lg-7 raffle-intorduction-right">
            <RaffleDetailInfo raffle={raffle} />
          </div>
        </div>
      </div>
    </section>
    <section id="raffle-details">
      <div className="container">
        <div
          className="row g-1 g-md-2 align-items-center justify-content-between"
        >
            <RaffleDestinationInfo raffle={raffle} />
          </div>
          {raffle.status === 'succeed' ?
            <div id="total-raised" className="text-center raffle-successful-total">
              <p>Total Raised Money: <span className="total-raised">{((raffle.ticket && raffle.ticket.erg) || 0)/staticText.ERG_SCALE}</span> ERG</p>
            </div>
            : raffle.status === 'failed' ?
            <div id="total-raised" className="text-center raffle-unsuccessful-total">
              <p>Total Raised Money: <span className="total-raised">{((raffle.ticket && raffle.ticket.erg) || 0)/staticText.ERG_SCALE}</span> ERG</p>
            </div>
            :
            <div id="total-raised" className="text-center raffle-total">
              <p>Total Raised Money: <span className="total-raised">{((raffle.ticket && raffle.ticket.erg) || 0)/staticText.ERG_SCALE}</span> ERG</p>
            </div>
          }
      </div>
    </section>
    <section id="raffle-transactions">
      <div className="container mt-5">
        <h2 className="transaction-title text-center mb-4" ref={titleRef}>
          {Array.isArray(ticketRaffleTransactions) && ticketRaffleTransactions.length > 0 ? "Details of transactions" : null}
        </h2>
        <div className="winner-box mb-5"> 
          {(Array.isArray(winnerRaffleTransactions) ? winnerRaffleTransactions : []).map((item,key)=>(<WinnerTransactionRow key={item.id} transaction={item} />))}
        </div>
      </div>
      <div className="container all-transactions">
        {(Array.isArray(ticketRaffleTransactions) ? ticketRaffleTransactions : []).map((item,key)=>(<TransactionRow key={item.id} transaction={item} row={key+1} />))}
      </div>
    </section>
    <section id="pagination" className="p-5">
      {!(totalTransactionPagess < 1 || (page === 1 && totalTransactionPagess === 1)) ?
      <Pagination currentPage={page} totalPages={totalTransactionPagess} totalItems={total} PAGE_SIZE={staticText.PAGE_SIZE} prevPage={prevPage} nextPage={nextPage} />
      : null}
    </section>
  </main>
  </>)
}

export default RaffleSuccessFul;