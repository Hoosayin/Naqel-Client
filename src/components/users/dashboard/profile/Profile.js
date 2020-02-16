import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import ProfilePhoto from "./ProfilePhoto";
import WarningAlert from "../../../../controls/WarningAlert";
import DocumentsList from "./documents/DocumentsList.js";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            Username: "",
            Password: "",
            Email: "",
            FirstName: "",
            LastName: "",
            Address: "",
            PhoneNumber: "",
            Gender: "",
            Nationality: "",
            DateOfBirth: "",

            WarningAlert: null,
            Errors: {}
        };
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const decoded = jwt_decode(localStorage.userToken);

            this.setState({
                Username: decoded.Username,
                Password: decoded.Password,
                Email: decoded.Email,
                FirstName: decoded.FirstName,
                LastName: decoded.LastName,
                DateOfBirth: decoded.DateOfBirth,
                Gender: decoded.Gender,
                Address: decoded.Address,
                PhoneNumber: decoded.PhoneNumber,
                Nationality: decoded.Nationality,
            });
        }
        else {
            this.setState({
                Username: "",
                Password: "",
                Email: "",
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

    onImageUploaded = message => {
        if (message) {
            this.setState({
                WarningAlert: (<WarningAlert Message={message} OnClose={this.onImageUploaded} />)
            });
        }
        else {
            this.setState({
                WarningAlert: null
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.WarningAlert}
                <div class="jumbotron theme-default">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group" style={{ marginBottom: "5px", }}>
                                    <ProfilePhoto OnImageUploaded={this.onImageUploaded} />
                                </div>
                            </div>
                            <div class="col-md-18">
                                <div class="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {this.state.FirstName + " " + this.state.LastName}
                                    </div>
                                <div class="type-sh3">
                                    <span class="fas fa-car"></span>   Driver
                                    </div>
                                <div>
                                    <ol class="list-items theme-alt">
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fas fa-at" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div class="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Username:</a>
                                                </div>
                                                <div class="col-md-6">
                                                    {this.state.Username}
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fas fa-envelope" style={{ color: "#008575", }}></span></strong>
                                                </div>
                                                <div class="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Email:</a>
                                                </div>
                                                <div class="col-md-6">
                                                    {this.state.Email}
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-items-row">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <strong><span class="fas fa-phone" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div class="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Phone Number:</a>
                                                </div>
                                                <div class="col-md-6">
                                                    {this.state.PhoneNumber}
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="jumbotron theme-alt" style={{ backgroundColor: "#00221E" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="type-h3" style={{ paddingTop: "10px", }}>
                                    Details
                                    </div>
                                <ol class="list-items theme-alt">
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <strong><span class="fas fa-birthday-cake" style={{ color: "#008575", }}></span></strong>
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Date of Birth:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.DateOfBirth}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                {this.state.Gender === "Male" &&
                                                    <strong><span class="fas fa-male" style={{ color: "#008575", }}></span></strong>
                                                }
                                                {this.state.Gender === "Female" &&
                                                    <strong><span class="fas fa-female" style={{ color: "#008575", }}></span></strong>
                                                }
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Gender:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.Gender}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <strong><span class="fas fa-flag" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Nationality:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.Nationality}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <strong><span class="fas fa-map-marker" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Address:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.Address}
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentsList />
                {this.state.AddDrivingLicenceDialog}
            </div>
        );
    }
};

export default Profile;