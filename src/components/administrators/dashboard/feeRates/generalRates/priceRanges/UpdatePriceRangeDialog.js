import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { updatePriceRange } from "../../../../AdministratorFunctions";

class UpdatePriceRangeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FeeRate: this.props.FeeRate,

            ValidFeeRate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
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
        let ValidFeeRate = this.state.ValidFeeRate;

        switch (field) {
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
            ValidFeeRate: ValidFeeRate,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidFeeRate
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

        const updatedPriceRange = {
            Token: localStorage.Token,
            PriceRangeID: this.props.PriceRangeID,
            FeeRate: this.state.FeeRate
        };

        await updatePriceRange(updatedPriceRange).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Price range is updated.") {
                this.cancelButton.click();
                this.props.OnOK(this.state.FeeRate);
            }
        });


    }

    render() {
        const {
            FeeRate,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            Index
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`update-fee-rate-dialog-${Index}`}
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
                                                <div className="type-h3 color-default p-t-n">Update Fee Rate</div>
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
                                            <input type="submit" value="Set" className="btn btn-primary" disabled={!ValidForm} />
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

export default UpdatePriceRangeDialog;