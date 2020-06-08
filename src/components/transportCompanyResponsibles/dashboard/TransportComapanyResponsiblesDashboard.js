import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import Trucks from "./trucks/Trucks";
import Questions from "./questions/Questions";
import FinancialAccounts from "./financialAccounts/FinancialAccounts";

class TransportCompanyResponsiblesDashboard extends Component {
    constructor(props) {
        super(props);

        //this.state = {
        //    Left: -400
        //};

        //this.onCloseNavigation = this.onCloseNavigation.bind(this);
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
            return <section>
                <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                    padding: "10px",
                    backgroundColor: "#133F4F",
                    width: "100%",
                    margin: "0px",
                }}>
                    <li role="presentation" className="active">
                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">Trucks</a>
                    </li>
                    <li role="presentation">
                        <a href="#financial-accounts" aria-controls="financial-accounts" role="tab" data-toggle="tab">Financial Accounts</a>
                    </li>
                    <li role="presentation">
                        <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab">Questions</a>
                    </li>
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
                            <a href="#financial-accounts" aria-controls="financial-accounts" role="tab" data-toggle="tab" onClick={this.onCloseNavigation}>Financial Accounts</a>
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
                        <Profile />
                    </div>
                    <div role="tabpanel" className="tab-pane active" id="trucks">
                        <Trucks />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="financial-accounts">
                        <FinancialAccounts />
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
            </section>;
        }
    }
}

export default TransportCompanyResponsiblesDashboard;