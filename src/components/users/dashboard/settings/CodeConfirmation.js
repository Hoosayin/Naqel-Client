import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { usernameAndEmailSettings } from "../../DriverFunctions";
import MessageBox from "../../../../controls/MessageBox";
import jsonWebToken from "jsonwebtoken";

class CodeConfirmation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Show: this.props.Show,
            Code: this.props.Code,
            ConfirmCode: "",
            Username: this.props.Username,
            Email: this.props.Email,

            ValidConfirmCode: false,
            ValidForm: false,

            MessageBox: "",

            Errors: {
                ConfirmCode: ""
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(value) });
    }

    validateField(value) {
        let Errors = this.state.Errors;
        let ValidConfirmCode = this.state.ValidConfirmCode;

        ValidConfirmCode = value === this.state.Code;
        Errors.ConfirmCode = ValidConfirmCode ? "" : "Invalid code.";

        this.setState({
            Errors: Errors,
            ValidConfirmCode: ValidConfirmCode,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidConfirmCode
            });
        });
    }

    onSubmit = async e => {
        e.preventDefault();



        if (this.state.Show) {
            const updatedDriver = {
                DriverID: jwt_decode(localStorage.userToken).DriverID,
                Username: this.state.Username,
                Email: this.state.Email,
            };

            usernameAndEmailSettings(updatedDriver)
                .then(res => {
                    if (res === "Driver is updated.") {
                        let decodedToken = jwt_decode(localStorage.userToken);

                        decodedToken["Username"] = this.state.Username;
                        decodedToken["Email"] = this.state.Email;

                        let token = jsonWebToken.sign(decodedToken, "mysecret");
                        localStorage.setItem("userToken", token);

                        this.setState({
                            MessageBox: (<MessageBox Message="Settings saved successfully." Show={true} />),
                        });
                    }
                    else {
                        this.setState({
                            MessageBox: (<MessageBox Message="Settings could not be saved. Please try later." Show={true} />),
                        });
                    }

                    this.setState({
                        Show: false,
                    });
                });
        }
    }

    render() {
        return (
            <div>
                <div class="modal in" style={this.state.Show ? { display: "block", paddingRight: "17px", } : { display: "none", paddingRight: "17px", }}>
                    <div class="modal-dialog">
                        <div class="modal-content animated fadeIn">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div>
                                    <img src="./images/passcode.png" height="60" />
                                    <div class="type-h3">Email Confirmation</div>
                                    <div class="type-sh3">We delivered a confirmation code to your email.</div>
                                    <br />
                                    <div asp-validation-summary="ModelOnly" class="text-danger"></div>
                                    <div class="form-group">
                                        <label class="control-label">Confirmation Code</label>
                                        <input type="text" name="ConfirmCode" class="form-control" autocomplete="off"
                                            value={this.state.ConfirmCode} onChange={this.onChange} />
                                        <span class="text-danger">{this.state.Errors["ConfirmCode"]}</span>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-default" onClick={e => { this.setState({ Show: false, }) }}>Cancel</button>
                                    <input type="submit" value="Confirm" class="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {this.state.MessageBox}
            </div>
        );
    }
};

export default CodeConfirmation;