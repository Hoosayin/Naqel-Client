import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Profile from "./profile/Profile";
import Jobs from "./jobs/Jobs";
import Payments from "./payments/Payments";
import Settings from "./settings/Settings";

class TradersDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SideNavWidth: 0
        };

        this.onCloseNavigation = this.onCloseNavigation.bind(this);
    }

    onCloseNavigation = () => {
        this.setState({
            SideNavWidth: 0
        });
    }

    render() {
        if (!localStorage.Token) {
            return <Redirect to="/login" />;
        }
        else {
            return <section>
                <div className="sidenav" style={{ width: `${this.state.SideNavWidth}px` }}>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseNavigation}>&times;</a>
                    <ul className="nav nav-tabs theme-alt" role="tablist" style={{ marginLeft: "0px" }}>
                        <li style={{ float: "none" }} onClick={this.onCloseNavigation} role="presentation" className="active">
                            <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a>
                        </li>
                        <li style={{ float: "none" }} onClick={this.onCloseNavigation} role="presentation">
                            <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a>
                        </li>
                        <li style={{ float: "none" }} onClick={this.onCloseNavigation} role="presentation">
                            <a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">Payments</a>
                        </li>
                        <li style={{ float: "none" }} onClick={this.onCloseNavigation} role="presentation">
                            <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="profile">
                        <Profile ref="Profile" />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="jobs">
                        <Jobs />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="payments">
                        Payments
                        </div>
                    <div role="tabpanel" className="tab-pane" id="settings">
                        <Settings />
                    </div>
                </div>
                <div className="side-nav-btn" onClick={() => {
                    this.setState({
                        SideNavWidth: 250
                    });
                }}><div className="fas fa-bars" style={{ fontSize: "x-large" }}></div>
                </div>
            </section>;
        }
    }
}

export default TradersDashboard;