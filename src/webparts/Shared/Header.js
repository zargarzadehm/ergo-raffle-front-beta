import { useRef, forwardRef, useImperativeHandle, useEffect, useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ThemeContext, { DARK_THEME, LIGHT_THEME } from "../../context";
import staticText from "../../statics";
import HeaderLayout from "./HeaderLayout";

const Header = forwardRef((props, headerRef) => {
  const [wall, setWall] = useState(props.walletPassed);
  const context = useContext(ThemeContext);
  const desktopHeaderRef = useRef();
  const mobileHeaderRef = useRef();
  const wrapperRef = useRef();

  const toggleMode = (e) => {
    e.preventDefault();
    toggleNight();
  }

  const toggleNight = useCallback(() => {
    if (document.body.classList.contains('night-mode')) {
      window.localStorage.setItem('theme', LIGHT_THEME);
    } else {
      window.localStorage.setItem('theme', DARK_THEME);
    }
    document.body.classList.toggle("night-mode");
  }, []);

  useImperativeHandle(headerRef, () => ({
    handleScroll(e) {
      let header = null;
      const top = e.target.scrollTop;
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

  useEffect(() => {
    if (window.localStorage.getItem('theme') !== null) {
      if (window.localStorage.getItem('theme') === DARK_THEME) {
        toggleNight();
      }
    }
  }, [toggleNight]);
  useEffect(() => {
    setWall(props.walletPassed);
  }, [props.walletPassed])
  return (<HeaderLayout headerRef={headerRef} wrapperRef={wrapperRef}
    mobileHeaderRef={mobileHeaderRef} desktopHeaderRef={desktopHeaderRef}>
    <Link className="navbar-brand mt-2 mt-lg-0" to={"/"}>
      <span className="icon-logo site-logo"></span>
    </Link>
    <div className="collapse navbar-collapse" id="navbarToggler">
      <ul className="navbar-nav mb-2 mb-lg-0 nav-links">
        {staticText.navigations.map((item, key) => (<li key={key + '-nav-items'} className="nav-item">
          <Link className="nav-link" to={item.link}>{item.title}</Link>
        </li>))}
        {wall ? <li className="nav-item">
          <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
        </li> : null}
      </ul>
      <div className="d-flex align-items-center nav-buttons">
        {/* Icon */}
        <a
          href={"/"}
          className="night-mode-link"
          id="night-mode"
          role="button"
        >
          <span onClick={(e) => { toggleMode(e); context.setTheme(context.theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME) }}
            className="icon-moon night-mode-icon"></span>
        </a>
        <button
          type="button"
          className="btn set-wallet"
          data-bs-toggle="modal"
          data-bs-target="#walletModal"
        >
          {!wall ? 'Set Wallet' : <span className={'smaller-wallet-set'}>Wallet : {wall}</span>}
        </button>
      </div>
    </div>
  </HeaderLayout>)
});

export default Header;