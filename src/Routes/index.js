import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home.js';
import Faq from '../pages/Faq/Faq.js';
import About from '../pages/About/About.js';
import Raffles from '../pages/Raffles.js';
import CreateRaffle from '../pages/CreateRaffle.js';
import RaffleDonate from '../pages/RaffleDonate.js';
import Support from '../pages/Support/Support.js';
import Dashboard from '../pages/Dashboard/Dashboard.js';
import RaffleFinished from '../pages/RaffleFinished.js';

const Routes = () => {
    return (<>
        <Switch>
            <Route component={Home} path={'/'} exact/>
            <Route component={Faq} path={'/faq'}/>
            <Route component={About} path={'/about'}/>
            <Route component={Support} path={'/support'}/>
            <Route component={Dashboard} path={'/Dashboard'}/>
            <Route component={Raffles} path={'/raffle/list'}/>
            <Route component={CreateRaffle} path={'/raffle/create'}/>
            <Route component={RaffleDonate} path={'/raffle/donate/:id'}/>
            <Route component={RaffleFinished} path={'/raffle/show/:id'}/>
        </Switch>
    </>)
}

export default Routes;
