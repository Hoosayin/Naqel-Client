import React, { Component } from "react";
import jwt_decode from "jwt-decode"; 
import { Required } from "../styles/MiscellaneousStyles";

import {
    EmailConfirmationCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../styles/CardStyles";

class EmailConfirmation extends Component {
    constructor() {
        super();

        this.state = {
            ConfirmationCode: 0,
            NullError: false,
            InvalidCodeError: false,
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

        const code = jwt_decode(localStorage.newCredentialsToken).Code; 

        if (this.state.ConfirmationCode === "") {

            this.setState({
                NullError: true,
                InvalidCodeError: false,
            });

            return;
        }
        else if (this.state.ConfirmationCode != code) {

            this.setState({
                NullError: false,
                InvalidCodeError: true,
            });

            return;
        }
        else {
            localStorage.setItem("verifiedCredentialsToken", localStorage.newCredentialsToken);
            localStorage.removeItem("newCredentialsToken");
            this.props.history.push(`/accountSetup`);
        }
    }

    render() {
        if (!localStorage.newCredentialsToken) {
            this.props.history.push(`/register`);
            return <a />
        }
        else {
            return (
                <div class="middle" style={EmailConfirmationCardBack}>
                    <div class="theme-default animated fadeIn" style={Card}>
                        <div style={CardChild}>
                            <img src="./images/passcode.png" alt="passcode.png" height="60" />
                            <div class="type-h3" style={CardTitle}>
                                Email Confirmation
                </div>
                            <div class="type-sh3">
                                We delivered a confirmation code to your email.
                </div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="ConfirmationCode" class="control-label">Confirmation Code</label>
                                    <span class="text-danger" style={Required}>*</span>
                                    <input htmlFor="ConfirmationCode" type="text" name="ConfirmationCode" class="form-control"
                                        value={this.state.ConfirmationCode} onChange={this.onChange} />
                                </div>
                                <div class="form-group">
                                    {this.state.NullError &&
                                        <div>
                                            <label class="control-label text-danger">Confirmation code is required.</label>
                                            <br />
                                        </div>
                                    }
                                    {this.state.InvalidCodeError &&
                                        <div>
                                            <label class="control-label text-danger">Invalid code.</label>
                                            <br />
                                        </div>
                                    }
                                </div>
                                <input type="submit" value="Next" class="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default EmailConfirmation;