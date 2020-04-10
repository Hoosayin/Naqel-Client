import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../controls/Preloader.js";
import { addDriverRequest } from "../../../DriverFunctions";

class BidJobOfferDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Price: 0,

            ValidPrice: false,

            ValidForm: false,
            Preloader: null,

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
        let Errors = this.state.Errors;
        let ValidPrice = this.state.ValidPrice;

        switch (field) {
            case "Price":
                ValidPrice = (value !== "");
                Errors.Price = ValidPrice ? "" : "Bidding price is required.";

                if (Errors.Price !== "") {
                    break;
                }

                ValidPrice = (value <= this.props.JobOffer.Price);
                Errors.Price = ValidPrice ? "" : "You cannot bid more than maximum accepted price.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPrice: ValidPrice
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidPrice
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (this.props.IsRequestSent()) {
            return;
        }

        const newDriverRequest = {
            Token: localStorage.Token,
            JobOfferID: this.props.JobOffer.JobOfferID,
            Price: this.state.Price
        };

        console.log("Going to add driver request...");

        this.setState({
            Preloader: <Preloader />
        });

        await addDriverRequest(newDriverRequest).then(response => {
            if (response.Message === "Driver request is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return <section className="text-left">
            <div className="modal" id={`bid-job-offer-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <section>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="modal-header">
                                    <img alt="bid.png" src="./images/bid.png" height="60" />
                                    <div className="type-h3">Bid on Price</div>
                                    <div className="type-sh3">{`Maximum Accepted Price is $${this.props.JobOffer.Price}.`}</div>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Price (USD)</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                    className="form-control" autoComplete="off" value={this.state.Price} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-default" data-dismiss="modal"
                                        ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                    <input type="submit" value="Bid" className="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default BidJobOfferDialog;