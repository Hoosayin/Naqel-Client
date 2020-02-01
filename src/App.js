import React, { Component } from "react";
import { HashRouter, BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import EmailConfirmation from "./components/EmailConfirmation";
import AccountSetup from "./components/AccountSetup";
import Congratulations from "./components/Congratulations";
import Dashboard from "./components/Dashboard";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";

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