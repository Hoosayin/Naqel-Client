import React, { Component } from "react";
import { accountSetup } from "../users/DriverFunctions";
import { TraderAccountSetup } from "../users/TraderFunctions"
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
            Nationality: "",
            Address: "",
            PhoneNumber: "",
            NullError: false,
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

        if (this.state.FirstName === "" ||
            this.state.LastName === "" ||
            this.state.DateOfBirth === "" ||
            this.state.Nationality === "" ||
            this.state.Address === "" ||
            this.state.PhoneNumber === "") {

            this.setState({
                NullError: true,
            });

            return;
        }

        if (localStorage.verifiedCredentialsToken) {
            const decoded = jwt_decode(localStorage.verifiedCredentialsToken);
            this.state.Username = decoded.Username;
            this.state.Email = decoded.Email;
            this.state.Password = decoded.Password;
            this.state.RegisterAs = decoded.RegisterAs;
        }

        const newDriver = {
            Username: this.state.Username,
            Email: this.state.Email,
            Password: this.state.Password,
            RegisterAs: this.state.RegisterAs,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            DateOfBirth: this.state.DateOfBirth,
            Gender: this.refs.Gender.value,
            Address: this.state.Address,
            PhoneNumber: this.state.PhoneNumber,
            Nationality: this.state.Nationality,
        }

  
        if (newDriver.RegisterAs == "Driver") {
            accountSetup(newDriver)
                .then(res => {
                    localStorage.removeItem("verifiedCredentialsToken");
                    localStorage.setItem("IsCreatedSuccessfully", true);
                    this.props.history.push(`/congratulations`);
                });
        }
        if (newDriver.RegisterAs == "Trader" || newDriver.RegisterAs == "Broker") {
            TraderAccountSetup(newDriver)
                .then(res => {
                    localStorage.removeItem("verifiedCredentialsToken");
                    localStorage.setItem("IsCreatedSuccessfully", true);
                    this.props.history.push(`/congratulations`);
                });
        }

    }

    render() {
        if (!localStorage.verifiedCredentialsToken) {
            this.props.history.push(`/register`);
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
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="LastName" class="control-label">Last Name</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="LastName" autocomplete="off"
                                                value={this.state.LastName} onChange={this.onChange} />
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="DateOfBirth" class="control-label">Date of Birth</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="date" class="form-control" name="DateOfBirth" autocomplete="off"
                                                value={this.state.DateOfBirth} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="Gender" class="control-label">Gender</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <select ref="Gender" htmlFor="Gender" class="form-control">
                                                <option value="Male" selected>Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="Nationality" class="control-label">Nationality</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="Nationality" autocomplete="off"
                                                value={this.state.Nationality} onChange={this.onChange} />
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="PhoneNumber" class="control-label">Phone Number</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <input type="text" className="form-control" name="PhoneNumber"
                                                placeholder="+XXXXXXXXXXXX" value={this.state.PhoneNumber} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="Address" class="control-label">Address</label>
                                            <span class="text-danger" style={Required}>*</span>
                                            <textarea class="form-control" rows="5" name="Address" autocomplete="off"
                                                value={this.state.Address} onChange={this.onChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    {this.state.NullError &&
                                        <div>
                                            <label class="control-label text-danger">All fields are required.</label>
                                            <br />
                                        </div>
                                    }
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Create" class="btn btn-primary" />
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