
import hand from '../../assets/img/home-hand.png';
import handDark from '../../assets/img/home-hand-dark.png';
import ThemeContext, { DARK_THEME } from '../../context';
import { lazy, memo } from 'react';

const HomeLeftColumn = lazy(()=>import('./HomeLeftColumn'));

const HomeHeader = memo(()=>{
    return (<ThemeContext.Consumer>
        {({theme})=>(
    <section className="hero mt-header">
    <div className="container">
      <div className="row">
        <div className="col left-column">
          <HomeLeftColumn />
        </div>
        <div className="col helping-hand d-none d-lg-block">
          <img
            src={theme === DARK_THEME ? handDark : hand}
            className="helping-hand-img"
            alt="helping hand"
          />
          <div className="orange-circle orange-circle3"></div>
          <div className="orange-circle orange-circle4"></div>
          <div className="orange-circle orange-circle5"></div>
        </div>
      </div>
    </div>
  </section>)}</ThemeContext.Consumer>);
});

export default HomeHeader;