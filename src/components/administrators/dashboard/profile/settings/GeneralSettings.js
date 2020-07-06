import React, { Component } from "react";
import firebase from "firebase";
import FirebaseApp from "../../../../../res/FirebaseApp";
import Preloader from "../../../../../controls/Preloader";
import PhoneConfirmationDialog from "../../../../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import { getData, validatePhoneNumber, generalSettings } from "../../../AdministratorFunctions";

class GeneralSettings extends Component {
    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            OldPhoneNumber: "",
            PhoneNumber: "",

            ValidFirstName: true,
            ValidLastName: true,
            ValidPhoneNumber: true,

            ConfirmationResult: null,
            PhoneCodeVerified: false,

            ValidForm: false,
            SettingsSaved: false,
            ShowPreloader: false,

            Errors: {
                FirstName: "",
                LastName: "",
                PhoneNumber: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
            "size": "invisible",
            "callback": response => {
            }
        });

        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Administrator"
            };

            await getData(request).then(response => {
                if (response.Message === "Administrator found.") {
                    let administrator = response.Administrator;

                    this.setState({
                        FirstName: administrator.FirstName,
                        LastName: administrator.LastName,
                        OldPhoneNumber: administrator.PhoneNumber,
                        PhoneNumber: administrator.PhoneNumber,
                    });
                }
                else {
                    this.setState({
                        FirstName: "",
                        LastName: "",
                        OldPhoneNumber: "",
                        PhoneNumber: "",
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

    onSubmit = async event => {
        if (event) {
            event.preventDefault();
        }

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        if (this.state.PhoneNumber !== this.state.OldPhoneNumber) {
            const response = await validatePhoneNumber(this.state.PhoneNumber);

            if (response.Message === "Phone number is already used.") {
                let errors = this.state.Errors;
                errors.PhoneNumber = response.Message;

                this.setState({
                    ShowPreloader: false,
                    Errors: errors,
                    ValidForm: false,
                });

                return;
            }
        }

        if (this.state.PhoneCodeVerified) {
            const updatedAdministrator = {
                Token: localStorage.Token,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                PhoneNumber: this.state.PhoneNumber,
            };

            await generalSettings(updatedAdministrator).then(response => {
                if (response.Message === "Administrator is updated.") {
                    this.setState({
                        OldPhoneNumber: this.state.PhoneNumber,
                        ShowPreloader: false
                    });

                    this.props.OnSettingsSaved();
                }
                else {
                    this.setState({
                        ShowPreloader: false
                    });
                }
            });
        }
        else {
            const appVerifier = window.recaptchaVerifier;

            FirebaseApp.auth().languageCode = "en";
            FirebaseApp.auth().signInWithPhoneNumber(this.state.PhoneNumber, appVerifier).then(confirmationResult => {
                this.setState({
                    ShowPreloader: false,
                    ConfirmationResult: confirmationResult
                });

                this.SendCodeButton.click();
            }).catch(error => {
                let {
                    Errors
                } = this.state;

                Errors.PhoneNumber = error.message;

                this.setState({
                    ShowPreloader: false,
                    Errors: Errors,
                    ValidForm: false,
                });
            });
        }
    }

    render() {
        const {
            FirstName,
            LastName,
            PhoneNumber,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>General Settings</div>
            <form noValidate onSubmit={this.onSubmit}>
                <div className="entity-list entity-list-expandable">
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-comment"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="FirstName" autoComplete="off"
                                    value={FirstName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">First Name</div>
                            <div className="text-danger">{Errors.FirstName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-comment"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="LastName" autoComplete="off"
                                    value={LastName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Last Name</div>
                            <div className="text-danger">{Errors.LastName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-phone"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="PhoneNumber" autoComplete="off"
                                    placeholder="+699501234567" value={PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Phone Number</div>
                            <div className="text-danger">{Errors.PhoneNumber}</div>
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

            <button
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#phone-confirmation-dialog"
                ref={sendCodeButton => this.SendCodeButton = sendCodeButton}></button>
            <PhoneConfirmationDialog ConfirmationResult={this.state.ConfirmationResult}
                PhoneNumber={this.state.PhoneNumber}
                OnOK={phoneCodeVerified => {
                    if (phoneCodeVerified) {
                        this.setState({
                            PhoneCodeVerified: true
                        });

                        this.onSubmit();
                    }
                    else {
                        let {
                            Errors
                        } = this.state;

                        Errors.PhoneNumber = "Confirmation code is invalid.";

                        this.setState({
                            ValidForm: false,
                            Errors: Errors
                        });
                    }
                }} />
            <div id="recaptcha"></div>

            {ShowPreloader ? <Preloader /> : null}
        </section>;
    }
};

export default GeneralSettings;