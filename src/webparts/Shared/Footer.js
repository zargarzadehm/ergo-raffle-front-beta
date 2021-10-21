import { memo } from "react";
import { Link } from "react-router-dom";
import staticText from "../../statics";

const Footer = memo(() => {
    return (<footer>
        <div className="container">
          <div className="footer-body">
            <div className="orange-circle orange-circle6"></div>
            <div className="orange-circle orange-circle7"></div>
            <div className="footer-body-branding p-lg-5 p-3 mb-4">
              <Link className="navbar-brand mt-2 me-0 mt-lg-0" to={"/"}>
                <span className="icon-logo site-logo"></span>
              </Link>
              <Link to={'/'} className="site-link mt-2">Ergo Raffle</Link>
              <div className="footer-links mt-3 pt-3">
              {staticText.footers.map((item,key)=>(<Link key={key+Math.random()+'footer-elem'} className="nav-link nav-link-offcanvas" to={item.link}>{item.title}</Link>))}
                <a
                  rel="noreferrer"
                  className="nav-link"
                  href="#walletModal"
                  data-bs-toggle="modal"
                  data-bs-target="#walletModal"
                  >Wallet</a>
              </div>
              <div className="footer-links footer-sublinks mt-4">
              {Object.entries(staticText.socials).map(([key,value],i) => (<a rel="noreferrer" key={i} target="_blank" className="nav-link nav-sublink" href={value}>{key}</a>))}
              </div>
            </div>
            <div className="footer-copyright text-center mb-4">
              <h6>CopyRight &copy; ErgoRaffle 2021</h6>
            </div>
          </div>
        </div>
      </footer>)
})

export default Footer;