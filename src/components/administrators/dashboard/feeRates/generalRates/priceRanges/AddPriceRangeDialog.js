import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import { addPriceRange } from "../../../../AdministratorFunctions";

class AddPriceRangeDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            StartRange: "",
            EndRange: "",
            FeeRate: "",

            ValidStartRange: false,
            ValidEndRange: false,
            ValidFeeRate: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                StartRange: "",
                EndRange: "",
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
        let ValidStartRange = this.state.ValidStartRange;
        let ValidEndRange = this.state.ValidEndRange;
        let ValidFeeRate = this.state.ValidFeeRate;

        switch (field) {
            case "StartRange":
                ValidStartRange = (value !== "");
                Errors.StartRange = ValidStartRange ? "" : "Starting price is required";

                if (Errors.StartRange !== "") {
                    break;
                }

                if (this.state.EndRange !== "") {
                    ValidStartRange = (value <= parseFloat(this.state.EndRange));
                    Errors.StartRange = ValidStartRange ? "" : "Starting price must be less than Ending price.";

                    if (Errors.StartRange !== "") {
                        break;
                    }

                }

                ValidEndRange = (parseFloat(this.state.EndRange) >= value);
                Errors.EndRange = ValidEndRange ? "" : "Ending price must be greater than Starting price.";
                break;
            case "EndRange":
                ValidEndRange = (value !== "");
                Errors.EndRange = ValidEndRange ? "" : "Ending price is required";

                if (Errors.EndRange !== "") {
                    break;
                }

                ValidEndRange = (value >= parseFloat(this.state.StartRange));
                Errors.EndRange = ValidEndRange ? "" : "Ending price must be greater than Starting price.";

                if (Errors.EndRange !== "") {
                    break;
                }

                ValidStartRange = (parseFloat(this.state.StartRange) <= value);
                Errors.StartRange = ValidStartRange ? "" : "Starting price must be less than Ending price.";
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
            ValidStartRange: ValidStartRange,
            ValidEndRange: ValidEndRange,
            ValidFeeRate: ValidFeeRate,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidStartRange &&
                        this.state.ValidEndRange &&
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

        const newPriceRange = {
            Token: localStorage.Token,
            StartRange: this.state.StartRange,
            EndRange: this.state.EndRange,
            FeeRate: this.state.FeeRate
        };

        await addPriceRange(newPriceRange).then(async response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Price range is added.") {
                this.cancelButton.click();
                this.props.OnOK(response.PriceRange);
            }
        });
    }

    render() {
        const {
            StartRange,
            EndRange,
            FeeRate,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-price-range-dialog`}
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
                                                <div className="type-h3 color-default p-t-n m-b-xxs">Add Price Range</div>
                                                <div className="form-group">
                                                    <label className="control-label">Starting Price (USD)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0.00" step="0.01" name="StartRange"
                                                        className="form-control" autoComplete="off" value={StartRange} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.StartRange}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Ending Price (USD)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0.00" step="0.01" name="EndRange"
                                                        className="form-control" autoComplete="off" value={EndRange} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.EndRange}</span>
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

export default AddPriceRangeDialog;