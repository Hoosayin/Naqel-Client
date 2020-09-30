import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile/Profile";
import Truck from "./trucks/Truck";
import Permits from "./permits/Permits";
import Earnings from "./earnings/Earnings";
import Jobs from "./jobs/Jobs";
import Payments from "./payments/Payments";
import AccountStatement from "./accountStatement/AccountStatement";
import Questions from "./questions/Questions";
import Settings from "./settings/Settings";
import SearchingContainer from "../../../containers/searching/SearchingContainer";
import BlockedUserContainer from "../../../containers/blockedUser/BlockedUserContainer";
import { getData } from "../DriverFunctions";
import jwt_decode from "jwt-decode";
import PageNotFoundContainer from "../../../containers/404/404";

class DriversDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Left: -400,
            DashboardData: null,
            Searching: false
        };
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

    render() {
        if (!localStorage.Token) {
            return <Redirect to={"/login"} />;
        }
        else if (!jwt_decode(localStorage.Token).DriverID) {
            return <PageNotFoundContainer />;
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
                            }} dir={(!Language || Language === "English") ? "ltr" : "rtl"}>
                                {DashboardData.IsActiveAccount ?
                                    <li role="presentation" className="active">
                                        <a href="#jobs" aria-controls="jobs" role="tab" data-toggle="tab">{Dictionary.Jobs}</a>
                                    </li> : null}
                                {!DashboardData.IsActiveAccount ?
                                    <li role="presentation" className="active">
                                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">{Dictionary.Trucks}</a>
                                    </li> : null}
                                {DashboardData.IsActiveAccount ?
                                    <li role="presentation">
                                        <a href="#trucks" aria-controls="trucks" role="tab" data-toggle="tab">{Dictionary.Trucks}</a>
                                    </li> : null}
                                <li role="presentation">
                                    <a href="#permits" aria-controls="permits" role="tab" data-toggle="tab">{Dictionary.Permits}</a>
                                </li>
                                {DashboardData.IsActiveAccount ?
                                    <li role="presentation">
                                        <a href="#earnings" aria-controls="earnings" role="tab" data-toggle="tab"
                                            onClick={async () => { await this.RefreshEarnings(); }}>{Dictionary.Earnings}</a>
                                    </li> : null}
                                {DashboardData.IsActiveAccount ?
                                    <li role="presentation">
                                        <a href="#payments" aria-controls="payments" role="tab" data-toggle="tab">{Dictionary.Payments}</a>
                                    </li> : null}
                                    {DashboardData.IsActiveAccount ?
                                    <li role="presentation">
                                        <a href="#account-statement" aria-controls="account-statement" role="tab" data-toggle="tab">{Dictionary.AccountStatement}</a>
                                    </li> : null}
                                {DashboardData.IsActiveAccount ?
                                    <li role="presentation">
                                        <a href="#questions" aria-controls="questions" role="tab" data-toggle="tab">{Dictionary.Questions}</a>
                                    </li> : null}
                                <li role="presentation">
                                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">{Dictionary.Profile}</a>
                                </li>
                                <li role="presentation">
                                    <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">{Dictionary.Settings}</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {DashboardData.IsActiveAccount ?
                                    null : <div class="alert alert-warning m-n" dir={(!Language || Language === "English") ? "ltr" : "rtl"}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>{Dictionary.AccountActivationMessage}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                <div role="tabpanel" className="tab-pane" id="profile">
                                    <Profile />
                                </div>
                                {DashboardData.IsActiveAccount ? 
                                    <div role="tabpanel" className="tab-pane" id="trucks">
                                        <Truck />
                                    </div> : null}
                                {!DashboardData.IsActiveAccount ?
                                    <div role="tabpanel" className="tab-pane active" id="trucks">
                                        <Truck />
                                    </div> : null}
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
                                    <div role="tabpanel" className="tab-pane" id="account-statement">
                                        <AccountStatement />
                                    </div> : null}
                                {DashboardData.IsActiveAccount ?
                                    <div role="tabpanel" className="tab-pane" id="questions">
                                        <Questions />
                                    </div> : null}
                                <div role="tabpanel" className="tab-pane" id="settings">
                                    <Settings />
                                </div>
                            </div>
                        </section>}
                </section>;
        }
    }
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Jobs: "أوامر العمل",
        Trucks: "الشاحنات",
        Permits: "التصاريح",
        Earnings: "التحصيل",
        Payments: "المدفوعات",
        AccountStatement: "كشف حساب",
        Questions: "الأسئلة",
        Profile: "الملف الشخصي",
        Settings: "الإعدادات",
        AccountActivationMessage: "لم يتم تنشيط حسابك حتى الآن من قبل فريقنا. تأكد من تحديث ملفك الشخصي بمعلوماتك الصالحة. سيراجع فريقنا معلوماتك قريبًا. في الوقت الحالي ، لا يمكنك استخدام جميع خدمات نقل."
    };
}
else {
    Dictionary = {
        Jobs: "Jobs",
        Trucks: "Trucks",
        Permits: "Permits",
        Earnings: "Earnings",
        Payments: "Payments",
        AccountStatement: "Account Statement",
        Questions: "Questions",
        Profile: "Profile",
        Settings: "Settings",
        AccountActivationMessage: "Your account isn't yet activated by our team. Make sure to keep your profile up-to-date with your valid information. Our team will soon review your information. At the moment, you cannot use all Naqel services."
    };
}

export default DriversDashboard;