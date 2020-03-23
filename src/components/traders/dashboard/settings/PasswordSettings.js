import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader.js";
import { validatePassword, passwordSettings } from "../../TraderFunctions";

class PasswordSettings extends Component {
    constructor() {
        super();

        this.state = {
            CurrentPassword: "",
            NewPassword: "",
            ConfirmPassword: "",

            ValidCurrentPassword: false,
            ValidNewPassword: false,
            ValidConfirmPassword: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                CurrentPassword: "",
                NewPassword: "",
                ConfirmPassword: "",
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

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
                ValidCurrentPassword = (value !== "");
                Errors.CurrentPassword = ValidCurrentPassword ? "" : "Current password is required.";

                if (Errors.CurrentPassword !== "") {
                    break;
                }

                ValidCurrentPassword = (value !== "Invalid password.");
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

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        let passwordPackage = {
            Token: localStorage.Token,
            Password: this.state.CurrentPassword
        };

        await validatePassword(passwordPackage).then(async response => {
            if (response.Message === "Invalid password.") {
                this.validateField("CurrentPassword", response.Message);
            }
            else {
                const updatedTrader = {
                    Token: localStorage.Token,
                    Password: this.state.NewPassword
                };

                this.setState({
                    Preloader: <Preloader />
                });

                await passwordSettings(updatedTrader).then(response => {
                    if (response.Message === "Trader is updated.") {
                        this.props.OnSettingsSaved();
                    }

                    this.setState({
                        Preloader: null
                    });
                });
            }
        });
    }

    render() {
        return (
            <section>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF" }}>Change Password</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="entity-list entity-list-expandable">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-key"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="password" name="CurrentPassword" className="form-control" autoComplete="off"
                                        value={this.state.CurrentPassword} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Current Password</div>
                                <div className="text-danger">{this.state.Errors["CurrentPassword"]}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-key"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="password" name="NewPassword" className="form-control" autoComplete="off"
                                        value={this.state.NewPassword} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">New Password</div>
                                <div className="text-danger">{this.state.Errors["NewPassword"]}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-key"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="password" name="ConfirmPassword" className="form-control" autoComplete="off"
                                        value={this.state.ConfirmPassword} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Confirm Password</div>
                                <div className="text-danger">{this.state.Errors["ConfirmPassword"]}</div>
                            </div>
                        </div>
                        <div className="entity-list-item active">
                            <div className="item-icon">
                                <span className="fas fa-save"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Save Changes?</div>
                                <div className="content-text-secondary">This cannot be undone.</div>
                            </div>
                            <div className="item-content-expanded">
                                <input type="submit" value="Save" className="btn btn-primary" disabled={!this.state.ValidForm} />
                            </div>
                        </div>
                    </div>
                </form>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                {this.state.Preloader}
            </section>
        );
    }
};

export default PasswordSettings;