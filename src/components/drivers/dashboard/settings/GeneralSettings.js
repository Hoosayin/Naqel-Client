import React, { Component } from "react";
import firebase from "firebase";
import FirebaseApp from "../../../../res/FirebaseApp";
import Preloader from "../../../../controls/Preloader";
import NationalitySelector from "../../../../controls/NationalitySelector";
import PhoneConfirmationDialog from "../../../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import { getData, validatePhoneNumber, generalSettings } from "../../DriverFunctions";

class GeneralSettings extends Component {
    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            Address: "",
            OldPhoneNumber: "",
            PhoneNumber: "",
            Gender: "",
            Nationality: "",
            DateOfBirth: "",

            ValidFirstName: true,
            ValidLastName: true,
            ValidDateOfBirth: true,
            ValidPhoneNumber: true,

            ConfirmationResult: null,
            OldPhoneCodeVerified: false,
            PhoneCodeVerified: false,
            VerificationFor: "Old Phone Number",

            ValidForm: false,
            SettingsSaved: false,
            ShowPreloader: false,

            Errors: {
                FirstName: "",
                LastName: "",
                DateOfBirth: "",
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
                        OldPhoneNumber: driver.PhoneNumber,
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
        let ValidDateOfBirth = this.state.ValidDateOfBirth;
        let ValidPhoneNumber = this.state.ValidPhoneNumber;

        switch (field) {
            case "FirstName":
                ValidFirstName = value.match(/^[a-zA-Z ]+$/);
                Errors.FirstName = ValidFirstName ? "" : Dictionary.FirstName;
                break;
            case "LastName":
                ValidLastName = value.match(/^[a-zA-Z ]+$/);
                Errors.LastName = ValidLastName ? "" : Dictionary.LastName;
                break;
            case "DateOfBirth":
                ValidDateOfBirth = value !== "";
                Errors.DateOfBirth = ValidDateOfBirth? "" : Dictionary.DateOfBirthError1;

                if (!ValidDateOfBirth) {
                    break;
                }

                ValidDateOfBirth = (new Date().getFullYear() - new Date(value).getFullYear()) >= 18;
                Errors.DateOfBirth = ValidDateOfBirth ? "" : Dictionary.DateOfBirthError2;
                break;
            case "PhoneNumber":
                ValidPhoneNumber = value.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/);
                Errors.PhoneNumber = ValidPhoneNumber ? "" : Dictionary.PhoneNumberError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidFirstName: ValidFirstName,
            ValidLastName: ValidLastName,
            ValidDateOfBirth: ValidDateOfBirth,
            ValidPhoneNumber: ValidPhoneNumber,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidFirstName &&
                    this.state.ValidLastName &&
                    this.state.ValidDateOfBirth &&
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

        if (this.state.PhoneNumber !== this.state.OldPhoneNumber &&
            !this.state.OldPhoneCodeVerified) {
                const appVerifier = window.recaptchaVerifier;

            FirebaseApp.auth().languageCode = "en";
            FirebaseApp.auth().signInWithPhoneNumber(this.state.OldPhoneNumber, appVerifier).then(confirmationResult => {
                this.setState({
                    ShowPreloader: false,
                    ConfirmationResult: confirmationResult,
                    VerificationFor: "Old Phone Number"
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
        else if (this.state.PhoneCodeVerified) {
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
                    ShowPreloader: false,
                    ValidForm: false,
                });

                if (response.Message === "Driver is updated.") {
                    this.setState({
                        OldPhoneNumber: this.state.PhoneNumber
                    });

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
                    ConfirmationResult: confirmationResult,
                    VerificationFor: "New Phone Number"
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
        return <section>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>{Dictionary.GeneralSettings}</div>
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
                            <div className="content-text-primary">{Dictionary.FirstName}</div>
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
                            <div className="content-text-primary">{Dictionary.LastName}</div>
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
                            <div className="content-text-primary">{Dictionary.DateOfBirth}</div>
                            <div className="text-danger">{this.state.Errors.DateOfBirth}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className={this.state.Gender === "Male" ? "fas fa-male" : "fas fa-female"}></span>
                        </div>
                        <div className="item-content-secondary">
<div class="combobox">
            <select class="form-control"
                style={{
                    width: "193px",
                    maxWidth: "296px",
                    minWidth: "88px"
                }}
                onChange={event => {
                    this.setState({
                        Gender: event.target.value
                    }, this.validateField("", ""));
                }}
                value={this.state.Gender}>
                <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
        </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.Gender}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-flag"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <NationalitySelector Nationality={this.state.Nationality}
                                    Width="193px"
                                    OnNationalitySelected={nationality => {
                                        this.setState({
                                            Nationality: nationality
                                        }, () => {
                                            this.setState({
                                                ValidForm: this.state.ValidFirstName &&
                                                    this.state.ValidLastName &&
                                                    this.state.ValidDateOfBirth &&
                                                    this.state.ValidPhoneNumber
                                            });
                                        });
                                    }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.Nationality}</div>
                        </div>
                    </div>
                    <div className="entity-list-item">
                        <div className="item-icon">
                            <span className="fas fa-phone"></span>
                        </div>
                        <div className="item-content-secondary">
                            <div className="form-group">
                                <input type="text" className="form-control" name="PhoneNumber" autoComplete="off"
                                    placeholder="+966501234567" value={this.state.PhoneNumber} onChange={this.onChange} style={{ width: "193px", }} />
                            </div>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.PhoneNumber}</div>
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
                            <div className="content-text-primary">{Dictionary.Address}</div>
                        </div>
                    </div>
                    <div className="entity-list-item active">
                        <div className="item-icon">
                            <span className="fas fa-save"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">{Dictionary.SaveChanges}</div>
                            <div className="content-text-secondary">{Dictionary.Undone}</div>
                        </div>
                        <div className="item-content-expanded">
                            <input type="submit" value={Dictionary.Save} className="btn btn-primary" disabled={!this.state.ValidForm} />
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
                PhoneNumber={this.state.VerificationFor === "Old Phone Number" ? 
                this.state.OldPhoneNumber : 
            this.state.NewPhoneNumber}
                OnOK={phoneCodeVerified => {
                    if (phoneCodeVerified) {
                        if (this.state.VerificationFor === "Old Phone Number") {
                            this.setState({
                                OldPhoneCodeVerified: true,
                            });
                        }
                        else {
                            this.setState({
                                PhoneCodeVerified: true
                            });
                        }

                        this.onSubmit();
                    }
                    else {
                        let {
                            Errors
                        } = this.state;

                        Errors.PhoneNumber = Dictionary.PhoneNumberError;

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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        GeneralSettings: "الاعدادات العامة",
        FirstName: "الاسم الاول",
        LastName: "الكنية",
        DateOfBirth: "تاريخ الولادة",
        Gender: "جنس",
        Male: "الذكر",
        Female: "أنثى",
        Nationality: "الجنسية",
        PhoneNumber: "رقم الهاتف",
        Address: "عنوان",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ".هذا لا يمكن التراجع عنها",
        Save: "حفظ",
        FirstNameError: ".الاسم الأول غير صالح",
        LastNameError: ".اسم العائلة غير صالح",
        DateOfBirthError1: ".تاريخ الميلاد مطلوب",
        DateOfBirthError2: ".يجب أن يكون عمرك 18 عامًا على الأقل",
        PhoneNumberError: ".رقم الهاتف غير صالح", 
        CodeError: ".رمز التأكيد غير صالح",
    };
}
else {
    Dictionary = {
        GeneralSettings: "General Settings",
        FirstName: "First Name",
        LastName: "Last Name",
        DateOfBirth: "Date of Birth",
        Gender: "Gender",
        Male: "Male",
        Female: "Female",
        Nationality: "Nationality",
        PhoneNumber: "Phone Number",
        Address: "Address",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",
        FirstNameError: "First name is invalid.",
        LastNameError: "Last name is invalid.",
        DateOfBirthError1: "Date of birth is required.",
        DateOfBirthError2: "You must be at least 18 years old.",
        PhoneNumberError: "Phone number is invalid.", 
        CodeError: "Confirmation code is invalid.",
    };
}

export default GeneralSettings;