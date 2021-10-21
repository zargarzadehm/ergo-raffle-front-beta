import { lazy, Suspense, useRef } from "react";
import { memo } from "react";

const LazyNav = lazy(()=> import('./Navigation'));
const SideBar = memo(()=> {
    const offCanvasNightMode = useRef();
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
        <Suspense fallback={''}>
            <LazyNav />        
        </Suspense>
      <div className="night-mode-btn-offcanvas text-center mt-5">
        <button
          ref={offCanvasNightMode}
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