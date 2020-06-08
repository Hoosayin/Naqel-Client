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
import SearchingContainer from "../../../containers/searching/SearchingContainer";
import BlockedUserContainer from "../../../containers/blockedUser/BlockedUserContainer";
import { getData } from "../DriverFunctions";

class DriversDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Left: -400,
            DashboardData: null,
            Searching: false
        };

        //this.onCloseNavigation = this.onCloseNavigation.bind(this);
    }

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

    //onCloseNavigation = () => {
    //    this.setState({
    //        Left: -400
    //    });
    //}

    render() {
        if (!localStorage.Token) {
            return <Redirect to={"/login"} />;
        }
        else {
            const {
                DashboardData,
                Searching
            } = this.state;

            return (Searching || !DashboardData) ?
                <SearchingContainer Searching={Searching} SearchingFor="driver" /> : 
                <section>
                    {DashboardData.BlockedUser ?
                        <BlockedUserContainer BlockedUser={DashboardData.BlockedUser} /> :
                        <section>
                            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                                padding: "10px",
                                backgroundColor: "#133F4F",
                                width: "100%",
                                margin: "0px",
                            }}>
                                {DashboardData.IsActiveAccount &&
                                    <li role="presentation" className="active">
                                        <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a>
                                    </li>}
                                {!DashboardData.IsActiveAccount &&
                                    <li role="presentation" className="active">
                                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">Trucks</a>
                                    </li>}
                                {DashboardData.IsActiveAccount && 
                                    <li role="presentation">
                                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">Trucks</a>
                                    </li>}
                                <li role="presentation">
                                    <a href="#permits" aria-controls="permits" role="tab" data-toggle="tab">Permits</a>
                                </li>
                                {DashboardData.IsActiveAccount &&
                                    <li role="presentation">
                                    <a href="#earnings" aria-controls="earnings" role="tab" data-toggle="tab"
                                        onClick={async () => { await this.RefreshEarnings(); }}>Earnings</a>
                                    </li>}
                                {DashboardData.IsActiveAccount &&
                                    <li role="presentation">
                                        <a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">Payments</a>
                                    </li>}
                                {DashboardData.IsActiveAccount &&
                                    <li role="presentation">
                                        <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab">Questions</a>
                                    </li>}
                                <li role="presentation">
                                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a>
                                </li>
                                <li role="presentation">
                                    <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>
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
                             */}

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

                                <div role="tabpanel" className="tab-pane" id="profile">
                                    <Profile />
                                </div>
                                {DashboardData.IsActiveAccount && 
                                    <div role="tabpanel" className="tab-pane" id="trucks">
                                        <Truck />
                                    </div>}
                                {!DashboardData.IsActiveAccount &&
                                    <div role="tabpanel" className="tab-pane" id="trucks">
                                        <Truck />
                                    </div>}
                                <div role="tabpanel" className="tab-pane" id="permits">
                                    <Permits />
                                </div>
                                {DashboardData.IsActiveAccount ?
                                    <div role="tabpanel" className="tab-pane" id="earnings">
                                        <Earnings Refresh={refresh => { this.RefreshEarnings = refresh; }} />
                                    </div> : null}
                                {DashboardData.IsActiveAccount ?
                                    <div role="tabpanel" className="tab-pane active" id="jobs">
                                        <Jobs />
                                    </div> : null}
                                {DashboardData.IsActiveAccount ?
                                    <div role="tabpanel" className="tab-pane" id="payments">
                                        <Payments />
                                    </div> : null}
                                {DashboardData.IsActiveAccount ?
                                    <div role="tabpanel" className="tab-pane" id="questions">
                                        <Questions />
                                    </div> : null}
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
                        </section>}
                </section>;
        }
    }
}

export default DriversDashboard;