import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import { requestSpecialBill } from "../../TraderFunctions";

class RequestSpecialBillDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Price: 0,

            ValidPrice: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                Price: ""
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
        let {
            Errors,
            ValidPrice
        } = this.state;

        switch (field) {
            case "Price":
                ValidPrice = (value !== "");
                Errors.Price = ValidPrice ? "" : "Temporary is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPrice: ValidPrice
        }, () => {
                this.setState({
                    ValidForm: ValidPrice
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

        const requestedSpecialBill = {
            Token: localStorage.Token,
            TraderBillID: this.props.TraderBill.TraderBillID,
            Amount: this.state.Price
        };

        await requestSpecialBill(requestedSpecialBill).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Special bill is requested.") {
                this.cancelButton.click();
                this.props.OnOK(response.SpecialTraderBill);
            }
        });
    }

    render() {
        const {
            Price,
            ShowPreloader,
            ValidForm,
            Errors
        } = this.state;

        const {
            Index,
            TraderBill
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`request-special-bill-dialog-${Index}`}
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
                                        <div className="type-h3 color-default p-t-xxs">Request Special Bill</div>
                                        <div className="type-sh3">{`Current amount is $${TraderBill.Amount.toFixed(2)}.`}</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-24">
                                                <div className="form-group">
                                                    <label className="control-label">Temporary Amount (USD)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" step="0.01" name="Price"
                                                        className="form-control" autoComplete="off" value={Price} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Request" className="btn btn-primary" disabled={!ValidForm} />
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

export default RequestSpecialBillDialog;