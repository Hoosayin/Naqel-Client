import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Preloader from "../../controls/Preloader";
import { setupAdministratorAccount } from "../administrators/AdministratorFunctions";

import {
    AccountSetupCardBack,
    CardLarge,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class SetupAdministratorAccount extends Component {
    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            AdministratorSecret: "",

            ValidFirstName: false,
            ValidLastName: false,
            ValidAdministratorSecret: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                FirstName: "",
                LastName: "",
                AdministratorSecret: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidFirstName = this.state.ValidFirstName;
        let ValidLastName = this.state.ValidLastName;
        let ValidAdministratorSecret = this.state.ValidAdministratorSecret;

        switch (field) {
            case "FirstName":
                ValidFirstName = (value !== "");
                Errors.FirstName = ValidFirstName ? "" : "First name is required.";

                if (Errors.FirstName !== "") {
                    break;
                }

                ValidFirstName = (value.match(/^[a-zA-Z ]+$/));
                Errors.FirstName = ValidFirstName ? "" : "First name is invalid.";
                break;
            case "LastName":
                ValidLastName = (value !== "");
                Errors.LastName = ValidLastName ? "" : "Last name is required.";

                if (Errors.LastName !== "") {
                    break;
                }

                ValidLastName = (value.match(/^[a-zA-Z ]+$/));
                Errors.LastName = ValidLastName ? "" : "Last name is invalid.";
                break;
            case "AdministratorSecret":
                ValidAdministratorSecret = (value !== "");
                Errors.AdministratorSecret = ValidAdministratorSecret ? "" : "Secret code is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidFirstName: ValidFirstName,
            ValidLastName: ValidLastName,
            ValidAdministratorSecret: ValidAdministratorSecret
        }, () => {
            this.setState({
                ValidForm: this.state.ValidFirstName &&
                    this.state.ValidLastName &&
                    this.state.ValidAdministratorSecret
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (localStorage.verifiedCredentialsToken) {
            this.setState({
                ShowPreloader: true
            });

            const verifiedCredentials = jwt_decode(localStorage.verifiedCredentialsToken);

            const newAdministrator = {
                Username: verifiedCredentials.Username,
                Email: verifiedCredentials.Email,
                Password: verifiedCredentials.Password,
                RegisterAs: verifiedCredentials.RegisterAs,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                AdministratorSecret: this.state.AdministratorSecret
            }

            await setupAdministratorAccount(newAdministrator).then(response => {
                this.setState({
                    ShowPreloader: false
                });

                if (response.Message == "Administrator created.") {
                    localStorage.removeItem("verifiedCredentialsToken");
                    localStorage.setItem("IsCreatedSuccessfully", true);
                    this.props.history.push("/congratulations");
                }
                else {
                    let errors = this.state.Errors;
                    errors.AdministratorSecret = response.Message;

                    this.setState({
                        Errors: errors
                    });
                }
            });
        }
    }

    render() {
        if (!localStorage.verifiedCredentialsToken) {
            return <Redirect to={"/register"} />;
        }
        else {
            return <section>
                <div class="middle" style={AccountSetupCardBack}>
                    <div class="theme-default animated fadeIn" style={CardLarge}>
                        <div style={CardChild}>
                            <img src="./images/create_account.png" atl="create_account.png" height="60" />
                            <div class="type-h3" style={CardTitle}>
                                Create Account
                                </div>
                            <div class="type-sh3">
                                Just one more step, and you're done!
                                </div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="row">
                                    <div class="col-md-24">
                                        <div class="form-group">
                                            <label class="control-label">First Name</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="FirstName" autocomplete="off"
                                                value={this.state.FirstName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.FirstName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">Last Name</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="LastName" autocomplete="off"
                                                value={this.state.LastName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.LastName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">Secret Code</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" class="form-control" name="AdministratorSecret" autocomplete="off"
                                                value={this.state.AdministratorSecret} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.AdministratorSecret}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Create" class="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.ShowPreloader ? <Preloader /> : null}
            </section>;
        }
    }
};

export default SetupAdministratorAccount;