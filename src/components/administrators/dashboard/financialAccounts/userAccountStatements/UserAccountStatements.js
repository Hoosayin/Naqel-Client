import React, { Component } from "react";
import TraderAccountStatements from "./traderAccountStatements/TraderAccountStatements";
import DriverAccountStatements from "./driverAccountStatements/DriverAccountStatements";
import ResponsibleAccountStatements from "./responsibleAccountStatements/ResponsibleAccountStatements";

class UserAccountStatements extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#trader-account-statements" aria-controls="trader-account-statements" role="tab" data-toggle="tab">Trader Account Statements</a>
                </li>
                <li role="presentation">
                    <a href="#driver-account-statements" aria-controls="driver-account-statements" role="tab" data-toggle="tab">Driver Account Statements</a>
                </li>
                <li role="presentation">
                    <a href="#responsible-account-statements" aria-controls="responsible-account-statements" role="tab" data-toggle="tab">TC Responsible Account Statements</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="trader-account-statements">
                    <TraderAccountStatements />
                </div>
                <div role="tabpanel" className="tab-pane" id="driver-account-statements">
                    <DriverAccountStatements />
                </div>
                <div role="tabpanel" className="tab-pane" id="responsible-account-statements">
                    <ResponsibleAccountStatements />
                </div>
            </div>
        </section>;
    }
};

export default UserAccountStatements;