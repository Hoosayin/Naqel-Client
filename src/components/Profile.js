import React, { Component } from "react";
import jwt_decode from "jwt-decode";

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

    render() {
        return (
            <div>
                <div style={{ padding: "20px", backgroundColor: "#202020", }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <img class="animated slideInUp" src="./images/driver.png" alt="profile.jpg" height="60" />
                                <div class="type-h3 animated slideInUp" style={{ paddingTop: "10px", color: "#008575" }}>
                                    {`${this.state.FirstName} ${this.state.LastName}`}
                                </div>
                                <div class="type-sh3 animated slideInUp" style={{ color: "white" }}>
                                    <span class="fa fa-car"></span>   Driver
                                    </div>
                                <div class="type-sh5 animated slideInUp" style={{ color: "white" }}>
                                    {this.state.Email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="jumbotron theme-dark" style={{ backgroundColor: "#161616", }}>
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
                                                <strong><span class="fa fa-id-card" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Username:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.Username}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <strong><span class="fa fa-envelope" style={{ color: "#008575", }}></span></strong>
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Email:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.Email}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <strong><span class="fa fa-birthday-cake" style={{ color: "#008575", }}></span></strong>
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
                                                    <strong><span class="fa fa-male" style={{ color: "#008575", }}></span></strong>
                                                }
                                                {this.state.Gender === "Female" &&
                                                    <strong><span class="fa fa-female" style={{ color: "#008575", }}></span></strong>
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
                                                <strong><span class="fa fa-flag" style={{ color: "#008575" }}></span></strong>
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
                                                <strong><span class="fa fa-phone" style={{ color: "#008575" }}></span></strong>
                                            </div>
                                            <div class="col-md-4">
                                                <a style={{ textDecoration: "none", }}>Phone Number:</a>
                                            </div>
                                            <div class="col-md-4">
                                                {this.state.PhoneNumber}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-items-row">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <strong><span class="fa fa-map-marker" style={{ color: "#008575" }}></span></strong>
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
            </div>
        );
    }
};

export default Profile;