import React, { Component } from "react";
import { TabMenu } from "../../styles/TabStyles";

import Profile from "../Profile";
import Trucks from "./trucks/Trucks";
import Permits from "../Permits";
import FinancialAffairs from "../FinancialAffairs";
import Jobs from "./jobs/Jobs";
import Payments from "../Payments";
import Settings from "../Settings";

class Dashboard extends Component {
    render() {
        if (!localStorage.userToken) {
            this.props.history.push(`/login`);
            return <a />
        }
        else {
            return (
                <section class="section">
                    <div class="row m-t-md" style={{ backgroundColor: "#444444", }}>
                        <div class="col-md-4" style={{ padding: "35px" }}>
                            <a class="btn btn-lightweight no-outline navigation-btn">Mountain Ranges</a>
                            <nav role="navigation" id="sidenav" class="nav side-navigation side-navigation-large theme-alt">
                                <div class="navigation-label">Mountain Ranges</div>
                                <button type="button" class="close" data-dismiss="side-navigation" aria-label="close">
                                    <i class="glyph glyph-cancel"></i>
                                </button>
                                <ul>
                                    <li role="presentation" class="active"><a href="#profile" aria-controls="prfile" role="tab" data-toggle="tab">Profile</a></li>
                                    <li role="presentation"><a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">Trucks</a></li>
                                    <li role="presentation"><a href="#permits" aria-controls="permits" role="tab" data-toggle="tab">Permits</a></li>
                                    <li role="presentation"><a href="#financialAffairs" aria-controls="financialAffairs" role="tab" data-toggle="tab">Financial Affairs</a></li>
                                    <li role="presentation"><a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">Jobs</a></li>
                                    <li role="presentation"><a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">Payments</a></li>
                                    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div class="col-xs-24 col-md-20 navigation-section">
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="profile">
                                    <Profile />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="trucks">
                                    <Trucks />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="permits">
                                    <Permits />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="financialAffairs">
                                    <FinancialAffairs />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="jobs">
                                    <Jobs />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="payments">
                                    <Payments />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="settings">
                                    <Settings />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

export default Dashboard;