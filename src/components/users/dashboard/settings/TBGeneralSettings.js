import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import jsonWebToken from "jsonwebtoken";

import { generalSettings } from "../../TraderFunctions";
import MessageBox from "../../../../controls/MessageBox";

class TBGeneralSettings extends Component {
    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            Address: "",
            PhoneNumber: "",
            Gender: "",
            Nationality: "",
            DateOfBirth: "",

            ValidFirstName: true,
            ValidLastName: true,
            ValidPhoneNumber: true,

            ValidForm: true,
            SettingsSaved: false,

            Errors: {
                FirstName: "",
                LastName: "",
                PhoneNumber: "",
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const decoded = jwt_decode(localStorage.userToken);

            this.setState({
                FirstName: decoded.FName,
                LastName: decoded.LName,
                DateOfBirth: decoded.BirthDate,
                Gender: decoded.Gender,
                Address: decoded.Address,
                PhoneNumber: decoded.MobileNum,
                Nationality: decoded.Nationality,

            });
        }
        else {
            this.setState({
                FirstName: "",
                LastName: "",
                Address: "",
                PhoneNumber: "",
                Gender: "",
                Nationality: "",
                DateOfBirth: "",
            });
        }
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidFirstName = this.state.ValidFirstName;
        let ValidLastName = this.state.ValidLastName;
        let ValidPhoneNumber = this.state.ValidPhoneNumber;

        switch (field) {
            case "FirstName":
                ValidFirstName = value.match(/^[a-zA-Z ]+$/);
                Errors.FirstName = ValidFirstName ? "" : "First name is invalid.";
                break;
            case "LastName":
                ValidLastName = value.match(/^[a-zA-Z ]+$/);
                Errors.LastName = ValidLastName ? "" : "Last name is invalid.";
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
            ValidPhoneNumber: ValidPhoneNumber,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidFirstName &&
                    this.state.ValidLastName &&
                    this.state.ValidPhoneNumber
            });
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const updatedDriver = {
            TraderID: jwt_decode(localStorage.userToken).TraderID,
            FName: this.state.FirstName,
            LName: this.state.LastName,
            Address: this.state.Address,
            MobileNum: this.state.PhoneNumber,
            Gender: this.state.Gender,
            Nationality: this.state.Nationality,
            BirthDate: this.state.DateOfBirth,
        }

        generalSettings(updatedDriver)
            .then(res => {
                let decodedToken = jwt_decode(localStorage.userToken);

                decodedToken["FName"] = this.state.FirstName;
                decodedToken["LName"] = this.state.LastName;
                decodedToken["Address"] = this.state.Address;
                decodedToken["MobileNum"] = this.state.PhoneNumber;
                decodedToken["Gender"] = this.state.Gender;
                decodedToken["Nationality"] = this.state.Nationality;
                decodedToken["BirthDate"] = this.state.DateOfBirth;

                let token = jsonWebToken.sign(decodedToken, "mysecret");
                localStorage.setItem("userToken", token);

                this.setState({
                    SettingsSaved: true,
                });
            });
    }

    render() {
        const messageBox = (<MessageBox Message="Settings saved successfully." Show={true} />);

        return (
            <div>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>General Settings</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div class="entity-list entity-list-expandable">
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-signature"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" className="form-control" name="FirstName" autocomplete="off"
                                        value={this.state.FirstName} onChange={this.onChange} style={{ width: "193px", }} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">First Name</div>
                                <div class="text-danger">{this.state.Errors["FirstName"]}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-signature"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" className="form-control" name="LastName" autocomplete="off"
                                        value={this.state.LastName} onChange={this.onChange} style={{ width: "193px", }} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Last Name</div>
                                <div class="text-danger">{this.state.Errors["LastName"]}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-birthday-cake"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="date" class="form-control" name="DateOfBirth" autocomplete="off"
                                        value={this.state.DateOfBirth} onChange={this.onChange} style={{ width: "193px", }} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Date of Birth</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class={this.state.Gender === "Male" ? "fa fa-male" : "fa fa-female"}></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="dropdown" style={{ width: "193px", maxWidth: "296px", }}>
                                    <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                        aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                        <span>{this.state.Gender}</span>
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                        <li><Link onClick={e => { this.state.Gender = "Male" }} onChange={this.onChange}>Male</Link></li>
                                        <li><Link onClick={e => { this.state.Gender = "Female" }} onChange={this.onChange}>Female</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Gender</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-flag"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" className="form-control" name="Nationality" autocomplete="off"
                                        value={this.state.Nationality} onChange={this.onChange} style={{ width: "193px", }} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Nationality</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-phone"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" className="form-control" name="PhoneNumber" autocomplete="off"
                                        placeholder="+XXXXXXXXXXXX" value={this.state.PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Phone Number</div>
                                <div class="text-danger">{this.state.Errors["PhoneNumber"]}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-location-arrow"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" className="form-control" name="Address" autocomplete="off"
                                        value={this.state.Address} onChange={this.onChange} style={{ width: "393px", }} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Address</div>
                            </div>
                        </div>
                        <div class="entity-list-item active">
                            <div class="item-icon">
                                <span class="fa fa-save"></span>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Save Changes?</div>
                                <div class="content-text-secondary">This cannot be undone.</div>
                            </div>
                            <div class="item-content-expanded">
                                <input type="submit" value="Save" class="btn btn-primary" disabled={!this.state.ValidForm} />
                            </div>
                        </div>
                    </div>
                </form>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>

                {this.state.SettingsSaved && messageBox}
            </div>
        );
    }
};

export default TBGeneralSettings;