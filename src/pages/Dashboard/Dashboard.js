import React from 'react';
import Title from '../../components/Title';
import { getAllYourDonations, getAllYourRafflesYouWin } from '../../service/raffle.service';
import DashboardFaq from './DashboardFaq';
import Tabs from '../../components/Tabs';
import PinnedRaffles from './PinnedRaffles';
import ThemeContext from '../../context';
import { DASHBOARD_TABS, SupportFaq } from "../../statics";
import DashboardRaffles from "./DashboardRaffles";
import EmptyPinnedRaffles from './EmptyPinnedRaffles';

class Dashboard extends React.Component{
    state = {
        isDonationEmpty: false,
        isWinnerEmpty: false,
        isPinnedEmpty: false
    }
    render = () => {
        return(
            <React.Fragment>
                <Title title={'Ergo Raffle - Dashboard'}/>
                <main>
                    <PinnedRaffles/>
                    <DashboardRaffles
                        urlLoader={getAllYourDonations}
                        title="Your Donations"/>
                    <DashboardRaffles
                        urlLoader={getAllYourRafflesYouWin}
                        title="Raffles You Won"/>
                    <EmptyPinnedRaffles/>
                    <div className="dashboard-support-choice d-flex justify-content-around mt-4">
                        <Tabs
                            tabs={DASHBOARD_TABS}
                            activeTab={1}
                            setActiveTab={tab => this.props.history.push("/faq")}/>
                    </div>
                    <DashboardFaq faqs={SupportFaq}/>
                </main>
            </React.Fragment>
        )
    }
}

Dashboard.contextType = ThemeContext;

export default Dashboard;
