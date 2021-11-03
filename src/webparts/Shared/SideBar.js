import { memo } from "react";
import Navigation from './Navigation';

const SideBar = memo(() => {
  const toggleMode = (e) => {
    e.preventDefault();
    toggleNight();
  }
  const toggleNight = function () {
    document.body.classList.toggle("night-mode");
  };
  return (<section id="offcanvas-sidebar">
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="sidebar"
      aria-labelledby="sidebar-label"
    >
      <Navigation />
      <div className="night-mode-btn-offcanvas text-center mt-5">
        <button
          className="night-mode-link night-mode-link-offcanvas"
          rel="noreferrer"
          id="night-mode"
          onClick={toggleMode}
        >
          <span className="icon-moon"></span>
          Night Mode
        </button>
      </div>
    </div>
  </section>)
});

export default SideBar;