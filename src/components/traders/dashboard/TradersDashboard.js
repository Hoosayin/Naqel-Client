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
            Left: -400
        };

        this.onCloseNavigation = this.onCloseNavigation.bind(this);
    }

    onCloseNavigation = () => {
        this.setState({
            Left: -400
        });
    }

    render() {
        if (!localStorage.Token) {
            return <Redirect to="/login" />;
        }
        else {
            return <section>
                <div className="sidenav" style={{ left: `${this.state.Left}px` }}>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.onCloseNavigation}>&times;</a>

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
                            <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Settings</a>
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="profile">
                        <Profile ref="Profile" />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="jobs">
                        <Jobs />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="payments">
                        </div>
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
            </section>;
        }
    }
}

export default TradersDashboard;