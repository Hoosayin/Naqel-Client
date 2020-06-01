import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setupTransportCompanyResponsibleAccount } from "../transportCompanyResponsibles/TransportCompanyResponsiblesFunctions";

import {
    AccountSetupCardBack,
    CardLarge,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class SetupTransportCompanyResponsibleAccount extends Component {
    constructor() {
        super();

        this.state = {
            Name: "",
            PhoneNumber: "",

            ValidName: false,
            ValidPhoneNumber: false,

            ValidForm: false,

            Errors: {
                Name: "",
                PhoneNumber: "",
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
        let {
            Errors,
            ValidName,
            ValidPhoneNumber
        } = this.state;

        switch (field) {
            case "Name":
                ValidName = (value !== "");
                Errors.Name = ValidName ? "" : "Company name is required.";

                if (Errors.Name !== "") {
                    break;
                }

                ValidName = (value.match(/^[a-zA-Z ]+$/));
                Errors.Name = ValidName ? "" : "Company name is invalid.";
                break;
            case "PhoneNumber":
                ValidPhoneNumber = (value !== "");
                Errors.PhoneNumber = ValidPhoneNumber ? "" : "Phone number is required.";

                if (Errors.PhoneNumber !== "") {
                    break;
                }

                ValidPhoneNumber = value.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/);
                Errors.PhoneNumber = ValidPhoneNumber ? "" : "Phone number is invalid.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidName: ValidName,
            ValidPhoneNumber: ValidPhoneNumber
        }, () => {
                this.setState({
                    ValidForm: ValidName &&
                        ValidPhoneNumber
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (localStorage.verifiedCredentialsToken) {
            const verifiedCredentials = jwt_decode(localStorage.verifiedCredentialsToken);

            const newTransportCompanyResponsible = {
                Username: verifiedCredentials.Username,
                Email: verifiedCredentials.Email,
                Password: verifiedCredentials.Password,
                RegisterAs: verifiedCredentials.RegisterAs,
                Name: this.state.Name,
                PhoneNumber: this.state.PhoneNumber
            }

            await setupTransportCompanyResponsibleAccount(newTransportCompanyResponsible).then(response => {
                if (response.Message === "Transport company responsible created.") {
                    localStorage.removeItem("verifiedCredentialsToken");
                    localStorage.setItem("IsCreatedSuccessfully", true);

                    this.props.history.push("/congratulations");
                }
            });
        }
    }

    render() {
        if (!localStorage.verifiedCredentialsToken) {
            return <Redirect to={"/register"} />;
        }
        else {
            return <div class="middle" style={AccountSetupCardBack}>
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
                                        <label class="control-label">Company Name</label>
                                        <span class="text-danger m-l-xxxs">*</span>
                                        <input type="text" className="form-control" name="Name" autocomplete="off"
                                            value={this.state.Name} onChange={this.onChange} />
                                        <span class="text-danger">{this.state.Errors.FirstName}</span>
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="PhoneNumber" class="control-label">Phone Number</label>
                                        <span class="text-danger m-l-xxxs">*</span>
                                        <input type="text" className="form-control" name="PhoneNumber" autocomplete="off"
                                            placeholder="+XXXXXXXXXXXX" value={this.state.PhoneNumber} onChange={this.onChange} />
                                        <span class="text-danger">{this.state.Errors.PhoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="submit" value="Create" class="btn btn-primary" disabled={!this.state.ValidForm} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>;
        }
    }
};

export default SetupTransportCompanyResponsibleAccount;