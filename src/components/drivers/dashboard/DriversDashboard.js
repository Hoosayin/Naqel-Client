import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Truck from "./trucks/Truck";
import Permits from "./permits/Permits";
import Earnings from "./earnings/Earnings";
import Jobs from "./jobs/Jobs";
import Payments from "./payments/Payments";
import Questions from "./questions/Questions";
import Settings from "./settings/Settings";
import Preloader from "../../../controls/Preloader";
import BlockedUserContainer from "../../../containers/blockedUser/BlockedUserContainer";
import { getData } from "../DriverFunctions";

class DriversDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Left: -400,
            DashboardData: null,
            ShowPreloader: false
        };

        this.onCloseNavigation = this.onCloseNavigation.bind(this);
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "DashboardData"
            };

            this.setState({
                ShowPreloader: true
            });

            await getData(request).then(response => {
                if (response.Message === "Dashboard data found.") {
                    this.setState({
                        DashboardData: response.DashboardData,
                        ShowPreloader: false
                    });
                }
                else {
                    this.setState({
                        DashboardData: null,
                        ShowPreloader: false
                    });
                }
            });
        }
    }

    onCloseNavigation = () => {
        this.setState({
            Left: -400
        });
    }

    render() {
        if (!localStorage.Token) {
            return <Redirect to={"/login"} />;
        }
        else {
            const {
                DashboardData,
                ShowPreloader
            } = this.state;

            return (ShowPreloader || !DashboardData) ?
                <Preloader /> : 
                <section>
                    {DashboardData.BlockedUser ?
                        <BlockedUserContainer BlockedUser={DashboardData.BlockedUser} /> :
                        <section>
                            <div className="sidenav" style={{ left: `${this.state.Left}px` }}>
                                <a className="closebtn" onClick={this.onCloseNavigation}>&times;</a>

                                <div class="entity-list" role="tablist">
                                    <div class="entity-list-item" role="presentation">
                                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Profile</a>
                                    </div>
                                    <div class="entity-list-item" role="presentation">
                                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Trucks</a>
                                    </div>
                                    <div class="entity-list-item" role="presentation">
                                        <a href="#permits" aria-controls="permits" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Permits</a>
                                    </div>
                                    {DashboardData.IsActiveAccount ?
                                        <section>
                                            <div class="entity-list-item" role="presentation">
                                                <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Jobs</a>
                                            </div>
                                            <div class="entity-list-item" role="presentation">
                                                <a href="#earnings" aria-controls="earnings" role="tab" data-toggle="tab" onClick={async () => {
                                                    this.onCloseNavigation();
                                                    await this.RefreshEarnings();
                                                }}>Earnings</a>
                                            </div>
                                            <div class="entity-list-item" role="presentation">
                                                <a href="#payments" aria-controls="payments" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Payments</a>
                                            </div>
                                            <div class="entity-list-item" role="presentation">
                                                <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Questions</a>
                                            </div>
                                        </section> : null}
                                    <div class="entity-list-item" role="presentation">
                                        <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Settings</a>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-content">
                                {DashboardData.IsActiveAccount ?
                                    null : <div class="alert alert-warning m-n">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-xs-24">
                                                    <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>Your account isn't yet activated by our team. Make sure to keep your profile up-to-date with your valid information. Our team will soon review your information. At the moment, you cannot use all Naqel services.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                <div role="tabpanel" className="tab-pane active" id="profile">
                                    <Profile />
                                </div>
                                <div role="tabpanel" className="tab-pane" id="trucks">
                                    <Truck />
                                </div>
                                <div role="tabpanel" className="tab-pane" id="permits">
                                    <Permits />
                                </div>
                                {DashboardData.IsActiveAccount ?
                                    <section>
                                        <div role="tabpanel" className="tab-pane" id="earnings">
                                            <Earnings Refresh={refresh => { this.RefreshEarnings = refresh; }} />
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="jobs">
                                            <Jobs />
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="payments">
                                            <Payments />
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="questions">
                                            <Questions />
                                        </div>
                                    </section> : null}
                                <div role="tabpanel" className="tab-pane" id="settings">
                                    <Settings />
                                </div>
                            </div>

                            <div className="side-nav-btn" onClick={() => {
                                this.setState({
                                    Left: 0
                                });
                            }}><div className="fas fa-bars" style={{ fontSize: "x-large" }}></div>
                            </div>
                        </section>}
                </section>;
        }
    }
}

export default DriversDashboard;