import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../users/DriverFunctions";
import { traderBrokerLogin } from "../users/TraderFunctions"
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
            NullError: false,
            InvalidUsernameOrPassword: false,
            Preloader: null,
            Errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.state.EmailOrUsername == "" ||
            this.state.Password == "") {

            this.setState({
                NullError: true,
                InvalidUsernameOrPassword: false,
            });

            return;
        }

        this.setState({
            Preloader: <Preloader />
        });

        const driver = {
            EmailOrUsername: this.state.EmailOrUsername,
            Password: this.state.Password,
            SignInAs: this.state.SignInAs,
        };



        if (this.state.SignInAs == "Driver") {
            login(driver)
                .then(res => {
                    if (res &&
                        localStorage.userToken) {
                        this.props.history.push(`/dashboard`);
                    }
                    else {
                        this.setState({
                            NullError: false,
                            InvalidUsernameOrPassword: true,
                            Preloader: null
                        });
                    }
                });
        }
        else {
            traderBrokerLogin(driver)
                .then(res => {
                    if (res &&
                        localStorage.userToken) {
                        this.props.history.push(`/traderdashboard`);
                    }
                    else {
                        this.setState({
                            NullError: false,
                            InvalidUsernameOrPassword: true,
                            Preloader: null
                        });
                    }
                });
        }

    }

    render() {
        if (localStorage.userToken) {
            this.props.history.push(`/dashboard`);
            return <a />
        }
        else {
            return (
                <div>
                    <div className="middle" style={LoginCardBack}>
                        <div className="theme-default animated fadeIn" style={Card} >
                            <div style={CardChild}>
                                <img src="./images/login.png" alt="Login.png" height="60" />
                                <div class="type-h3" style={CardTitle}>
                                    Sign In
                            </div>
                                <br />
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="form-group">
                                        <label htmlFor="EmailOrUsername" class="control-label">Email or Username</label>
                                        <input type="email" class="form-control" name="EmailOrUsername" placeholder="someone@provider.com"
                                            value={this.state.EmailOrUsername} onChange={this.onChange} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="Password" class="control-label">Password</label>
                                        <input type="password" className="form-control" name="Password" placeholder="Password"
                                            value={this.state.Password} onChange={this.onChange} />
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Sign In As</label>
                                        <div class="dropdown" style={{ width: "100%" }}>
                                            <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                <span>{this.state.SignInAs}</span>
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                <li><Link onClick={e => { this.state.SignInAs = "Driver" }} onChange={this.onChange}>Driver</Link></li>
                                                <li><Link onClick={e => { this.state.SignInAs = "Trader" }} onChange={this.onChange}>Trader</Link></li>
                                                <li><Link onClick={e => { this.state.SignInAs = "Broker" }} onChange={this.onChange}>Broker</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        {this.state.NullError &&
                                            <div>
                                                <label class="control-label text-danger">Email/Username and password is required.</label>
                                                <br />
                                            </div>
                                        }
                                        {this.state.InvalidUsernameOrPassword &&
                                            <div>
                                                <label class="control-label text-danger">Invalid username or password.</label>
                                                <br />
                                            </div>
                                        }
                                        <label class="control-label"><Link to="/">Forgot password</Link></label>
                                        <br />
                                        <label class="control-label">No account? <span><Link to="/register">Register now</Link></span></label>
                                    </div>
                                    <div>
                                        <input type="submit" value="Sign In" class="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {this.state.Preloader}
                </div>
            );
        }
    }
};

export default Login;