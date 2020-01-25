import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import CodeConfirmation from "./CodeConfirmation";
import { usernameAndEmailSettings } from "./DriverFunctions";
import MessageBox from "./MessageBox";
import jsonWebToken from "jsonwebtoken";

class UsernameAndEmailSettings extends Component {
    constructor() {
        super();

        this.state = {
            Username: "",
            NewUsername: "",

            Email: "",
            NewEmail: "",

            Code: "",

            ValidNewUsername: true,
            ValidNewEmail: true,

            ValidForm: true,
            MessageBox: "",

            Errors: {
                NewUsername: "",
                NewEmail: "",
            },

            CodeConfirmation: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const decoded = jwt_decode(localStorage.userToken);

            this.setState({
                Username: decoded.Username,
                NewUsername: decoded.Username,
                Email: decoded.Email,
                NewEmail: decoded.Email,
            });
        }
        else {
            this.setState({
                Username: "",
                NewUsername: "",
                Email: "",
                NewEmail: "",
            });
        }
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    async validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidNewUsername = this.state.ValidNewUsername;
        let ValidNewEmail = this.state.ValidNewEmail;
        
        switch (field) {
            case "NewUsername":
                if (value === "") {
                    ValidNewUsername = false;
                    Errors.NewUsername = "Username is required.";
                    break;
                }

                if (!value.match(/^[a-z0-9]+$/i)) {
                    ValidNewUsername = false;
                    Errors.NewUsername = "Username is invalid.";
                    break;
                }

                if (value === this.state.Username) {
                    ValidNewUsername = true;
                    Errors.NewUsername = "";
                    break;
                }

                await axios.post("users/validateUsername", {
                    Username: value,
                })
                    .then(res => {
                        if (res.data === "Username is available.") {
                            ValidNewUsername = true;
                            Errors.NewUsername = "";
                        }
                        else {
                            ValidNewUsername = false;
                            Errors.NewUsername = res.data;
                        }
                    });
                break;
            case "NewEmail":
                if (value === "") {
                    ValidNewEmail = false;
                    Errors.NewEmail = "Email is required.";
                    break;
                }

                if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    ValidNewEmail = false;
                    Errors.NewEmail = "Email is invalid.";
                    break;
                }

                if (value === this.state.Email) {
                    ValidNewEmail = true;
                    Errors.NewEmail = "";
                    break;
                }

                await axios.post("users/validateEmail", {
                    Email: value,
                })
                    .then(res => {
                        if (res.data === "Email is already taken.") {
                            ValidNewEmail = false;
                            Errors.NewEmail = res.data;
                        }
                        else {
                            ValidNewEmail = true;
                            Errors.NewEmail = "";
                        }
                    });
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidNewUsername: ValidNewUsername,
            ValidNewEmail: ValidNewEmail,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidNewUsername &&
                    this.state.ValidNewEmail
            });
        });
    }

    onSubmit = async e => {
        e.preventDefault();

        if (this.state.NewUsername === this.state.Username &&
            this.state.NewEmail === this.state.Email) {
            return;
        }


        if (this.state.NewEmail === this.state.Email) {
            const updatedDriver = {
                DriverID: jwt_decode(localStorage.userToken).DriverID,
                Username: this.state.NewUsername,
                Email: this.state.NewEmail,
            };

            usernameAndEmailSettings(updatedDriver)
                .then(res => {
                    if (res === "Driver is updated.") {
                        let decodedToken = jwt_decode(localStorage.userToken);

                        decodedToken["Username"] = this.state.NewUsername;
                        decodedToken["Email"] = this.state.NewEmail;

                        let token = jsonWebToken.sign(decodedToken, "mysecret");
                        localStorage.setItem("userToken", token);

                        this.setState({
                            MessageBox: (<MessageBox Message="Username is updated successfully." Show={true} />),
                        });
                    }
                    else {
                        this.setState({
                            MessageBox: (<MessageBox Message="Settings could not be saved. Please try later." Show={true} />),
                        });
                    }
                });
        }
        else {
            await axios.post("users/sendCode", {
                Email: this.state.NewEmail,
            })
                .then(res => {
                    if (res) {
                        this.setState({
                            CodeConfirmation: (<CodeConfirmation Code={res.data} Show={true}
                                Username={this.state.NewUsername} Email={this.state.NewEmail} />),
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Username and Emails</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div class="entity-list entity-list-expandable">
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-at"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" name="NewUsername" class="form-control" autocomplete="off"
                                        value={this.state.NewUsername} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Username</div>
                                <div class="content-text-secondary text-danger">{this.state.Errors["NewUsername"]}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-envelope"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="email" name="NewEmail" class="form-control" placeholder="someone@example.com" autocomplete="off"
                                        value={this.state.NewEmail} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Email</div>
                                <div class="content-text-secondary text-danger">{this.state.Errors["NewEmail"]}</div>
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

                {this.state.CodeConfirmation}
                {this.state.MessageBox}
            </div> 
        );
    }
};

export default UsernameAndEmailSettings;