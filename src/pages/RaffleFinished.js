
import { memo, useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/Title';
import { getRaffleTransactions, getSingleRaffle } from '../service/raffle.service';
import Pagination from '../webparts/Shared/Pagination';
import staticText from '../statics';
import FinishedRaffleHeader from '../webparts/Raffle/FinishedRaffleHeader';
import FinishedRaffleMiddleBar from '../webparts/Raffle/FinishedRaffleMiddleBar';
import FinishedRaffleTransactions from '../webparts/Raffle/FinishedRaffleTransactions';
import ShareModal from '../webparts/Modal/ShareModal';
import { createPortal } from 'react-dom';

const RaffleSuccessFul = memo(({ history }) => {
  const titleRef = useRef();
  let { id } = useParams();
  const [page, setPage] = useState(1);
  const [raffle, setRaffle] = useState({ name: '', description: '' })
  const [winnerRaffleTransactions, setWinnerRaffleTransactions] = useState([]);
  const [ticketRaffleTransactions, setTicketRaffleTransactions] = useState([]);
  const [charityRaffleTransactions, setCharityRaffleTransactions] = useState([]);
  const [totalTransactionPagess, setTotalTransactionPages] = useState(0);
  const [total, setTotal] = useState(0);
  const getTransactions = useCallback(() => {
    getRaffleTransactions(id, 0, staticText.PAGE_SIZE).then(
      ({ data }) => {
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
      ({ data }) => {
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
      ({ data }) => {
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
      ({ data }) => {
        const items = data.items;
        setTicketRaffleTransactions([...items].filter((a) => a.type !== staticText.winnerStateType && a.type !== staticText.charityStateType));
      }
    )
  }
  const ShareModalPortal = () => {
    return document.getElementById('share-modal') ? createPortal(<ShareModal />, document.getElementById('share-modal')) : null;
  }
  return (<>
    {raffle ?
      <Title title={'Ergo Raffle - ' + raffle.name} />
      :
      null
    }
    <main>
      <FinishedRaffleHeader raffle={raffle} />
      <FinishedRaffleMiddleBar raffle={raffle} />
      {
        Array.isArray(ticketRaffleTransactions) && ticketRaffleTransactions.length > 0
          ?
          <FinishedRaffleTransactions
            titleRef={titleRef}
            page={page}
            winnerRaffleTransactions={winnerRaffleTransactions}
            charityRaffleTransactions={charityRaffleTransactions}
            ticketRaffleTransactions={ticketRaffleTransactions} />
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
              nextPage={nextPage} />
            :
            null
        }
      </section>
      <ShareModalPortal />
    </main>
  </>)
})

export default RaffleSuccessFul;