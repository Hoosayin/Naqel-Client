import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { TabMenu } from "../styles/TabStyles";

class DashboardTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            SelectedTab: this.props.SelectedTab,
        };
    }

    render() {
        return (
            <ul class="nav nav-tabs theme-alt" role="tablist" style={TabMenu}>
                {this.state.SelectedTab === 1 ?
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard">Profile</Link>
                    </li> :
                    <li role="presentation">
                        <Link to="/dashboard">Profile</Link>
                    </li>
                }
                {this.state.SelectedTab === 2 ?
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard/trucks">Trucks</Link>
                    </li> :
                    <li role="presentation">
                        <Link to="/dashboard/trucks">Trucks</Link>
                    </li>
                }
                {this.state.SelectedTab === 3 ?
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard/permits">Permits</Link>
                    </li> :
                    <li role="presentation" >
                        <Link to="/dashboard/permits">Permits</Link>
                    </li>
                }
                {this.state.SelectedTab === 4 ? 
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard/financialAffairs">Financial Affairs</Link>
                    </li> : 
                    <li role="presentation">
                        <Link to="/dashboard/financialAffairs">Financial Affairs</Link>
                    </li>
                }
                {this.state.SelectedTab === 5 ?
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard/jobs">Jobs</Link>
                    </li> :
                    <li role="presentation" >
                        <Link to="/dashboard/jobs">Jobs</Link>
                    </li>
                }
                {this.state.SelectedTab === 6 ?
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard/payments">Payments</Link>
                    </li> :
                    <li role="presentation" >
                        <Link to="/dashboard/payments">Payments</Link>
                    </li>
                }
                {this.state.SelectedTab === 7 ?
                    <li role="presentation" class="active animated fadeIn">
                        <Link to="/dashboard/settings">Settings</Link>
                    </li> : 
                    <li role="presentation" >
                        <Link to="/dashboard/settings">Settings</Link>
                    </li>
                }
            </ul>
        );
    }
};

export default withRouter(DashboardTabs);