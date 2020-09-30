import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Preloader from "../../controls/Preloader";
import { setupTransportCompanyResponsibleAccount } from "../transportCompanyResponsibles/TransportCompanyResponsiblesFunctions";
import { validateEmail } from "../shared/UserFunctions";

import {
    AccountSetupCardBack,
    CardLarge,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class SetupTransportCompanyResponsibleAccount extends Component {
    constructor() {
        super();

        this.state = {
            Name: "",
            Email: "",

            ValidName: false,
            ValidEmail: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Name: "",
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
        let {
            Errors,
            ValidEmail,
            ValidName
        } = this.state;

        switch (field) {
            case "Email":
                ValidEmail = value !== "";
                Errors.Email = ValidEmail ? "" : Dictionary.EmailError1;

                if (!ValidEmail) {
                    break;
                }

                ValidEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                Errors.Email = ValidEmail ? "" : Dictionary.EmailError2;
                break;
            case "Name":
                ValidName = (value !== "");
                Errors.Name = ValidName ? "" : Dictionary.CompanyNameError1;

                if (Errors.Name !== "") {
                    break;
                }

                ValidName = (value.match(/^[a-zA-Z ]+$/));
                Errors.Name = ValidName ? "" : Dictionary.CompanyNameError2;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidName: ValidName,
            ValidEmail: ValidEmail
        }, () => {
            this.setState({
                ValidForm: ValidName &&
                    ValidEmail
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        await validateEmail(this.state.Email).then(async response => {
            if (response.Message === "Email is valid.") {
                const newUser = jwt_decode(localStorage.NewUserToken);

        const newTransportCompanyResponsible = {
            Username: newUser.Username,
            PhoneNumber: newUser.PhoneNumber,
            Password: newUser.Password,
            RegisterAs: newUser.RegisterAs,
            Name: this.state.Name,
            Email: this.state.Email
        }

        await setupTransportCompanyResponsibleAccount(newTransportCompanyResponsible).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Transport company responsible created.") {
                localStorage.removeItem("NewUserToken");
                localStorage.setItem("IsCreatedSuccessfully", true);

                this.props.history.push("/congratulations");
            }
        });
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
            return <Redirect to={"/register"} />;
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
                                    <div class="col-md-24">
                                        <div class="form-group">
                                            <label htmlFor="Email" class="control-label">{Dictionary.Email}</label>
                                            <span className="text-danger m-l-xxxs">*</span>
                                            <input htmlFor="Email" type="email" name="Email" class="form-control" placeholder="someone@example.com" autocomplete="off"
                                                value={this.state.Email} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.Email}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">{Dictionary.CompanyName}</label>
                                            <span class="text-danger m-l-xxxs">*</span>
                                            <input type="text" className="form-control" name="Name" autocomplete="off"
                                                value={this.state.Name} onChange={this.onChange} />
                                            <span class="text-danger">{this.state.Errors.FirstName}</span>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label text-danger">{this.state.Errors.FormError}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value={Dictionary.Create} class="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
        Email: "البريد الإلكتروني",
        CompanyName: "اسم الشركة",
        Create: "انشاء",
        CompanyNameError1: ".اسم الشركة مطلوب",
        CompanyNameError2: ".اسم الشركة غير صالح",
        EmailError1: ".البريد الالكتروني مطلوب",
        EmailError2: ".البريد الإلكتروني غير صالح",
        CodeError: ".رمز التأكيد غير صالح"
    };
}
else {
    Dictionary = {
        CreateAccount: "Create Account",
        CreateAccountSubtitle: "Just one more step, and you're done!",
        Email: "Email",
        CompanyName: "Company Name",
        Create: "Create",
        CompanyNameError1: "Company name is required.",
        CompanyNameError2: "Company name is invalid.",
        EmailError1: "Email is required.",
        EmailError2: "Email is invalid.",
        CodeError: "Confirmation code is invalid." 
    };
}

export default SetupTransportCompanyResponsibleAccount;