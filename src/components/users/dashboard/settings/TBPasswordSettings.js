import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import jsonWebToken from "jsonwebtoken";

import { passwordSettings } from "../../TraderFunctions";
import MessageBox from "../../../../controls/MessageBox";

class TBPasswordSettings extends Component {
    constructor() {
        super();

        this.state = {
            Password: "",
            CurrentPassword: "",
            NewPassword: "",
            ConfirmPassword: "",

            ValidCurrentPassword: false,
            ValidNewPassword: false,
            ValidConfirmPassword: false,

            ValidForm: true,
            MessageBox: "",

            Errors: {
                CurrentPassword: "",
                NewPassword: "",
                ConfirmPassword: "",
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const decoded = jwt_decode(localStorage.userToken);

            this.setState({
                Password: decoded.Password,
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
        let ValidCurrentPassword = this.state.ValidCurrentPassword;
        let ValidNewPassword = this.state.ValidNewPassword;
        let ValidConfirmPassword = this.state.ValidConfirmPassword;

        switch (field) {
            case "CurrentPassword":
                await axios.post("https://naqelserver.azurewebsites.net/users/validatePassword", {
                    TraderID: jwt_decode(localStorage.userToken).TraderID,
                    Password: value,
                })
                    .then(res => {
                        if (res.data === "Valid password.") {
                            ValidCurrentPassword = true;
                        }
                        else {
                            ValidCurrentPassword = false;
                        }
                    });

                Errors.CurrentPassword = ValidCurrentPassword ? "" : "Current password is invalid.";
                break;
            case "NewPassword":
                ValidNewPassword = value.length >= 6;
                Errors.NewPassword = ValidNewPassword ? "" : "Password is too short.";
                break;
            case "ConfirmPassword":
                ValidConfirmPassword = value === this.state.NewPassword;
                Errors.ConfirmPassword = ValidConfirmPassword ? "" : "Passwords did not match.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidCurrentPassword: ValidCurrentPassword,
            ValidNewPassword: ValidNewPassword,
            ValidConfirmPassword: ValidConfirmPassword,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidCurrentPassword &&
                    this.state.ValidNewPassword &&
                    this.state.ValidConfirmPassword
            });
        });
    }

    onSubmit = async e => {
        e.preventDefault();

        const updatedDriver = {
            TraderID: jwt_decode(localStorage.userToken).TraderID,
            Password: this.state.NewPassword,
        }

        await passwordSettings(updatedDriver)
            .then(res => {
                if (res === "Trader/Broker is updated.") {
                    let decodedToken = jwt_decode(localStorage.userToken);
                    decodedToken["Password"] = this.state.Password;
                    let token = jsonWebToken.sign(decodedToken, "mysecret");
                    localStorage.setItem("userToken", token);

                    this.setState({
                        MessageBox: (<MessageBox Message="Settings saved successfully." Show={true} />),
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF" }}>Change Password</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div class="entity-list entity-list-expandable">
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-key"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="password" name="CurrentPassword" class="form-control" autocomplete="off"
                                        value={this.state.CurrentPassword} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Current Password</div>
                                <div class="text-danger">{this.state.Errors["CurrentPassword"]}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-key"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="password" name="NewPassword" class="form-control" autocomplete="off"
                                        value={this.state.NewPassword} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">New Password</div>
                                <div class="text-danger">{this.state.Errors["NewPassword"]}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fa fa-key"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="password" name="ConfirmPassword" class="form-control" autocomplete="off"
                                        value={this.state.ConfirmPassword} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Confirm Password</div>
                                <div class="text-danger">{this.state.Errors["ConfirmPassword"]}</div>
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

                {this.state.MessageBox}
            </div>
        );
    }
};

export default TBPasswordSettings;