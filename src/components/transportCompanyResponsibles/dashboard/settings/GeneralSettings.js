import React, { Component } from "react";
import firebase from "firebase";
import FirebaseApp from "../../../../res/FirebaseApp";
import Preloader from "../../../../controls/Preloader";
import PhoneConfirmationDialog from "../../../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import { getData, generalSettings } from "../../TransportCompanyResponsiblesFunctions";

class GeneralSettings extends Component {
    constructor() {
        super();

        this.state = {
            Name: "",
            PhoneNumber: "",

            ValidName: true,
            ValidPhoneNumber: true,

            ConfirmationResult: null,
            PhoneCodeVerified: false,

            ValidForm: false,
            SettingsSaved: false,
            ShowPreloader: false,

            Errors: {
                FirstName: "",
                LastName: "",
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
                Get: "TransportCompanyResponsible"
            };

            await getData(request).then(response => {
                if (response.Message === "Transport company responsible found.") {
                    let transportCompanyResponsible = response.TransportCompanyResponsible;

                    this.setState({
                        Name: transportCompanyResponsible.Name,
                        PhoneNumber: transportCompanyResponsible.PhoneNumber
                    });
                }
                else {
                    this.setState({
                        Name: "",
                        PhoneNumber: ""
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
        let {
            Errors,
            ValidName,
            ValidPhoneNumber
        } = this.state;

        switch (field) {
            case "Name":
                ValidName = (value !== "");
                Errors.Name = ValidName ? "" : "Company name is required.";

                if (Errors.Name !== "") {
                    break;
                }

                ValidName = (value.match(/^[a-zA-Z ]+$/));
                Errors.Name = ValidName ? "" : "Company name is invalid.";
                break;
            case "PhoneNumber":
                ValidPhoneNumber = (value !== "");
                Errors.PhoneNumber = ValidPhoneNumber ? "" : "Phone number is required.";

                if (Errors.PhoneNumber !== "") {
                    break;
                }

                ValidPhoneNumber = value.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/);
                Errors.PhoneNumber = ValidPhoneNumber ? "" : "Phone number is invalid.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidName: ValidName,
            ValidPhoneNumber: ValidPhoneNumber
        }, () => {
            this.setState({
                ValidForm: ValidName &&
                    ValidPhoneNumber
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

        if (this.state.PhoneCodeVerified) {
            const updatedTransportCompanyResponsible = {
                Token: localStorage.Token,
                Name: this.state.Name,
                PhoneNumber: this.state.PhoneNumber
            };

            await generalSettings(updatedTransportCompanyResponsible).then(response => {
                this.setState({
                    ShowPreloader: false
                });

                if (response.Message === "Transport company responsible is updated.") {
                    this.props.OnSettingsSaved();
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
                    Errors: Errors
                });
            });
        }
    }

    render() {
        const {
            Name,
            PhoneNumber,
            ConfirmationResult,
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
                                <input type="text" className="form-control" name="Name" autoComplete="off"
                                    value={Name} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Company Name</div>
                            <div className="text-danger">{Errors.Name}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-phone"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="PhoneNumber" autocomplete="off"
                                    placeholder="+XXXXXXXXXXXX" value={PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
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
            <PhoneConfirmationDialog ConfirmationResult={ConfirmationResult}
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