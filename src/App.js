import React, { Component } from "react";
import { HashRouter, BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/shared/Header";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import EmailConfirmation from "./components/register/EmailConfirmation";
import AccountSetup from "./components/register/AccountSetup";
import Congratulations from "./components/register/Congratulations";
import Dashboard from "./components/driver/dashboard/Dashboard";
import BackToTop from "./controls/BackToTop";
import Footer from "./components/shared/Footer";

class App extends Component {
    render() {
        return (
            <Router basename="/">
                <div className="App">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/emailConfirmation" component={EmailConfirmation} />
                    <Route exact path="/accountSetup" component={AccountSetup} />
                    <Route exact path="/congratulations" component={Congratulations} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <BackToTop />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;