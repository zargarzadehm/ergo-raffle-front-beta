import { memo } from "react";
import { Link } from "react-router-dom";

const Navigation = memo(() => {
    return (<ul className="navbar-nav nav-links ps-3 pt-3">
        <li className="nav-item nav-item-offcanvas py-3">
          <Link className="nav-link nav-link-offcanvas" to={"/"}>Home</Link>
        </li>
        <li className="nav-item nav-item-offcanvas py-3">
          <Link className="nav-link nav-link-offcanvas" to={"/raffle/list"}
            >All Raffles</Link>
        </li>
        <li className="nav-item nav-item-offcanvas py-3">
          <Link className="nav-link nav-link-offcanvas" to={"/faq"}>FAQ</Link>
        </li>
        <li className="nav-item nav-item-offcanvas py-3">
          <Link className="nav-link nav-link-offcanvas" to={"/about"}
            >About/Contact</Link>
        </li>
        <li className="nav-item nav-item-offcanvas py-3">
          <Link className="nav-link nav-link-offcanvas" to={"/dashboard"}
            >Dashboard</Link>
        </li>
      </ul>
    )
});

export default Navigation;