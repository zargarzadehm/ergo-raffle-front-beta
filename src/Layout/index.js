

import { Suspense, useEffect, useState, memo, useRef, useCallback } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ThemeContext, { DARK_THEME, LIGHT_THEME } from '../context';
import { getInfo } from '../service/info.service';
import WalletModal from '../webparts/Modal/WalletModal';
import DonationFinishModal from '../webparts/Raffle/DonationFinishModal';
import Footer from '../webparts/Shared/Footer';
import Header from '../webparts/Shared/Header';
import SideBar from '../webparts/Shared/SideBar';
import 'react-toastify/dist/ReactToastify.css';


const Layout = memo(({children}) => {
  let [ hasWallet, setHasWallet ] = useState(window.localStorage.getItem('wallet') !== null ? window.atob(window.localStorage.getItem('wallet')) : false);

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      wrapperRef.current.scrollTo(0, 0);
    }, [pathname]);
      return null;
    }
    const [theme, setTheme] = useState(window.localStorage.getItem('theme') !== null ? window.localStorage.getItem('theme') === DARK_THEME ? DARK_THEME : LIGHT_THEME : LIGHT_THEME);
    const [info,setInfo] = useState({});
    const [modalStatus, setModalStatus] = useState(null);
    const [modalInfo, setModalInfo] = useState({erg: 0, ticketCount: 0, address: ''});
    const debounce = require('lodash.debounce');
    const headerRef = useRef();
    const wrapperRef = useRef();
    const fetchInfo = useCallback(()=>{
      getInfo().then(
        ({data})=> {
          setInfo(data);
        }
      )
    },[])
    useEffect(()=> {
      fetchInfo();
    },[fetchInfo])
    return (<ThemeContext.Provider value={{theme, setTheme, wrapperRef, info, hasWallet, setHasWallet, setModalInfo, setModalStatus}}>
      <div id="main-content-all-wrapper" ref={wrapperRef} onScroll={debounce(()=> headerRef.current.handleScroll(wrapperRef), 100)}>
        <Router>
            <ScrollToTop />
          <Suspense fallback={<></>}>
            <SideBar />
            <Header ref={headerRef} theme={theme} hasWallet={hasWallet} />
            {children}
            <Footer />      
          </Suspense>
        </Router>
      </div>
      <DonationFinishModal modInfo={modalInfo} modStatus={modalStatus} />
      <WalletModal wallet={hasWallet} />
      <ToastContainer />
      </ThemeContext.Provider>)
  });

  export default Layout;