import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

import {
    EmailConfirmationCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class EmailConfirmation extends Component {
    constructor() {
        super();

        this.state = {
            NewCredentials: jwt_decode(localStorage.newCredentialsToken),
            ConfirmationCode: 0,

            ValidConfirmationCode: false,
            ValidForm: false,

            Errors: {
                ConfirmationCode: ""
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
        let ValidConfirmationCode = this.state.ValidConfirmationCode;

        switch (field) {
            case "ConfirmationCode":
                ValidConfirmationCode = (value !== "");
                Errors.ConfirmationCode = ValidConfirmationCode ? "" : "Confirmation code is required.";

                if (Errors.ConfirmationCode !== "") {
                    break;
                }

                ValidConfirmationCode = (value === "12345" /*this.state.NewCredentials.Code*/);
                Errors.ConfirmationCode = ValidConfirmationCode ? "" : "Invalid code.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidConfirmationCode: ValidConfirmationCode
        }, () => {
            this.setState({
                ValidForm: this.state.ValidConfirmationCode
            });
        });
    }

    onSubmit = event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        localStorage.setItem("verifiedCredentialsToken", localStorage.newCredentialsToken);
        localStorage.removeItem("newCredentialsToken");

        if (this.state.NewCredentials.RegisterAs === "Administrator") {
            this.props.history.push("/setupAdministratorAccount");
        }
        else if (this.state.NewCredentials.RegisterAs === "TC Responsible") {
            this.props.history.push("/setupTransportCompanyResponsibleAccount");
        }
        else {
            this.props.history.push("/setupAccount");
        }
    }

    render() {
        if (!localStorage.newCredentialsToken) {
            return <Redirect to={"/register"} />;
        }
        else {
            return <div class="middle" style={EmailConfirmationCardBack}>
                <div class="theme-default animated fadeIn" style={Card}>
                    <div style={CardChild}>
                        <img src="./images/passcode.png" alt="passcode.png" height="60" />
                        <div class="type-h3" style={CardTitle}>Email Confirmation</div>
                        <div class="type-sh3">We delivered a confirmation code to your email.</div>
                        <br />
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label htmlFor="ConfirmationCode" class="control-label">Confirmation Code</label>
                                <span class="text-danger m-l-xxxs">*</span>
                                <input htmlFor="ConfirmationCode" type="text" name="ConfirmationCode" class="form-control"
                                    value={this.state.ConfirmationCode} onChange={this.onChange} />
                                <span class="text-danger">{this.state.Errors.ConfirmationCode}</span>
                            </div>
                            <input type="submit" value="Next" class="btn btn-primary" disabled={!this.state.ValidForm} />
                        </form>
                    </div>
                </div>
            </div>;
        }
    }
};

export default EmailConfirmation;