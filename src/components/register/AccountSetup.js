import React, { Component } from "react";
import Preloader from "../../controls/Preloader";
import PhoneConfirmationDialog from "../../containers/phoneConfirmationDialog/PhoneConfirmationDialog";
import NationalitySelector from "../../controls/NationalitySelector";
import { setupDriverAccount } from "../drivers/DriverFunctions";
import { setupTraderAccount } from "../traders/TraderFunctions";
import { validateEmail } from "../shared/UserFunctions";
import jwt_decode from "jwt-decode";

import {
    AccountSetupCardBack,
    CardLarge,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class AccountSetup extends Component {
    constructor() {
        super();

        this.state = {
            FirstName: "",
            LastName: "",
            DateOfBirth: "",
            Gender: "Male",
            Nationality: "Saudi Arabia",
            Address: "",
            Email: "",

            ValidFirstName: false,
            ValidLastName: false,
            ValidDateOfBirth: false,
            ValidNationality: false,
            ValidAddress: false,
            ValidEmail: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                FirstName: "",
                LastName: "",
                DateOfBirth: "",
                Nationality: "",
                Address: "",
                Email: "",
                FormError: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
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
        let ValidAddress = this.state.ValidAddress;
        let ValidEmail = this.state.ValidEmail;

        switch (field) {
            case "FirstName":
                ValidFirstName = ((value !== "") &&
                    (value.match(/^[a-zA-Z ]+$/)));
                Errors.FirstName = ValidFirstName ? "" : Dictionary.FirstNameError;
                break;
            case "LastName":
                ValidLastName = ((value !== "") &&
                    (value.match(/^[a-zA-Z ]+$/)));
                Errors.LastName = ValidLastName ? "" : Dictionary.LastNameError;
                break;
            case "DateOfBirth":
                ValidDateOfBirth = (new Date(value) < new Date());
                Errors.DateOfBirth = ValidDateOfBirth ? "" : Dictionary.BirthdayError;
                break;
            case "Address":
                ValidAddress = (value !== "");
                Errors.Address = ValidAddress ? "" : Dictionary.AddressError;
                break;
            case "Email":
                ValidEmail = value !== "";
                Errors.Email = ValidEmail ? "" : Dictionary.EmailError1;

                if (!ValidEmail) {
                    break;
                }

                ValidEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                Errors.Email = ValidEmail ? "" : Dictionary.EmailError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidFirstName: ValidFirstName,
            ValidLastName: ValidLastName,
            ValidDateOfBirth: ValidDateOfBirth,
            ValidAddress: ValidAddress,
            ValidEmail: ValidEmail
        }, () => {
            this.setState({
                ValidForm: this.state.ValidFirstName &&
                    this.state.ValidLastName &&
                    this.state.ValidDateOfBirth &&
                    this.state.ValidAddress &&
                    this.state.ValidEmail
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

        await validateEmail(this.state.Email).then(async response => {
            if (response.Message === "Email is valid.") {
                const newUserDecoded = jwt_decode(localStorage.NewUserToken);

        const newUser = {
            Username: newUserDecoded.Username,
            PhoneNumber: newUserDecoded.PhoneNumber,
            Password: newUserDecoded.Password,
            RegisterAs: newUserDecoded.RegisterAs,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            DateOfBirth: this.state.DateOfBirth,
            Gender: this.state.Gender,
            Address: this.state.Address,
            Email: this.state.Email,
            Nationality: this.state.Nationality,
        }

        if (newUser.RegisterAs == "Driver") {
            await setupDriverAccount(newUser).then(response => {
                this.setState({
                    ShowPreloader: false
                });

                localStorage.removeItem("NewUserToken");
                localStorage.setItem("IsCreatedSuccessfully", true);
                this.props.history.push("/congratulations");
            });
        }
        if (newUser.RegisterAs == "Trader" || newUser.RegisterAs == "Broker") {
            await setupTraderAccount(newUser).then(response => {
                this.setState({
                    ShowPreloader: false
                });

                localStorage.removeItem("NewUserToken");
                localStorage.setItem("IsCreatedSuccessfully", true);
                this.props.history.push("/congratulations");
            });
        }
            }
            else {
                let errors = this.state.Errors;
                errors.Email = "Email is already taken.";

                this.setState({
                    Errors: errors,
                    ShowPreloader: false,
                    ValidForm: false,
                    ValidEmail: false,
                });
            }
        });
    }

    render() {
        if (!localStorage.NewUserToken) {
            this.props.history.push("/register");
            return <a />
        }
        else {
            return <section dir={GetDirection()}>
                <div class="middle" style={AccountSetupCardBack}>
                    <div class="theme-default animated fadeIn" style={CardLarge}>
                        <div style={CardChild}>
                            <img src="./images/create_account.svg" atl="create_account.png" height="60" />
                            <div class="type-h3" style={CardTitle}>{Dictionary.CreateAccount}</div>
                            <div class="type-sh3">{Dictionary.CreateAccountSubtitle}</div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="FirstName" class="control-label">{Dictionary.FirstName}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="FirstName" autocomplete="off"
                                                value={this.state.FirstName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.FirstName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="LastName" class="control-label">{Dictionary.LastName}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="LastName" autocomplete="off"
                                                value={this.state.LastName} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.LastName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="DateOfBirth" class="control-label">{Dictionary.DateOfBirth}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <input type="date" class="form-control" name="DateOfBirth" autocomplete="off"
                                                value={this.state.DateOfBirth} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.DateOfBirth}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="Gender" class="control-label">{Dictionary.Gender}</label><br />
                                            <div class="dropdown" style={{
                                                width: "100%",
                                                maxWidth: "296px",
                                                minWidth: "88px"
                                            }}>
                                                <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                    aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                    {this.state.Gender === "Male" ? <span>{Dictionary.Male}</span> : <span>{Dictionary.Female}</span>}
                                                    <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                    <li><a onClick={() => { this.setState({ Gender: "Male" }); }}>{Dictionary.Male}</a></li>
                                                    <li><a onClick={() => { this.setState({ Gender: "Female" }); }}>{Dictionary.Female}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="Nationality" class="control-label">{Dictionary.Nationality}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <NationalitySelector Nationality={this.state.Nationality}
                                                OnNationalitySelected={nationality => {
                                                    this.setState({
                                                        Nationality: nationality
                                                    }, () => {
                                                        this.setState({
                                                            ValidForm: this.state.ValidFirstName &&
                                                                this.state.ValidLastName &&
                                                                this.state.ValidDateOfBirth &&
                                                                this.state.ValidAddress &&
                                                                this.state.ValidEmail
                                                        });
                                                    });
                                                }} />
                                            <span class="text-danger">{this.state.Errors.Nationality}</span>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="Email" class="control-label">{Dictionary.Email}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <input htmlFor="Email" type="email" name="Email" class="form-control" placeholder="someone@example.com" autocomplete="off"
                                                value={this.state.Email} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.Email}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label htmlFor="Address" class="control-label">{Dictionary.Address}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <textarea class="form-control" rows="8" name="Address" autocomplete="off"
                                                value={this.state.Address} onChange={this.onChange}></textarea>
                                            <span class="text-danger">{this.state.Errors.Address}</span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label text-danger">{this.state.Errors.FormError}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value={Dictionary.Create} class="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
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

                            Errors.FormError = "Confirmation code is invalid.";

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
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        CreateAccount: "إنشاء حساب",
        CreateAccountSubtitle: "!فقط خطوة أخرى ، لقد انتهيت",
        FirstName: "الاسم الاول",
        LastName: "اسم العائلة",
        DateOfBirth: "تاريخ الميلاد",
        Gender: "جنس",
        Male: "ذكر",
        Female: "أنثى",
        Nationality: "الجنسية",
        Email: "البريد الإلكتروني",
        Address: "العنوان",
        Create: "انشاء",
        FirstNameError: ".الاسم الأول غير صالح",
        LastNameError: ".اسم العائلة غير صالح",
        BirthdayError: ".يجب أن يكون عيد ميلادك قبل اليوم",
        NationalityError: ".الجنسية باطلة",
        AddressError: ".العنوان مطلوب",
        EmailError1: ".البريد الالكتروني مطلوب",
        EmailError2: ".البريد الإلكتروني غير صالح",
    };
}
else {
    Dictionary = {
        CreateAccount: "Create Account",
        CreateAccountSubtitle: "Just one more step, and you're done!",
        FirstName: "First Name",
        LastName: "Last Name",
        DateOfBirth: "Date of Birth",
        Gender: "Gender",
        Male: "Male",
        Female: "Female",
        Nationality: "Nationality",
        Email: "Email",
        Address: "Address",
        Create: "Create",
        FirstNameError: "First name is invalid.",
        LastNameError: "Last name is invalid.",
        BirthdayError: "Your Date of Birth must be earlier than today.",
        NationalityError: "Nationality is invalid.",
        AddressError: "Address is required.",
        EmailError1: "Email is required.",
        EmailError2: "Email is invalid.",
    };
}

export default AccountSetup;