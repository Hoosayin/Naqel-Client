import React, { Component } from "react";
import { Link } from "react-router-dom";
import { register } from "../driver/DriverFunctions";
import Strings from "../../res/strings";
import { Required } from "../../styles/MiscellaneousStyles";

import {
    RegisterCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            Username: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            RegisterAs: "Driver",
            NullError: false,
            PasswordsMatched: false,
            UsernameOrEmailTaken: false,
            ValidEmail: false,
            ValidPassword: false,
            ValidForm: false,
            Agreed: false,
            Errors: {
                Email: "",
                Password: "",
                ConfirmPassword: "",
                Agreed: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let fieldValidationErrors = this.state.Errors;
        let ValidEmail = this.state.ValidEmail;
        let ValidPassword = this.state.ValidPassword;
        let PasswordsMatched = this.state.PasswordsMatched;
        let Agreed = this.state.Agreed;

        switch (field) {
            case "Email":
                ValidEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.Email = ValidEmail ? "" : "Email is invalid.";
                break;
            case "Password":
                ValidPassword = value.length >= 6;
                fieldValidationErrors.Password = ValidPassword ? "" : "Password is too short.";
                break;
            case "ConfirmPassword":
                PasswordsMatched = this.state.Password === value;
                fieldValidationErrors.ConfirmPassword = PasswordsMatched ? "" : "Passwords did not match.";
                break;
            case "IsAgree":
                Agreed = this.refs.agreementCheckBox.checked;
            default:
                break;
        }

        this.setState({
            Errors: fieldValidationErrors,
            ValidEmail: ValidEmail,
            ValidPassword: ValidPassword,
            PasswordsMatched: PasswordsMatched,
            Agreed: Agreed,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            ValidForm: this.state.ValidEmail &&
                this.state.ValidPassword &&
                this.state.PasswordsMatched &&
                this.state.Agreed
        });
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.state.Username === "" ||
            this.state.Email === "" ||
            this.state.Password === "" ||
            this.state.ConfirmPassword === "") {

            this.setState({
                NullError: true,
                UsernameOrEmailTaken: false,
            });

            return;
        }

        const newCredentials = {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            RegisterAs: this.state.RegisterAs,
        }

        register(newCredentials)
            .then(res => {
                if (res &&
                    localStorage.newCredentialsToken) {
                    this.props.history.push(`/emailConfirmation`);
                }
                else {
                    this.setState({
                        NullError: false,
                        UsernameOrEmailTaken: true,
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <div class="middle" style={RegisterCardBack}>
                    <div class="theme-default animated fadeIn" style={Card}>
                        <div style={CardChild}>
                            <img src="./images/signup.png" alt="signup.png" height="60" />
                            <div class="type-h3" style={CardTitle}>
                                Sign Up
                            </div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="Username" class="control-label">Username</label>
                                    <span class="text-danger" style={Required}>*</span>
                                    <input htmlFor="Username" type="text" name="Username" class="form-control" autocomplete="off"
                                        value={this.state.Username} onChange={this.onChange} required />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="Email" class="control-label">Email</label>
                                    <span class="text-danger" style={Required}>*</span>
                                    <input htmlFor="Email" type="email" name="Email" class="form-control" placeholder="someone@example.com" autocomplete="off"
                                        value={this.state.Email} onChange={this.onChange} />
                                    <span class="text-danger">{this.state.Errors["Email"]}</span>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="Password" class="control-label">Password</label>
                                    <span class="text-danger" style={Required}>*</span>
                                    <input htmlFor="Password" type="password" name="Password" class="form-control"
                                        value={this.state.Password} onChange={this.onChange} />
                                    <span class="text-danger">{this.state.Errors["Password"]}</span>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="ConfirmPassword" class="control-label">Confirm Password</label>
                                    <span class="text-danger" style={Required}>*</span>
                                    <input htmlFor="ConfirmPassword" type="password" name="ConfirmPassword" class="form-control"
                                        value={this.state.ConfirmPassword} onChange={this.onChange} />
                                    <span class="text-danger">{this.state.Errors["ConfirmPassword"]}</span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Register As</label>
                                    <div class="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                        <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                            aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                            <span>{this.state.RegisterAs}</span>
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                            <li><Link onClick={e => { this.state.RegisterAs = "Driver" }} onChange={this.onChange}>Driver</Link></li>
                                            <li><Link onClick={e => { this.state.RegisterAs = "Trader" }} onChange={this.onChange}>Trader</Link></li>
                                            <li><Link onClick={e => { this.state.RegisterAs = "Broker" }} onChange={this.onChange}>Broker</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div class="checkbox">
                                        <label class="control-label">
                                            <input ref="agreementCheckBox" type="checkbox" name="IsAgree" value="" onChange={this.onChange}></input>
                                            <span>Agree with our </span>
                                            <span>
                                                <Link data-toggle="modal" data-target="#terms">Terms and Conditions</Link>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    {this.state.NullError &&
                                        <div>
                                            <label class="control-label text-danger">All fields are required.</label>
                                            <br />
                                        </div>
                                    }
                                    {this.state.UsernameOrEmailTaken &&
                                        <div>
                                            <label class="control-label text-danger">Username or email is already taken.</label>
                                            <br />
                                        </div>
                                    }
                                    {this.state.AgreementError &&
                                        <div>
                                            <label class="control-label text-danger">You must agree to our terms and conditions.</label>
                                            <br />
                                        </div>
                                    }
                                    
                                    
                                    <label class="control-label">Have an account? <span><Link to="/login">Sign In Now!</Link></span></label>
                                </div>
                                <input type="submit" value="Next" class="btn btn-primary" disabled={!this.state.ValidForm} />
                            </form>
                        </div>
                    </div>
                </div>

                <div class="modal" id="terms" tabindex="-1" role="dialog" aria-labelledby="modal-sample-label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content animated fadeIn">
                            <div class="modal-header">
                                <h4 class="modal-title" id="modal-sample-label">Terms of Use</h4>
                            </div>
                            <div class="modal-body text-justify">
                                Your privacy is important to us. <span>{Strings.APP_NAME}</span>'s Privacy Statement describes the types of data we collect from you, how we use your Data, and the legal bases we have to process your Data. The Privacy Statement also describes how {String.APP_NAME} uses your content, which is information submitted by you to {Strings.APP_NAME} via the Services. Where processing is based on consent and to the extent permitted by law, by agreeing to these Terms, you consent to {Strings.APP_NAME}’ collection, use and disclosure of your content and data as described in the privacy statement. In some cases, we will provide separate notice and request your consent as referenced in the privacy statement.
                </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;