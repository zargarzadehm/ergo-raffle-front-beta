import { useRef,  forwardRef, useImperativeHandle, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeContext, { DARK_THEME, LIGHT_THEME } from "../../context";

const Header = forwardRef((props,headerRef) => {
    const nighModeIconRef = useRef();
    const desktopHeaderRef = useRef();
    const mobileHeaderRef = useRef();
    const toggleMode = (e) => {
      e.preventDefault();
      toggleNight();
    }
    
    const toggleNight = () => {
      if(document.body.classList.contains('night-mode')) {
        window.localStorage.setItem('theme',LIGHT_THEME);
      } else {
        window.localStorage.setItem('theme',DARK_THEME);
      }
      document.body.classList.toggle("night-mode");
    };

    useImperativeHandle(headerRef, () => ({
      handleScroll(wrapperRef) {
        let header = null;
        const top = wrapperRef.current.scrollTop;
        header = desktopHeaderRef.current;
        if (top > 50) {
          header.classList.add("scrolled-header");
        } else {
          header.classList.remove("scrolled-header")
        }  
        header = mobileHeaderRef.current;
        if (top > 50) {
          header.classList.add("scrolled-header");
        } else {
          header.classList.remove("scrolled-header")
        }
      }
    }))

    useEffect(()=> {
      if(window.localStorage.getItem('theme') !== null) {
        if(window.localStorage.getItem('theme') === DARK_THEME) {
          toggleNight();
        }
      }
    },[]);
  
    return (<ThemeContext.Consumer>
      {({theme,setTheme, hasWallet})=>(
    <header>
        <div ref={desktopHeaderRef} className="fixed-top">
          {/* desktop nav */}
          <nav
            id="desktop-nav"
            className="
              d-none d-lg-flex
              navbar navbar-expand-lg navbar-light
              container
            "
          > 
            <div className="container-fluid">
              {/* Navbar brand */}
              <Link className="navbar-brand mt-2 mt-lg-0" to={"/"}>
                <span className="icon-logo site-logo"></span>
              </Link>
              <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav mb-2 mb-lg-0 nav-links">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/raffle/list"}>All Raffles</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/faq"}>FAQ</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/about"}>About/Contact</Link>
                  </li>
                  { hasWallet ? <li className="nav-item">
                    <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                  </li> : null }
                </ul>
                {/* Right elements */}
                <div className="d-flex align-items-center nav-buttons">
                  {/* Icon */}
                  <a
                    href={"/"}
                    className="night-mode-link"
                    id="night-mode"
                    role="button"
                  >
                    <span ref={nighModeIconRef} onClick={(e)=>{toggleMode(e); setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME)}} className="icon-moon night-mode-icon"></span>
                  </a>
                  <button
                    type="button"
                    className="btn set-wallet"
                    data-bs-toggle="modal"
                    data-bs-target="#walletModal"
                  >
                    Set Wallet
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* mobile nav */}
        <div ref={mobileHeaderRef} className="fixed-top">
          <section
            id="mobile-nav"
            className="
              d-flex d-lg-none
              px-4
              py-2
              align-items-center
              justify-content-between
            "
          >
            <div className="mobile-navbar-buttons">
              <a
                href="#sidebar"
                className="mobile-nav-toggler"
                data-bs-toggle="offcanvas"
                role="button"
                aria-controls="sidebar"
              >
                <span className="navbar-toggler-icon icon-navbarToggle"></span>
              </a>
              <button
                type="button"
                className="btn set-wallet set-wallet-mobile"
                data-bs-toggle="modal"
                data-bs-target="#walletModal"
              >
                Set Wallet
              </button>
            </div>
            <Link className="mt-3 mt-lg-0" to={"/"}>
              <span className="icon-logo site-logo"></span>
            </Link>
          </section>
        </div>
      </header>)}
      </ThemeContext.Consumer>)
});

export default Header;