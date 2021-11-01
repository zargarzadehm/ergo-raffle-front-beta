

import { Suspense, useEffect, useState, memo, useRef, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {ErrorBoundary} from 'react-error-boundary'
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

const Layout = memo(({ children }) => {
  let [hasWallet, setHasWallet] = useState((window.localStorage.getItem('wallet') !== null && typeof window.localStorage.getItem('wallet') !== 'undefined') ? window.atob(window.localStorage.getItem('wallet')) : '');
  let finishModalRef = useRef();
  let finishModalToggle = useRef();
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') !== null ? window.localStorage.getItem('theme') === DARK_THEME ? DARK_THEME : LIGHT_THEME : LIGHT_THEME);
  const [ info, setInfo ] = useState({});
  const [ isDonation, setIsDonation ] = useState(false);
  const [modalStatus, setModalStatus] = useState(null);
  const [modalInfo, setModalInfo] = useState({ erg: 0, ticketCount: 0, address: '' });
  const debounce = require('lodash.debounce');
  const headerRef = useRef();
  const wrapperRef = useRef();
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
  return (<ThemeContext.Provider value={{ theme, setTheme, isDonation, setIsDonation, finishModalToggle, wrapperRef, info, hasWallet, setHasWallet, setModalInfo, setModalStatus, finishModalRef }}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div id="main-content-all-wrapper" ref={wrapperRef} onScroll={debounce(() => headerRef.current.handleScroll(wrapperRef), 100)}>
      <Router>
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
    <ShareModal />
    <ToastContainer />
    </ErrorBoundary>
  </ThemeContext.Provider>)
});

export default Layout;