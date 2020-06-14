import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginDriver } from "../drivers/DriverFunctions";
import { loginTrader } from "../traders/TraderFunctions";
import { loginAdministrator } from "../administrators/AdministratorFunctions";
import { loginTransportCompanyResponsible } from "../transportCompanyResponsibles/TransportCompanyResponsiblesFunctions";
import Preloader from "../../controls/Preloader";

import {
    LoginCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            EmailOrUsername: "",
            Password: "",
            SignInAs: "Driver",

            ValidEmailOrUsername: false,
            ValidPassword: false,

            ValidForm: false,
            LoggedInAsDriver: false,
            LoggedInAsTrader: false,
            LoggedInAsAdministrator: false,
            LoggedInAsTCResponsible: false,
            LoginError: null,

            Errors: {
                EmailOrUsername: "",
                Password: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value }, () => {
            this.validateField(name, value)
        });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidEmailOrUsername = this.state.ValidEmailOrUsername;
        let ValidPassword = this.state.ValidPassword;

        switch (field) {
            case "EmailOrUsername":
                ValidEmailOrUsername = (value !== "");
                Errors.EmailOrUsername = ValidEmailOrUsername ? "" : "Email or username is required.";
                break;
            case "Password":
                ValidPassword = (value != "");
                Errors.Password = ValidPassword ? "" : "Password is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidEmailOrUsername: ValidEmailOrUsername,
            ValidPassword: ValidPassword
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidEmailOrUsername &&
                    this.state.ValidPassword
            });
        });
    }

    onSubmit = async event => {
        await event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            Preloader: <Preloader />
        });

        const user = {
            EmailOrUsername: this.state.EmailOrUsername,
            Password: this.state.Password,
            SignInAs: this.state.SignInAs,
        };

        if (this.state.SignInAs === "Driver") {
            await loginDriver(user).then(response => {
                console.log(response);
                if (response.Message === "Login successful.") {
                    localStorage.setItem("Token", response.Token);

                    this.setState({
                        LoggedInAsDriver: true,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        LoginError: <div>
                            <label className="control-label text-danger">{response.Message}</label>
                            <br />
                        </div>,
                        Preloader: null,
                    });
                }
            });
        }
        else if (this.state.SignInAs === "Administrator") {
            await loginAdministrator(user).then(response => {
                if (response.Message === "Login successful.") {
                    localStorage.setItem("Token", response.Token);

                    this.setState({
                        LoggedInAsAdministrator: true,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        LoginError: <div>
                            <label className="control-label text-danger">{response.Message}</label>
                            <br />
                        </div>,
                        Preloader: null,
                    });
                }
            });
        }
        else if (this.state.SignInAs === "TC Responsible") {
            await loginTransportCompanyResponsible(user).then(response => {
                if (response.Message === "Login successful.") {
                    localStorage.setItem("Token", response.Token);

                    this.setState({
                        LoggedInAsTCResponsible: true,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        LoginError: <div>
                            <label className="control-label text-danger">{response.Message}</label>
                            <br />
                        </div>,
                        Preloader: null,
                    });
                }
            });
        }
        else {
            await loginTrader(user).then(response => {
                if (response.Message === "Login successful.") {
                    localStorage.setItem("Token", response.Token);

                    this.setState({
                        LoggedInAsTrader: true,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        LoginError: <div>
                            <label className="control-label text-danger">{response.Message}</label>
                            <br />
                        </div>,
                        Preloader: null,
                    });
                }
            });
        }
    }

    render() {
        if (this.state.LoggedInAsDriver) {
            return <Redirect to={"/drivers"} />;
        }
        else if (this.state.LoggedInAsTrader) {
            return <Redirect to={"/traders"} />;
        }
        else if (this.state.LoggedInAsAdministrator) {
            return <Redirect to={"/administrators"} />;
        }
        else if (this.state.LoggedInAsTCResponsible) {
            return <Redirect to={"/transportCompanyResponsibles"} />;
        }
        else {
            return <div>
                <div className="middle" style={LoginCardBack}>
                    <div className="theme-default animated fadeIn" style={Card} >
                        <div style={CardChild}>
                            <img src="./images/lock.svg" alt="Login.png" height="60" />
                            <div className="type-h3" style={CardTitle}>Sign In</div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="EmailOrUsername" className="control-label">Email or Username</label>
                                    <input type="email" className="form-control" name="EmailOrUsername" placeholder="someone@provider.com"
                                        value={this.state.EmailOrUsername} onChange={this.onChange} />
                                    <span className="text-danger">{this.state.Errors.EmailOrUsername}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Password" className="control-label">Password</label>
                                    <input type="password" className="form-control" name="Password" placeholder="Password"
                                        value={this.state.Password} onChange={this.onChange} />
                                    <span className="text-danger">{this.state.Errors.Password}</span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Sign In As</label>
                                    <div className="dropdown" style={{ width: "100%" }}>
                                        <button id="example-dropdown" className="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                            aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                            <span>{this.state.SignInAs}</span>
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                            <li><Link onClick={e => { this.state.SignInAs = "Driver" }} onChange={this.onChange}>Driver</Link></li>
                                            <li><Link onClick={e => { this.state.SignInAs = "Trader" }} onChange={this.onChange}>Trader</Link></li>
                                            <li><Link onClick={e => { this.state.SignInAs = "Broker" }} onChange={this.onChange}>Broker</Link></li>
                                            <li><Link onClick={e => { this.state.SignInAs = "TC Responsible" }} onChange={this.onChange}>TC Responsible</Link></li>
                                            <li><Link onClick={e => { this.state.SignInAs = "Administrator" }} onChange={this.onChange}>Administrator</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group">
                                    {this.state.LoginError}
                                    <label className="control-label">No account? <span><Link to="/register">Register now</Link></span></label>
                                </div>
                                <div>
                                    <input type="submit" value="Sign In" className="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.Preloader}
            </div>;
        }
    }
};

export default Login;