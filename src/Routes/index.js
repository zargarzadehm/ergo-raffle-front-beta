import {Route, Switch} from 'react-router-dom';
import { lazy } from 'react';

// components
const Home = lazy(()=>import('../pages/Home.js'));
const Faq = lazy(()=>import('../pages/Faq.js'));
const About = lazy(()=>import('../pages/About.js'));
const Raffles = lazy(()=>import('../pages/Raffles.js'));
const CreateRaffle = lazy(()=>import('../pages/CreateRaffle.js'));
const RaffleDonate = lazy(()=>import('../pages/RaffleDonate.js'));
const Support = lazy(()=>import('../pages/Support.js'));
const Dashboard = lazy(()=>import('../pages/Dashboard.js'));
const RaffleSuccessful = lazy(()=>import('../pages/RaffleFinished.js'));

const Routes = () => {
    return (<><Switch>
        <Route component={Home} path={'/'} exact />
        <Route component={Faq} path={'/faq'} />
        <Route component={About} path={'/about'} />
        <Route component={Support} path={'/support'} />
        <Route component={Dashboard} path={'/Dashboard'} />
        <Route component={Raffles} path={'/raffle/list'} />
        <Route component={CreateRaffle} path={'/raffle/create'} />
        <Route component={RaffleDonate} path={'/raffle/donate/:id'} />
        <Route component={RaffleSuccessful} path={'/raffle/show/:id'} />
        <Route component={RaffleSuccessful} path={'/raffle/show/successful/:id'} />
    </Switch></>)
  }

export default Routes;