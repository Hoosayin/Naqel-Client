import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader.js";
import { usernameAndEmailSettings } from "../../TraderFunctions.js";

class CodeConfirmationDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ConfirmCode: "",

            ValidConfirmCode: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                ConfirmCode: "",
            },
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

        let ValidConfirmCode = this.state.ValidConfirmCode;

        ValidConfirmCode = value === this.props.Code;
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

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedTrader = {
            Token: localStorage.Token,
            Username: this.props.Username,
            Email: this.props.Email,
        };

        this.setState({
            Preloader: <Preloader />
        });

        await usernameAndEmailSettings(updatedTrader).then(response => {
            if (response.Message === "Trader is updated.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section class="text-left">
                <div
                    class="modal in" id="code-confirmation-dialog" tabindex="-1"
                    role="dialog" aria-labelledby="modal-sample-label" aria-hidden="true"
                    style={{ display: "block" }}>
                    <div class="modal-dialog">
                        {this.state.Preloader}
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <section>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <div class="modal-header">
                                            <img alt="passcode.png" src="./images/passcode.png" height="60" />
                                            <div class="type-h3">Email Confirmation</div>
                                            <div class="type-sh3">We delivered a confirmation code to your email.</div>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label">Confirmation Code</label>
                                                        <input type="text" name="ConfirmCode" class="form-control" autocomplete="off"
                                                            value={this.state.ConfirmCode} onChange={this.onChange} />
                                                        <span class="text-danger">{this.state.Errors.ConfirmCode}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                                ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                            <input type="submit" value="Confirm" class="btn btn-primary" disabled={!this.state.ValidForm} />
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default CodeConfirmationDialog;