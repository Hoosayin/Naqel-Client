import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Trucks from "./trucks/Trucks";
import Permits from "./permits/Permits";
import FinancialAffairs from "./financial_affairs/FinancialAffairs";
import Jobs from "./jobs/Jobs";
import Payments from "./payments/Payments";
import Settings from "./settings/Settings";

class DriversDashboard extends Component {
    render() {
        if (!localStorage.Token) {
            return <Redirect to={"/login"} />;
        }
        else {
            return <div>
                <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                    padding: "10px",
                    backgroundColor: "#3A3A3C",
                    width: "100%",
                    margin: "0px",
                }}>
                    <li role="presentation" className="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
                    <li role="presentation"><a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">Trucks</a></li>
                    <li role="presentation"><a href="#permits" aria-controls="permits" role="tab" data-toggle="tab">Permits</a></li>
                    <li role="presentation"><a href="#financialAffairs" aria-controls="financialAffairs" role="tab" data-toggle="tab">Financial Affairs</a></li>
                    <li role="presentation"><a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a></li>
                    <li role="presentation"><a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">Payments</a></li>
                    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="profile">
                        <Profile />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="trucks">
                        <Trucks />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="permits">
                        <Permits />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="financialAffairs">
                        <FinancialAffairs />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="jobs">
                        <Jobs />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="payments">
                        <Payments />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="settings">
                        <Settings />
                    </div>
                </div>
            </div>;
        }
    }
}

export default DriversDashboard;