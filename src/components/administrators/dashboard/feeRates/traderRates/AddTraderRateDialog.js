import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { addTraderRate } from "../../../AdministratorFunctions";

class AddTraderRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Username: "",
            FeeRate: "",

            ValidUsername: false,
            ValidFeeRate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Username: "",
                FeeRate: ""
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
        let ValidUsername = this.state.ValidUsername
        let ValidFeeRate = this.state.ValidFeeRate;

        switch (field) {
            case "Username":
                ValidUsername = (value !== "");
                Errors.Username = ValidUsername ? "" : "Username is required.";

                if (Errors.Username != "") {
                    break;
                }

                ValidUsername = (value.match(/^[a-z0-9]+$/i));
                Errors.Username = ValidUsername ? "" : "Username is invalid.";
                break;
            case "FeeRate":
                ValidFeeRate = (value !== "");
                Errors.FeeRate = ValidFeeRate ? "" : "Fee rate is required";

                if (Errors.FeeRate !== "") {
                    break;
                }

                ValidFeeRate = (value >= 1 && value <= 100);
                Errors.FeeRate = ValidFeeRate ? "" : "Fee Rate can be between 1 and 100.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidUsername: ValidUsername,
            ValidFeeRate: ValidFeeRate,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidUsername &&
                        this.state.ValidFeeRate
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

        const newTraderRate = {
            Token: localStorage.Token,
            Username: this.state.Username,
            FeeRate: this.state.FeeRate
        };

        await addTraderRate(newTraderRate).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Trader rate is added.") {
                this.cancelButton.click();
                this.props.OnOK(response.TraderRate);
            }
        });
    }

    render() {
        const {
            Username,
            FeeRate,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-trader-rate-dialog`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-h3 color-default p-t-n m-b-xxs">Add Trader Rate</div>
                                                <div className="form-group">
                                                    <label className="control-label">Trader's Username</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Username" className="form-control" autoComplete="off"
                                                        value={Username} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Username}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Fee Rate (%)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="FeeRate" className="form-control" autoComplete="off"
                                                        value={FeeRate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.FeeRate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Add" className="btn btn-primary" disabled={!ValidForm} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default AddTraderRateDialog;