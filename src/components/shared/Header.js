import React, { Component } from "react";
import LanguageDispatcher from "../../res/LanguageDispatcher";
import jwt_decode from "jwt-decode";
import Preloader from "../../controls/Preloader";
import { Link, withRouter } from "react-router-dom";
import { logout } from "./UserFunctions";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverLoggedIn: false,
            ShowDashboardButton: true,
            ShowPreloader: false,
        };

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
    }

    logOut = async () => {
        if (localStorage.Token) {
            let token = jwt_decode(localStorage.Token);
            let user;

            if (token.DriverID) {
                user = {
                    UserType: "Driver",
                    ID: token.DriverID
                }; 
            }
            else if (token.TraderID) {
                user = {
                    UserType: "Trader",
                    ID: token.TraderID
                }; 
            }
            else if (token.TransportCompanyResponsibleID) {
                user = {
                    UserType: "Transport Company Responsible",
                    ID: token.TransportCompanyResponsibleID,
                }; 
            }

            this.setState({
                ShowPreloader: true
            });

            try {
                await logout(user).then(response => {
                    this.setState({
                        ShowPreloader: false
                    });
    
                    if (response.Message === "Logout successful.") {
                        localStorage.removeItem("Token");
                        this.props.history.push(`/login`);
                    }
                });
            } catch (error) {
                this.setState({
                    ShowPreloader: false
                });
            }
        }
    }

    render() {
        let token;
        let dashboardRoute;
        const Language = LanguageDispatcher.GetLanguage();

        if (localStorage.Token) {
            token = jwt_decode(localStorage.Token);

            if (token.DriverID) {
                dashboardRoute = "/drivers";
            }
            else if (token.TraderID) {
                dashboardRoute = "/traders";
            }
            else if (token.TransportCompanyResponsibleID) {
                dashboardRoute = "/transportCompanyResponsibles";
            }
            else {
                dashboardRoute = "/login";
            }
        }

        const loginRegisterLinks = <ul className="nav navbar-nav navbar-right">
            <li>
                <Link to="/register">{Language.Register}</Link>
            </li>
            <li>
                <Link to="/login"
                    onClick={() => {
                        this.setState({
                            ShowDashboardButton: false
                        });
                    }}>{Language.Login}</Link>
            </li>
        </ul>;

        const userLinks = <ul className="nav navbar-nav navbar-right">
            {this.state.ShowDashboardButton && 
                <li>
                <Link to={dashboardRoute}
                    onClick={() => {
                        this.setState({
                            ShowDashboardButton: false
                        });
                    }}>{Language.Dashboard}</Link>
                </li>}
            <li>
                <Link to="" onClick={this.logOut.bind(this)}>{Language.Logout}</Link>
            </li>
        </ul>;
        return (
            <section>
                <header>
                <nav className="navbar navbar-default">
                    <div className="navbar-local color-accent theme-dark">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                                    <span className="sr-only">Toggle navigation</span>
                                    <i className="glyph glyph-hamburger"></i>
                                </button>
                                <Link to="/" className="navbar-brand"
                                    onClick={() => {
                                        this.setState({
                                            ShowDashboardButton: true
                                        });
                                    }}>{Language.ApplicationName}</Link>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                                <ul className="nav navbar-nav"></ul>
                                {localStorage.Token ? userLinks : loginRegisterLinks}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {this.state.ShowPreloader ? <Preloader /> : null}
            </section>
        );
    }
};

export default withRouter(Header);