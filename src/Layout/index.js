

import { useEffect, useState, memo, useRef, useCallback, useContext } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary'
import ThemeContext, { DARK_THEME, LIGHT_THEME } from '../context';
import { getInfo } from '../service/info.service';
import WalletModal from '../webparts/Modal/WalletModal';
import DonationFinishModal from '../webparts/Raffle/DonationFinishModal';
import Footer from '../webparts/Shared/Footer';
import Header from '../webparts/Shared/Header';
import SideBar from '../webparts/Shared/SideBar';
import 'react-toastify/dist/ReactToastify.css';
import ShareModal from '../webparts/Modal/ShareModal';
import { toast } from 'react-toastify';

const ScrollTop = () => {
  const context = useContext(ThemeContext);
  const { pathname } = useLocation();
  const scrollToTop = useCallback(() => {
    context.wrapperRef.current.scrollTo(0, 0);
  }, [context.wrapperRef])
  useEffect(() => {
    scrollToTop()
  }, [pathname, scrollToTop]);
  return (null);
}

const Layout = memo(({ children }) => {
  const [hasWallet, setHasWallet] = useState((window.localStorage.getItem('wallet') !== null &&
    typeof window.localStorage.getItem('wallet') !== 'undefined') ?
    window.atob(window.localStorage.getItem('wallet')) :
    '');
  const finishModalRef = useRef();
  const finishModalToggle = useRef();
  const wrapperRef = useRef();
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') !== null ?
    window.localStorage.getItem('theme') === DARK_THEME ?
      DARK_THEME :
      LIGHT_THEME :
    LIGHT_THEME);
  const [info, setInfo] = useState({});
  const [modalStatus, setModalStatus] = useState(null);
  const [modalInfo, setModalInfo] = useState({ erg: 0, ticketCount: 0, address: '' });
  const debounce = require('lodash.debounce');
  const headerRef = useRef();
  const notify = (msg) => toast(msg);
  const fetchInfo = useCallback(() => {
    getInfo().then(
      ({ data }) => {
        setInfo(data);
      }
    )
  }, [])
  const ErrorFallback = () => {
    notify('Something Goes Wrong! Please Try Again Later');
  }

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo])
  return (<ThemeContext.Provider value={{
    theme, setTheme, wrapperRef, finishModalToggle, info,
    hasWallet, setHasWallet, setModalInfo, setModalStatus, finishModalRef
  }}>
    <div id="main-content-all-wrapper" ref={wrapperRef} onScroll={debounce((e) => headerRef.current.handleScroll(e), 100)}>
      <Router>
        <SideBar />
        <Header ref={headerRef} walletPassed={hasWallet} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {children}
        </ErrorBoundary>
        <Footer />
        <ScrollTop />
      </Router>
    </div>
    <DonationFinishModal modInfo={modalInfo} modStatus={modalStatus} />
    <WalletModal walletProp={hasWallet} />
    <ShareModal />
    <ToastContainer />
  </ThemeContext.Provider>)
});

export default Layout;