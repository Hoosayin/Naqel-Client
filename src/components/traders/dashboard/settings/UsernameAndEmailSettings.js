import React, { Component } from "react";
import CodeConfirmationDialog from "./CodeConfirmationDialog.js";
import Preloader from "../../../../controls/Preloader.js";
import {
    getData,
    validateUsername,
    validateEmail,
    sendCode,
    usernameAndEmailSettings
} from "../../TraderFunctions";

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
            Preloader: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Trader"
            };

            await getData(request).then(response => {
                if (response.Message === "Trader found.") {
                    let trader = response.Trader;

                    this.setState({
                        Username: trader.Username,
                        NewUsername: trader.Username,
                        Email: trader.Email,
                        NewEmail: trader.Email
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
            const updatedTrader = {
                Token: localStorage.Token,
                Username: this.state.NewUsername,
                Email: this.state.NewEmail,
            };

            this.setState({
                Preloader: <Preloader />
            });

            console.log("Going to update username.");
            await usernameAndEmailSettings(updatedTrader).then(response => {  
                console.log(response);
                if (response.Message === "Trader is updated.") {
                    
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
                console.log(response);
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
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Username and Emails</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="entity-list entity-list-expandable">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-at"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="text" name="NewUsername" className="form-control" autoComplete="off"
                                        value={this.state.NewUsername} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Username</div>
                                <div className="content-text-secondary text-danger">{this.state.Errors["NewUsername"]}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-envelope"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="email" name="NewEmail" className="form-control" placeholder="someone@example.com" autoComplete="off"
                                        value={this.state.NewEmail} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Email</div>
                                <div className="content-text-secondary text-danger">{this.state.Errors["NewEmail"]}</div>
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
                {this.state.CodeConfirmationDialog}
            </div> 
        );
    }
};

export default UsernameAndEmailSettings;