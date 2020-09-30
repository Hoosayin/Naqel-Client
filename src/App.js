import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CodeConfirmation from "./components/register/CodeConfirmation";
import AccountSetup from "./components/register/AccountSetup";
import SetupTransportCompanyResponsibleAccount from "./components/register/SetupTransportCompanyResponsibleAccount";
import Congratulations from "./components/register/Congratulations";
import DriversDashboard from "./components/drivers/dashboard/DriversDashboard";
import TradersDashboard from "./components/traders/dashboard/TradersDashboard";
import TransportCompanyResponsiblesDashboard from "./components/transportCompanyResponsibles/dashboard/TransportComapanyResponsiblesDashboard";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import RecoverPassword from "./components/forgotPassword/RecoverPassword";
import PasswordRecovered from "./components/forgotPassword/PasswordRecovered";
import BackToTop from "./controls/BackToTop";
import Footer from "./components/shared/Footer";
import TraderBill from "./components/traders/dashboard/payments/TraderBill";
import TraderSpecialBill from "./components/traders/dashboard/payments/TraderSpecialBill";
import DriverBill from "./components/drivers/dashboard/payments/DriverBill";
import jwt_decode from "jwt-decode";

class App extends Component {
    render() {
        return <Router basename="/">
            <div className="App">
                <Header />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/codeConfirmation" component={CodeConfirmation} />
                <Route exact path="/setupAccount" component={AccountSetup} />
                <Route exact path="/setupTransportCompanyResponsibleAccount" component={SetupTransportCompanyResponsibleAccount} />
                <Route exact path="/congratulations" component={Congratulations} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/recoverPassword" component={RecoverPassword} />
                <Route exact path="/passwordRecovered" component={PasswordRecovered} />
                <Route exact path="/drivers" component={DriversDashboard} />
                <Route exact path="/traders" component={TradersDashboard} />
                <Route exact path="/transportCompanyResponsibles" component={TransportCompanyResponsiblesDashboard} />
                <Route exact path="/traderBill:Bill" component={TraderBill} />
                <Route exact path="/traderSpecialBill:Bill" component={TraderSpecialBill} />
                <Route exact path="/driverBill:Bill" component={DriverBill} />
                <BackToTop />
                <Footer />
            </div>
        </Router>;
    }
}

export default App;