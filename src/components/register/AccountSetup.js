import React, { Component } from "react";
import { setupDriverAccount } from "../drivers/DriverFunctions";
import { setupTraderAccount } from "../traders/TraderFunctions";
import { Required } from "../../styles/MiscellaneousStyles";
import jwt_decode from "jwt-decode";

import {
    AccountSetupCardBack,
    CardLarge,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class AccountSetup extends Component {
    constructor() {
        super();

        this.state = {
            Username: "",
            Email: "",
            Password: "",
            RegisterAs: "",

            FirstName: "",
            LastName: "",
            DateOfBirth: "",
            Gender: "Male",
            Nationality: "",
            Address: "",
            PhoneNumber: "",

            ValidFirstName: false,
            ValidLastName: false,
            ValidDateOfBirth: false,
            ValidNationality: false,
            ValidAddress: false,
            ValidPhoneNumber: false,

            ValidForm: false,

            Errors: {
                FirstName: "",
                LastName: "",
                DateOfBirth: "",
                Nationality: "",
                Address: "",
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
        let Errors = this.state.Errors;
        let ValidFirstName = this.state.ValidFirstName;
        let ValidLastName = this.state.ValidLastName;
        let ValidDateOfBirth = this.state.ValidDateOfBirth;
        let ValidNationality = this.state.ValidNationality;
        let ValidAddress = this.state.ValidAddress;
        let ValidPhoneNumber = this.state.ValidPhoneNumber;

        switch (field) {
            case "FirstName":
                ValidFirstName = ((value !== "") &&
                    (value.match(/^[a-zA-Z ]+$/)));
                Errors.FirstName = ValidFirstName ? "" : "First name is invalid.";
                break;
            case "LastName":
                ValidLastName = ((value !== "") &&
                    (value.match(/^[a-zA-Z ]+$/)));
                Errors.LastName = ValidLastName ? "" : "Last name is invalid.";
                break;
            case "DateOfBirth":
                ValidDateOfBirth = (new Date(value) < new Date());
                Errors.DateOfBirth = ValidDateOfBirth ? "" : "Your Birthday must be earlier than today.";
                break;
            case "Nationality":
                ValidNationality = ((value !== "") &&
                    (value.match(/^[a-zA-Z ]+$/)));
                Errors.Nationality = ValidNationality ? "" : "Nationality is invalid.";
                break;
            case "Address":
                ValidAddress = (value !== "");
                Errors.Address = ValidAddress ? "" : "Address is required.";
                break;
            case "PhoneNumber":
                ValidPhoneNumber = value.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/);
                Errors.PhoneNumber = ValidPhoneNumber ? "" : "Phone number is invalid.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidFirstName: ValidFirstName,
            ValidLastName: ValidLastName,
            ValidDateOfBirth: ValidDateOfBirth,
            ValidNationality: ValidNationality,
            ValidAddress: ValidAddress,
            ValidPhoneNumber: ValidPhoneNumber
        }, () => {
            this.setState({
                ValidForm: this.state.ValidFirstName &&
                    this.state.ValidLastName &&
                    this.state.ValidDateOfBirth &&
                    this.state.ValidNationality &&
                    this.state.ValidAddress &&
                    this.state.ValidPhoneNumber
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (localStorage.verifiedCredentialsToken) {
            const decoded = jwt_decode(localStorage.verifiedCredentialsToken);
            this.state.Username = decoded.Username;
            this.state.Email = decoded.Email;
            this.state.Password = decoded.Password;
            this.state.RegisterAs = decoded.RegisterAs;
        }

        const newUser = {
            Username: this.state.Username,
            Email: this.state.Email,
            Password: this.state.Password,
            RegisterAs: this.state.RegisterAs,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            DateOfBirth: this.state.DateOfBirth,
            Gender: this.state.Gender,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            Nationality: this.state.Nationality,
        }

        if (newUser.RegisterAs == "Driver") {
            await setupDriverAccount(newUser).then(response => {
                localStorage.removeItem("verifiedCredentialsToken");
                localStorage.setItem("IsCreatedSuccessfully", true);
                this.props.history.push("/congratulations");
            });
        }
        if (newUser.RegisterAs == "Trader" || newUser.RegisterAs == "Broker") {
            await setupTraderAccount(newUser).then(response => {
                localStorage.removeItem("verifiedCredentialsToken");
                localStorage.setItem("IsCreatedSuccessfully", true);
                this.props.history.push("/congratulations");
            });
        }
    }

    render() {
        if (!localStorage.verifiedCredentialsToken) {
            this.props.history.push("/register");
            return <a />
        }
        else {
            return (
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
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="FirstName" class="control-label">First Name</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="FirstName" autocomplete="off"
                                                value={this.state.FirstName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.FirstName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="LastName" class="control-label">Last Name</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="LastName" autocomplete="off"
                                                value={this.state.LastName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.LastName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="DateOfBirth" class="control-label">Date of Birth</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="date" class="form-control" name="DateOfBirth" autocomplete="off"
                                                value={this.state.DateOfBirth} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.DateOfBirth}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="Gender" class="control-label">Gender</label>
                                            <div class="dropdown" style={{ width: "193px", maxWidth: "296px", }}>
                                                <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                    aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                    <span>{this.state.Gender}</span>
                                                    <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                    <li><a onClick={() => { this.setState({ Gender: "Male" }); }}>Male</a></li>
                                                    <li><a onClick={() => { this.setState({ Gender: "Female" }); }}>Female</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="Nationality" class="control-label">Nationality</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="Nationality" autocomplete="off"
                                                value={this.state.Nationality} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.Nationality}</span>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="PhoneNumber" class="control-label">Phone Number</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="PhoneNumber" autocomplete="off"
                                                placeholder="+XXXXXXXXXXXX" value={this.state.PhoneNumber} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.PhoneNumber}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="Address" class="control-label">Address</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <textarea class="form-control" rows="5" name="Address" autocomplete="off"
                                                value={this.state.Address} onChange={this.onChange}></textarea>
                                            <span class="text-danger">{this.state.Errors.Address}</span>
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
            );
        }
    }
};

export default AccountSetup;