import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

import {
    EmailConfirmationCardBack,
    Card,
    CardChild,
    CardTitle,
} from "../../styles/CardStyles";

class CodeConfirmation extends Component {
    constructor() {
        super();

        this.state = {
            ConfirmationCode: 0,

            ValidConfirmationCode: false,
            ValidForm: false,

            Errors: {
                ConfirmationCode: ""
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
        let ValidConfirmationCode = this.state.ValidConfirmationCode;

        switch (field) {
            case "ConfirmationCode":
                ValidConfirmationCode = (value !== "");
                Errors.ConfirmationCode = ValidConfirmationCode ? "" : Dictionary.ConfirmationCodeError1;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidConfirmationCode: ValidConfirmationCode
        }, () => {
            this.setState({
                ValidForm: this.state.ValidConfirmationCode
            });
        });
    }

    onSubmit = event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const confirmationResult = JSON.parse(localStorage.ConfirmationResult);
        console.log(this.props.location.state.detail);

        confirmationResult.confirm(this.state.ConfirmationCode).then(result => {
            localStorage.removeItem("ConfirmationResultToken");
            const newUser = jwt_decode(localStorage.NewUserToken);

            if (newUser.RegisterAs === "Administrator") {
                this.props.history.push("/setupAdministratorAccount");
            }
            else if (newUser.RegisterAs === "TC Responsible") {
                this.props.history.push("/setupTransportCompanyResponsibleAccount");
            }
            else {
                this.props.history.push("/setupAccount");
            }
        }).catch(error => {
            let {
                Errors
            } = this.state;

            Errors.ConfirmationCode = error.message;

            this.setState({
                Errors: Errors
            });
        });
    }

    render() {
        if (!localStorage.NewUserToken) {
            return <Redirect to={"/register"} />;
        }
        else {
            return <section dir={GetDirection()}>
                <div class="middle" style={EmailConfirmationCardBack}>
                    <div class="theme-default animated fadeIn" style={Card}>
                        <div style={CardChild}>
                            <img src="./images/more.svg" alt="passcode.png" height="60" />
                            <div class="type-h3" style={CardTitle}>{Dictionary.CodeConfirmation}</div>
                            <div class="type-sh3">{Dictionary.CodeConfirmationSubtitle}</div>
                            <br />
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <label htmlFor="ConfirmationCode" class="control-label">{Dictionary.ConfirmationCode}</label>
                                    <span class="text-danger m-l-xxxs">*</span>
                                    <input htmlFor="ConfirmationCode" type="text" name="ConfirmationCode" class="form-control"
                                        value={this.state.ConfirmationCode} onChange={this.onChange} />
                                    <span class="text-danger">{this.state.Errors.ConfirmationCode}</span>
                                </div>
                                <input type="submit" value={Dictionary.Next} class="btn btn-primary" disabled={!this.state.ValidForm} />
                            </form>
                        </div>
                    </div>
                </div>
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
        CodeConfirmation: "تأكيد الرمز",
        CodeConfirmationSubtitle: ".لقد سلمنا رمز التأكيد إلى رقم هاتفك",
        ConfirmationCode: "تأكيد الكود",
        Next: "التالى",
        ConfirmationCodeError1: "رمز التأكيد مطلوب.",
    };
}
else {
    Dictionary = {
        CodeConfirmation: "Code Confirmation",
        CodeConfirmationSubtitle: "We delivered a confirmation code to your phone number.",
        ConfirmationCode: "Confirmation Code",
        Next: "Next",
        ConfirmationCodeError1: "Confirmation code is required.",
    };
}

export default CodeConfirmation;