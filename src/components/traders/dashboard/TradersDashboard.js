import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Jobs from "./jobs/Jobs";
import Payments from "./payments/Payments";
import AccountStatement from "./accountStatement/AccountStatement";
import Questions from "./questions/Questions";
import Settings from "./settings/Settings";
import SearchingContainer from "../../../containers/searching/SearchingContainer";
import ExoneratedTraderContainer from "../../../containers/exoneratedTrader/ExoneratedTraderContainer";
import { getData } from "../TraderFunctions";

class TradersDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Left: -400,
            DashboardData: null,
            Searching: false
        };

        //this.onCloseNavigation = this.onCloseNavigation.bind(this);
    }

    //onCloseNavigation = () => {
    //    this.setState({
    //        Left: -400
    //    });
    //}

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "DashboardData"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Dashboard data found.") {
                    this.setState({
                        DashboardData: response.DashboardData,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        DashboardData: null,
                        Searching: false
                    });
                }
            });
        }
    }

    render() {
        if (!localStorage.Token) {
            return <Redirect to="/login" />;
        }
        else {
            const {
                DashboardData,
                Searching
            } = this.state;

            return (Searching || !DashboardData) ?
                <SearchingContainer Searching={Searching}
                    SearchingFor="trader" /> :
                <section>
                    {DashboardData.ExoneratedTrader ?
                        <ExoneratedTraderContainer ExoneratedTrader={DashboardData.ExoneratedTrader} /> :
                        <section>
                            <section>
                                <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                                    padding: "10px",
                                    backgroundColor: "#133F4F",
                                    width: "100%",
                                    margin: "0px",
                                }}>
                                    <li role="presentation" className="active">
                                        <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">{Dictionary.Jobs}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">{Dictionary.Payments}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#account-statement" aria-controls="account-statement" role="tab" data-toggle="tab">{Dictionary.AccountStatement}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab">{Dictionary.Questions}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{Dictionary.Profile}</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">{Dictionary.Settings}</a>
                                    </li>
                                </ul>

                                {/*
                                 <div className="sidenav" style={{ left: `${this.state.Left}px` }}>
                                    <a className="closebtn" onClick={this.onCloseNavigation}>&times;</a>

                                    <div class="entity-list" role="tablist">
                                        <div class="entity-list-item" role="presentation">
                                            <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Profile</a>
                                        </div>
                                        <div class="entity-list-item" role="presentation">
                                            <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Jobs</a>
                                        </div>
                                        <div class="entity-list-item" role="presentation">
                                            <a href="#payments" aria-controls="payments" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Payments</a>
                                        </div>
                                        <div class="entity-list-item" role="presentation">
                                            <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Questions</a>
                                        </div>
                                        <div class="entity-list-item" role="presentation">
                                            <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Settings</a>
                                        </div>
                                    </div>
                                </div>
                                 */}

                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane" id="profile">
                                        <Profile ref="Profile" />
                                    </div>
                                    <div role="tabpanel" className="tab-pane active" id="jobs">
                                        <Jobs />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="payments">
                                        <Payments />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="account-statement">
                                        <AccountStatement />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="questions">
                                        <Questions />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="settings">
                                        <Settings />
                                    </div>
                                </div>

                                {/*
                                 <div className="side-nav-btn" onClick={() => {
                                    this.setState({
                                        Left: 0
                                    });
                                }}><div className="fas fa-bars" style={{ fontSize: "x-large" }}></div>
                                </div>
                                 */}
                            </section>
                        </section>}
                </section>;
        }
    }
}

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Jobs: "وظائف",
        Payments: "المدفوعات",
        AccountStatement: "كشف حساب",
        Questions: "الأسئلة",
        Profile: "الملف الشخصي",
        Settings: "الإعدادات",
    };
}
else {
    Dictionary = {
        Jobs: "Jobs",
        Payments: "Payments",
        AccountStatement: "Account Statement",
        Questions: "Questions",
        Profile: "Profile",
        Settings: "Settings",
    };
}

export default TradersDashboard;