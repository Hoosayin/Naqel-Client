import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { validatePassword, passwordSettings } from "../../../AdministratorFunctions";

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
            ShowPreloader: false,

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
                break;
            case "NewPassword":
                ValidNewPassword = value.length >= 6;
                Errors.NewPassword = ValidNewPassword ? "" : "Password is too short.";

                if (Errors.NewPassword !== "") {
                    break;
                }

                ValidConfirmPassword = value === this.state.ConfirmPassword;
                Errors.ConfirmPassword = ValidConfirmPassword ? "" : "Passwords did not match.";
                break;
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
                let errors = this.state.Errors;
                errors.CurrentPassword = response.Message;

                this.setState({
                    Errors: errors
                });
            }
            else {
                this.setState({
                    ShowPreloader: true
                });

                const updatedAdministrator = {
                    Token: localStorage.Token,
                    Password: this.state.NewPassword
                };

                await passwordSettings(updatedAdministrator).then(response => {
                    this.setState({
                        ShowPreloader: false,
                        CurrentPassword: "",
                        NewPassword: "",
                        ConfirmPassword: ""
                    });

                    if (response.Message === "Administrator is updated.") {
                        this.props.OnSettingsSaved();
                    }
                });
            }
        });
    }

    render() {
        const {
            CurrentPassword,
            NewPassword,
            ConfirmPassword,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
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
                                    value={CurrentPassword} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Current Password</div>
                            <div className="text-danger">{Errors.CurrentPassword}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-key"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="password" name="NewPassword" className="form-control" autoComplete="off"
                                    value={NewPassword} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">New Password</div>
                            <div className="text-danger">{Errors.NewPassword}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-key"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="password" name="ConfirmPassword" className="form-control" autoComplete="off"
                                    value={ConfirmPassword} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Confirm Password</div>
                            <div className="text-danger">{Errors.ConfirmPassword}</div>
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
                            <input type="submit" value="Save" className="btn btn-primary" disabled={!ValidForm} />
                        </div>
                    </div>
                </div>
            </form>

            {ShowPreloader ? <Preloader /> : null}
        </section>;
    }
};

export default PasswordSettings;