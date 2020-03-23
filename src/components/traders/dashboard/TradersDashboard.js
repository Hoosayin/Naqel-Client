import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { TabMenu } from "../../../styles/TabStyles";
import Profile from "./profile/Profile";
import Jobs from "./jobs/Jobs";
import Payments from "./payments/Payments";
import Settings from "./settings/Settings";

class TradersDashboard extends Component {
    render() {
        if (!localStorage.Token) {
            return <Redirect to="/login" />;
        }
        else {
            return (
                <div>
                    <ul className="nav nav-tabs theme-alt" role="tablist" style={TabMenu}>
                        <li role="presentation" className="active">
                            <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" onClick={() => { this.refs.Profile.componentDidMount(); }}>Profile</a>
                        </li>                        
                        <li role="presentation"><a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a></li>
                        <li role="presentation"><a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">Payments</a></li>
                        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
                    </ul>

                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="profile">
                            <Profile ref="Profile" />
                        </div>
                        <div role="tabpanel" className="tab-pane" id="jobs">
                            Jobs
                        </div>
                        <div role="tabpanel" className="tab-pane" id="payments">
                            Payments
                        </div>
                        <div role="tabpanel" className="tab-pane" id="settings">
                            <Settings />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default TradersDashboard;