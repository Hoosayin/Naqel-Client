import React, { Component } from "react";
import CodeConfirmationDialog from "./CodeConfirmationDialog.js";
import Preloader from "../../../../controls/Preloader.js";
import {
    getData,
    validateUsername,
    validateEmail,
    sendCode,
    usernameAndEmailSettings
} from "../../DriverFunctions.js";

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

            ValidForm: false,
            CodeConfirmationDialog: null,

            Errors: {
                NewUsername: "",
                NewEmail: "",
            },

            CodeConfirmation: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Driver"
            };

            await getData(request).then(response => {
                if (response.Message === "Driver found.") {
                    let driver = response.Driver;

                    this.setState({
                        Username: driver.Username,
                        NewUsername: driver.Username,
                        Email: driver.Email,
                        NewEmail: driver.Email
                    });
                }
                else {
                    this.setState({
                        Username: "",
                        NewUsername: "",
                        Email: "",
                        NewEmail: ""
                    });
                }
            });
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidNewUsername = this.state.ValidNewUsername;
        let ValidNewEmail = this.state.ValidNewEmail;

        switch (field) {
            case "NewUsername":
                ValidNewUsername = (value !== "");
                Errors.NewUsername = ValidNewUsername ? "" : "Username is required.";

                if (Errors.NewUsername != "") {
                    break;
                }

                ValidNewUsername = (value.match(/^[a-z0-9]+$/i));
                Errors.NewUsername = ValidNewUsername ? "" : "Username is invalid.";

                if (Errors.NewUsername != "") {
                    break;
                }

                ValidNewUsername = (value !== "Username is unavailable.");
                Errors.NewUsername = ValidNewUsername ? "" : "Username is unavailable.";
                break;
            case "NewEmail":
                ValidNewEmail = (value !== "");
                Errors.NewEmail = ValidNewEmail ? "" : "Email is required.";

                if (Errors.NewEmail != "") {
                    break;
                }

                ValidNewEmail = (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
                Errors.NewEmail = ValidNewEmail ? "" : "Email is invalid.";

                if (Errors.NewEmail != "") {
                    break;
                }

                ValidNewEmail = (value !== "Email is already taken.");
                Errors.NewEmail = ValidNewEmail ? "" : "Email is already taken.";
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

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (this.state.NewUsername === this.state.Username &&
            this.state.NewEmail === this.state.Email) {
            return;
        }

        if (this.state.NewUsername !== this.state.Username) {
            const response = await validateUsername(this.state.NewUsername);

            if (response.Message === "Username is unavailable.") {
                this.validateField("NewUsername", response.Message);
                return;
            }
        }

        if (this.state.NewEmail !== this.state.Email) {
            const response = await validateEmail(this.state.NewEmail);
            if (response.Message === "Email is already taken.") {
                this.validateField("NewEmail", response.Message);
                return;
            }
        }

        if (this.state.NewEmail === this.state.Email) {
            const updatedDriver = {
                Token: localStorage.Token,
                Username: this.state.NewUsername,
                Email: this.state.NewEmail,
            };

            this.setState({
                Preloader: <Preloader />
            });

            console.log("Going to update username...");
            await usernameAndEmailSettings(updatedDriver).then(response => {
                if (response.Message === "Driver is updated.") {
                    this.props.OnSettingsSaved();
                }

                this.setState({
                    Preloader: null
                });
            });
        }
        else {
            console.log("Going to send code...");
            await sendCode(this.state.NewEmail).then(response => {
                if (response.Message === "Code sent.") {
                    this.setState({
                        CodeConfirmationDialog: <CodeConfirmationDialog
                            Code={response.Code}
                            Username={this.state.NewUsername}
                            Email={this.state.NewEmail}
                            OnCancel={() => {
                                this.setState({
                                    CodeConfirmationDialog: null,
                                });
                            }}
                            OnOK={cancelButton => {
                                cancelButton.click();
                                this.props.OnSettingsSaved();
                            }} />
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
                                <span class="fas fa-at"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="text" name="NewUsername" class="form-control" autocomplete="off"
                                        value={this.state.NewUsername} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Username</div>
                                <div class="content-text-secondary text-danger">{this.state.Errors.NewUsername}</div>
                            </div>
                        </div>
                        <div class="entity-list-item">
                            <div class="item-icon">
                                <span class="fas fa-envelope"></span>
                            </div>
                            <div class="item-content-secondary">
                                <div class="form-group">
                                    <input type="email" name="NewEmail" class="form-control" placeholder="someone@example.com" autocomplete="off"
                                        value={this.state.NewEmail} onChange={this.onChange} />
                                </div>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Email</div>
                                <div class="content-text-secondary text-danger">{this.state.Errors.NewEmail}</div>
                            </div>
                        </div>
                        <div class="entity-list-item active">
                            <div class="item-icon">
                                <span class="fas fa-save"></span>
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
                {this.state.Preloader}
                {this.state.CodeConfirmationDialog}
            </div> 
        );
    }
};

export default UsernameAndEmailSettings;