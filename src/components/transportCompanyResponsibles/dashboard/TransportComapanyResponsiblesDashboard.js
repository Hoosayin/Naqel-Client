import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import Trucks from "./trucks/Trucks";
import Questions from "./questions/Questions";
import FinancialAccounts from "./financialAccounts/FinancialAccounts";
import jwt_decode from "jwt-decode";
import PageNotFoundContainer from "../../../containers/404/404";

class TransportCompanyResponsiblesDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!sessionStorage.Token) {
            return <Redirect to={"/login"} />;
        }
        else if (!jwt_decode(sessionStorage.Token).TransportCompanyResponsibleID) {
            return <PageNotFoundContainer />;
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
                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">{Dictionary.Trucks}</a>
                    </li>
                    <li role="presentation">
                        <a href="#financial-accounts" aria-controls="financial-accounts" role="tab" data-toggle="tab">{Dictionary.FinancialAccounts}</a>
                    </li>
                    <li role="presentation">
                        <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab">{Dictionary.Questions}</a>
                    </li>
                    <li role="presentation">
                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{Dictionary.Profile}</a>
                    </li>
                    <li role="presentation">
                        <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">{Dictionary.Settings}</a>
                    </li>
                </ul>

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
            </section>;
        }
    }
}

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Trucks: "الشاحنات",
        FinancialAccounts: "الحسابات المالية",
        Questions: "الأسئلة",
        Profile: "الملف الشخصي",
        Settings: "الإعدادات",
    };
}
else {
    Dictionary = {
        Trucks: "Trucks",
        FinancialAccounts: "Financial Accounts",
        Questions: "Questions",
        Profile: "Profile",
        Settings: "Settings",
    };
}

export default TransportCompanyResponsiblesDashboard;