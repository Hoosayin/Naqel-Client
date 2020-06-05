import React, { Component } from "react";
import firebase from "firebase";
import FirebaseApp from "../../../../res/FirebaseApp";
import Preloader from "../../../../controls/Preloader";
import PhoneConfirmationDialog from "../../../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import { getData, generalSettings } from "../../DriverFunctions";

class GeneralSettings extends Component {
    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            Address: "",
            PhoneNumber: "",
            Gender: "",
            Nationality: "",
            DateOfBirth: "",

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
            },
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
                Get: "Driver"
            };

            await getData(request).then(response => {
                if (response.Message === "Driver found.") {
                    let driver = response.Driver;

                    this.setState({
                        FirstName: driver.FirstName,
                        LastName: driver.LastName,
                        Address: driver.Address,
                        PhoneNumber: driver.PhoneNumber,
                        Gender: driver.Gender,
                        Nationality: driver.Nationality,
                        DateOfBirth: driver.DateOfBirth
                    });
                }
                else {
                    this.setState({
                        FirstName: "",
                        LastName: "",
                        Address: "",
                        PhoneNumber: "",
                        Gender: "",
                        Nationality: "",
                        DateOfBirth: ""
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

        if (this.state.PhoneCodeVerified) {
            const updatedDriver = {
                Token: localStorage.Token,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Address: this.state.Address,
                PhoneNumber: this.state.PhoneNumber,
                Gender: this.state.Gender,
                Nationality: this.state.Nationality,
                DateOfBirth: this.state.DateOfBirth
            };

            await generalSettings(updatedDriver).then(response => {
                this.setState({
                    ShowPreloader: false
                });

                if (response.Message === "Driver is updated.") {
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
        return <section>
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
                                    value={this.state.FirstName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">First Name</div>
                            <div className="text-danger">{this.state.Errors.FirstName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-comment"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="LastName" autoComplete="off"
                                    value={this.state.LastName} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Last Name</div>
                            <div className="text-danger">{this.state.Errors.LastName}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-birthday-cake"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="date" className="form-control" name="DateOfBirth" autoComplete="off"
                                    value={this.state.DateOfBirth} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Date of Birth</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className={this.state.Gender === "Male" ? "fas fa-male" : "fas fa-female"}></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="dropdown" style={{ width: "193px", maxWidth: "296px", }}>
                                <button id="example-dropdown" className="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                    aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                    <span>{this.state.Gender}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                    <li><a onClick={() => { this.setState({ Gender: "Male" }); }}>Male</a></li>
                                    <li><a onClick={() => { this.setState({ Gender: "Female" }); }}>Female</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Gender</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-flag"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Nationality" autoComplete="off"
                                    value={this.state.Nationality} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Nationality</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-phone"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="PhoneNumber" autoComplete="off"
                                    placeholder="+XXXXXXXXXXXX" value={this.state.PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Phone Number</div>
                            <div className="text-danger">{this.state.Errors.PhoneNumber}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-location-arrow"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="Address" autoComplete="off"
                                    value={this.state.Address} onChange={this.onChange} style={{ width: "393px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">Address</div>
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
            {this.state.ShowPreloader ? <Preloader /> : null}
        </section>;
    }
};

export default GeneralSettings;