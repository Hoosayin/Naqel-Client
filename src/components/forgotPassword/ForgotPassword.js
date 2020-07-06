import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import FirebaseApp from "../../res/FirebaseApp";
import Preloader from "../../controls/Preloader";
import PhoneConfirmationDialog from "../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import { validatePhoneNumber as validateDriverPhoneNumber } from "../drivers/DriverFunctions";
import { validatePhoneNumber as validateTraderPhoneNumber } from "../traders/TraderFunctions";
import { validatePhoneNumber as validateResponsibleNumber } from "../transportCompanyResponsibles/TransportCompanyResponsiblesFunctions";

import {
    RegisterCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            PhoneNumber: "",
            RegisteredAs: "Driver",

            ValidPhoneNumber: false,

            ConfirmationResult: null,
            PhoneCodeVerified: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                PhoneNumber: "",
                Password: "",
                Form: "",
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
            "size": "invisible",
            "callback": response => {
            }
        });
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let {
            ValidPhoneNumber,
            Errors
        } = this.state;

        switch (field) {
            case "PhoneNumber":
                ValidPhoneNumber = value !== "";
                Errors.PhoneNumber = ValidPhoneNumber ? "" : Dictionary.PhoneNumberError1;

                if (!ValidPhoneNumber) {
                    break;
                }

                ValidPhoneNumber = value.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/);
                Errors.PhoneNumber = ValidPhoneNumber ? "" : Dictionary.PhoneNumberError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPhoneNumber: ValidPhoneNumber
        }, () => {
            this.setState({
                ValidForm: ValidPhoneNumber
            });
        });
    }

    handleResponse = (response, forgotPasswordPackage) => {
        if (response.Message === "Phone number is already used.") {
            localStorage.setItem("ForgotPasswordPackageToken", JSON.stringify(forgotPasswordPackage));
            this.props.history.push("/recoverPassword");
        }
        else {
            let {
                Errors
            } = this.state;

            Errors.Form = Dictionary.FormError;

            this.setState({
                Errors: Errors
            });
        }
    };

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
            const forgotPasswordPackage = {
                PhoneNumber: this.state.PhoneNumber,
                RegisteredAs: this.state.RegisteredAs,
            };

            if (forgotPasswordPackage.RegisteredAs === "Driver") {
                await validateDriverPhoneNumber(forgotPasswordPackage.PhoneNumber).then(response => {
                    this.setState({
                        ShowPreloader: false
                    });

                    this.handleResponse(response, forgotPasswordPackage);
                });
            }
            else if (forgotPasswordPackage.RegisteredAs === "TC Responsible") {
                await validateResponsibleNumber(forgotPasswordPackage.PhoneNumber).then(response => {
                    this.setState({
                        ShowPreloader: false
                    });

                    this.handleResponse(response, forgotPasswordPackage);
                });
            }
            else {
                await validateTraderPhoneNumber(forgotPasswordPackage.PhoneNumber).then(response => {
                    this.setState({
                        ShowPreloader: false
                    });

                    this.handleResponse(response, forgotPasswordPackage);
                });
            }

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

                Errors.Form = error.message;

                this.setState({
                    ShowPreloader: false,
                    Errors: Errors
                });
            });
        }
    }

    render() {
        const {
            PhoneNumber,
            ValidForm,
            ShowPreloader,
            Errors,
        } = this.state;

        return <div dir={GetDirection()}>
            <div class="middle" style={RegisterCardBack}>
                <div class="theme-default animated fadeIn" style={Card}>
                    <div style={CardChild}>
                        <img src="./images/more.svg" alt="more.svg" height="60" />
                        <div class="type-h3" style={CardTitle}>{Dictionary.ForgotPassword}</div>
                        <br />
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label htmlFor="PhoneNumber" class="control-label">{Dictionary.PhoneNumber}</label>
                                <span className="text-danger m-l-xxxs">*</span>
                                <input type="text" className="form-control" name="PhoneNumber" autocomplete="off"
                                    placeholder="+966501234567" value={PhoneNumber} onChange={this.onChange} />
                                <span class="text-danger">{Errors.PhoneNumber}</span>
                            </div>
                            <div class="form-group">
                                <label class="control-label">{Dictionary.RegisteredAs}</label>
                                <div class="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                    <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                        aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                        {this.state.RegisteredAs === "Driver" && <span>{Dictionary.Driver}</span>}
                                        {this.state.RegisteredAs === "Trader" && <span>{Dictionary.Trader}</span>}
                                        {this.state.RegisteredAs === "Broker" && <span>{Dictionary.Broker}</span>}
                                        {this.state.RegisteredAs === "TC Responsible" && <span>TC Resposible</span>}
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                        <li><Link onClick={e => { this.state.RegisterAs = "Driver" }} onChange={this.onChange}>{Dictionary.Driver}</Link></li>
                                        <li><Link onClick={e => { this.state.RegisterAs = "Trader" }} onChange={this.onChange}>{Dictionary.Trader}</Link></li>
                                        <li><Link onClick={e => { this.state.RegisterAs = "Broker" }} onChange={this.onChange}>{Dictionary.Broker}</Link></li>
                                        <li><Link onClick={e => { this.state.RegisterAs = "TC Responsible" }} onChange={this.onChange}>{Dictionary.TCResponsible}</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                {Errors.Form ? <div>
                                    <label class="text-danger">{Errors.Form}</label>
                                    <br />
                                </div> : null}
                            </div>

                            <input type="submit" value={Dictionary.Next} class="btn btn-primary" disabled={!ValidForm} />
                        </form>
                    </div>
                </div>
            </div>

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

                        Errors.Form = Dictionary.CodeError;

                        this.setState({
                            ValidForm: false,
                            Errors: Errors
                        });
                    }
                }} />

            <div id="recaptcha" />

            {ShowPreloader ? <Preloader /> : null}
        </div>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        ForgotPassword: "هل نسيت كلمة المرور",
        PhoneNumber: "رقم الهاتف",
        RegisteredAs: "مسجل باسم",
        Driver: "سائق",
        Trader: "التاجر",
        Broker: "وسيط",
        TCResponsible: "مسؤول التعاون الفني",
        Next: "التالى",
        PhoneNumberError1: ".رقم الهاتف مطلوب",
        PhoneNumberError2: ".رقم الهاتف غير صالح",
        CodeError: ".رمز التأكيد غير صالح",
        FormError: ".فشل في العثور على رقم الهاتف هذا",
    };
}
else {
    Dictionary = {
        ForgotPassword: "Forgot Password",
        PhoneNumber: "Phone Number",
        RegisteredAs: "Registered as",
        Driver: "Driver",
        Trader: "Trader",
        Broker: "Broker",
        TCResponsible: "TC Responsible",
        Next: "Next",
        PhoneNumberError1: "Phone number is required.",
        PhoneNumberError2: "Phone number is invalid.",
        CodeError: "Confirmation code is invalid.",
        FormError: "Failed to find this phone number.",
    };
}

export default ForgotPassword;