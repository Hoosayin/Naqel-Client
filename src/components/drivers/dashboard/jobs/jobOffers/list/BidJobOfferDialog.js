import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader.js";
import Strings from "../../../../../../res/strings";
import { addDriverRequest } from "../../../../DriverFunctions";

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
                Errors.Price = ValidPrice ? "" : Dictionary.BiddingError1;

                if (Errors.Price !== "") {
                    break;
                }

                ValidPrice = (value <= this.props.JobOffer.Price);
                Errors.Price = ValidPrice ? "" : Dictionary.BiddingError2;
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
            Token: sessionStorage.Token,
            JobOfferID: this.props.JobOffer.JobOfferID,
            Price: this.state.Price
        };

        console.log("Going to add driver request...");

        this.setState({
            Preloader: <Preloader />
        });

        await addDriverRequest(newDriverRequest).then(response => {
            if (response.Message === "Driver request is added.") {
                this.setState({
                    Preloader: null
                });

                this.cancelButton.click();
                this.props.OnOK(response.DriverRequest);
            }
            else {
                this.setState({
                    Preloader: null
                });
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id={`bid-job-offer-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
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
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.BidonPrice}</div>
                                        <div className="type-sh3">{`${Dictionary.MaximumAcceptedPrice} ${this.props.JobOffer.Price} ${Strings.SAUDI_RIYAL}.`}</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-24">
                                                <div className="form-group">
                                                    <label className="control-label">{`${Dictionary.Price} (${Strings.SAUDI_RIYAL})`}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0.00" step="0.01" name="Price"
                                                        className="form-control" autoComplete="off" value={this.state.Price} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Bid} className="btn btn-primary" disabled={!this.state.ValidForm} />
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        BidonPrice: "المزايدة على السعر",
        MaximumAcceptedPrice: "أقصى سعر مقبول:",
        Price: "السعر",
        Bid: "المناقصة",
        BiddingError1: "مطلوب سعر المزايدة.",
        BiddingError2: "لا يمكنك المزايدة أكثر من السعر الأقصى المقبول.",
    };
}
else {
    Dictionary = {
        BidonPrice: "Bid on Price",
        MaximumAcceptedPrice: "Maximum Accepted Price:",
        Price: "Price",
        Bid: "Bid",
        BiddingError1: "Bidding price is required.",
        BiddingError2: "You cannot bid more than maximum accepted price.",
    };
}

export default BidJobOfferDialog;