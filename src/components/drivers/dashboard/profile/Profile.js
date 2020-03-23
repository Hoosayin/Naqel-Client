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
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group" style={{ marginBottom: "5px", }}>
                                    <ProfilePhoto OnImageUploaded={this.onImageUploaded} />
                                </div>
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                    {this.state.FirstName + " " + this.state.LastName}
                                    </div>
                                <div className="type-sh3">
                                    <span className="fas fa-car"></span>   Driver
                                    </div>
                                <div>
                                    <ol className="list-items theme-alt">
                                        <li className="list-items-row">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><span className="fas fa-at" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div className="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Username:</a>
                                                </div>
                                                <div className="col-md-6">
                                                    {this.state.Username}
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-items-row">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><span className="fas fa-envelope" style={{ color: "#008575", }}></span></strong>
                                                </div>
                                                <div className="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Email:</a>
                                                </div>
                                                <div className="col-md-6">
                                                    {this.state.Email}
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-items-row">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <strong><span className="fas fa-phone" style={{ color: "#008575" }}></span></strong>
                                                </div>
                                                <div className="col-md-6">
                                                    <a style={{ textDecoration: "none", }}>Phone Number:</a>
                                                </div>
                                                <div className="col-md-6">
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
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#00221E" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="type-h3" style={{ paddingTop: "10px", }}>
                                    Details
                                    </div>
                                <ol className="list-items theme-alt">
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className="fas fa-birthday-cake" style={{ color: "#008575", }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Date of Birth:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.DateOfBirth}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                {this.state.Gender === "Male" &&
                                                    <strong><span className="fas fa-male" style={{ color: "#008575", }}></span></strong>
                                                }
                                                {this.state.Gender === "Female" &&
                                                    <strong><span className="fas fa-female" style={{ color: "#008575", }}></span></strong>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Gender:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.Gender}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className="fas fa-flag" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Nationality:</a>
                                            </div>
                                            <div className="col-md-4">
                                                {this.state.Nationality}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-items-row">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <strong><span className="fas fa-map-marker" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div className="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Address:</a>
                                            </div>
                                            <div className="col-md-4">
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