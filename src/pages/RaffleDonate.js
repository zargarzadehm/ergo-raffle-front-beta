import { useRef, useState, useEffect, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import {
    donateRaffle,
    getRaffleDonationStatus,
    getSingleRaffle,
    getYourActiveRaffleTickets
} from "../service/raffle.service";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Title from "../components/Title";
import ThemeContext from "../context";
import DonationRaffleWalletAddress from "../webparts/Raffle/DonationRaffleWalletAddress";
import DonationRaffleDonationAmount from "../webparts/Raffle/DonationRaffleDonationAmount";
import DonationRaffleAgreeAndFinish from "../webparts/Raffle/DonationRaffleAgreeAndFinish";
import DonateRaffleProgress from "../webparts/Raffle/DonateRaffleProgress";
import RaffleDonationHeader from "../webparts/Raffle/RaffleDonationHeader";
import RaffleDonateMiddleBar from "../webparts/Raffle/RaffleDonateMiddleBar";
import RaffleTickets from "../webparts/Raffle/RaffleTickets";
import DonationFinishModal from "../webparts/Raffle/DonationFinishModal";
import ShareModal from "../webparts/Modal/ShareModal";

let intervallerItem = null;

const RaffleDonate = ({history}) => {
    const context = useContext(ThemeContext);
    const [walletAddress, setWalletAddress] = useState(context.hasWallet);
    const [donateResponse, setDonateResponse] = useState(null);
    const [modalStatus, setModalStatus] = useState(null);
    const [isTermsAccepted, setIsTermsAccepted] = useState(true);
    const [ticketCount, setTicketCount] = useState(5);
    const params = useParams();
    const [recaptcha, setRecaptcha] = useState('');
    const [raffleTransactions, setRaffleTransactions] = useState([]);
    const [raffle, setRaffle] = useState({});
    const stepBarRef = useRef();
    const [activeStep, setActiveStep] = useState(0);
    const notify = (msg) => toast(msg);

    useEffect(() => {
        setWalletAddress(context.hasWallet);
        window.localStorage.setItem('wallet', window.btoa(context.hasWallet));
        getYourActiveRaffleTickets(params.id, context.hasWallet).then(
            ({data}) => {
                setRaffleTransactions(data.items);
            }
        )
    }, [context.hasWallet, params.id])
    const checkStatus = useCallback((status, id) => {
        if (status !== 'active') {
            history.push('/raffle/show/' + id)
        }
    }, [history]);
    useEffect(() => {
        getSingleRaffle(params.id).then(({data}) => {
            setRaffle(data)
            checkStatus(data.status, params.id)
        });
    }, [params.id, checkStatus]);
    const handleFeedback = (value, response) => {
        setIsTermsAccepted(!value);
        setRecaptcha(response);
    }
    const toggleNextStep = (e) => {
        e.preventDefault();
        const newStep = activeStep + 1;
        setActiveStep(newStep);
        setIsTermsAccepted(true);
        if (newStep === 1) {
            context.setHasWallet(walletAddress);
            window.localStorage.setItem('wallet', window.btoa(context.hasWallet))
            stepBarRef.current.style.width = "41%";
        } else if (newStep === 2) {
            stepBarRef.current.style.width = "83%";
        } else {
            stepBarRef.current.style.width = "0%";
        }
    }
    const reduceStep = (e) => {
        setIsTermsAccepted(true);
        e.preventDefault();
        setDonateResponse(null);
        const newStep = activeStep - 1;
        setActiveStep(newStep);
        if (newStep === 1) {
            stepBarRef.current.style.width = "41%";
        } else if (newStep === 2) {
            stepBarRef.current.style.width = "83%";
        } else {
            stepBarRef.current.style.width = "0%";
        }
    }
    const changeWalletAddress = (walletAddress) => {
        setWalletAddress(walletAddress);
    }
    const ticketCountHandler = (count) => {
        setTicketCount(count);
    }
    const donate = () => {
        setIsTermsAccepted(true);
        donateRaffle(params.id, context.hasWallet, ticketCount, recaptcha).then(
            ({data}) => {
                notify('Donation Perfomerd!');
                setIsTermsAccepted(false);
                data.ticketCount = ticketCount;
                setDonateResponse(data);
                getRaffleDonationStatus(params.id, data.requestId).then(
                    ({data}) => {
                        setModalStatus(data.status);
                    }
                )
                intervallerItem = setInterval(() => {
                    getRaffleDonationStatus(params.id, data.requestId).then(
                        ({data}) => {
                            setModalStatus(data.status);

                        }
                    )
                }, 10000);
            }
        ).catch((e) => {
            setIsTermsAccepted(false);
            try {
                notify(e && e.response && e.response.data && e.response.data.message);
            } catch (e) {
            }
        })
    }

    const clearRequestInterval = () => {
        if (intervallerItem) {
            clearInterval(intervallerItem);
        }
    }
    const ShareModalPortal = () => {
        return document.getElementById('share-modal') ? createPortal(
            <ShareModal/>, document.getElementById('share-modal')) : null;
    }
    return (<>
        {raffle.name ?
            <Title title={'Ergo Raffle - ' + raffle.name}/>
            :
            null}
        <main>
            <RaffleDonationHeader raffle={raffle}/>
            <RaffleDonateMiddleBar raffle={raffle}/>
            <section id="steps" className="my-5">
                <div className="container">
                    <DonateRaffleProgress
                        activeStep={activeStep}
                        stepBarRef={stepBarRef}/>
                    <div className="step-content-container my-3 py-5">
                        {
                            activeStep === 0
                                ?
                                <DonationRaffleWalletAddress
                                    walletAddress={walletAddress}
                                    toggleNextStep={toggleNextStep}
                                    changeWalletAddress={(walletAddress) => changeWalletAddress(walletAddress)}/>
                                :
                                null
                        }
                        {
                            activeStep === 1
                                ?
                                <DonationRaffleDonationAmount
                                    reduceStep={reduceStep}
                                    raffle={raffle}
                                    toggleNextStep={toggleNextStep}
                                    ticketCount={ticketCount}
                                    ticketCountHandler={ticketCountHandler}/>
                                :
                                null
                        }
                        {
                            activeStep === 2
                                ?
                                <DonationRaffleAgreeAndFinish
                                    donate={donate}
                                    isTermsAccepted={isTermsAccepted}
                                    handleFeedback={handleFeedback}
                                    reduceStep={reduceStep}/>
                                :
                                null
                        }
                    </div>
                </div>
            </section>
            <RaffleTickets raffleTransactions={raffleTransactions}/>
            <ShareModalPortal/>
        </main>
        {
            donateResponse
                ?
                createPortal(<DonationFinishModal clearRequestInterval={clearRequestInterval} modalStatus={modalStatus}
                                                  response={donateResponse}/>, document.getElementById('finish-modal'))
                :
                null
        }
    </>)
}

export default RaffleDonate;
