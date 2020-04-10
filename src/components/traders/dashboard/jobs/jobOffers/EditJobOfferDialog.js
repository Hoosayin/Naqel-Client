import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../controls/Preloader.js";
import { updateJobOffer } from "../../../TraderFunctions.js";

class EditJobOfferDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobOfferID: this.props.JobOffer.JobOfferID,
            LoadingPlace: this.props.JobOffer.LoadingPlace,
            UnloadingPlace: this.props.JobOffer.UnloadingPlace,
            TripType: this.props.JobOffer.TripType,
            CargoType: this.props.JobOffer.CargoType,
            CargoWeight: this.props.JobOffer.CargoWeight,
            LoadingDate: this.props.JobOffer.LoadingDate,
            LoadingTime: this.props.JobOffer.LoadingTime,
            AcceptedDelay: this.props.JobOffer.AcceptedDelay,
            Price: this.props.JobOffer.Price,
            JobOfferType: this.props.JobOffer.JobOfferType,
            EntryExit: this.props.JobOffer.EntryExit,

            ValidCargoType: true,
            ValidCargoWeight: true,
            ValidLoadingPlace: true,
            ValidUnloadingPlace: true,
            ValidLoadingDate: true,
            ValidLoadingTime: true,
            ValidAcceptedDelay: true,
            ValidPrice: true,

            ValidForm: false,
            Preloader: null,

            Errors: {
                CargoType: "",
                CargoWeight: "",
                LoadingPlace: "",
                UnloadingPlace: "",
                LoadingDate: "",
                LoadingTime: "",
                AcceptedDelay: "",
                Price: "",
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
        let ValidCargoType = this.state.ValidCargoType;
        let ValidCargoWeight = this.state.ValidCargoWeight;
        let ValidLoadingPlace = this.state.ValidLoadingPlace;
        let ValidUnloadingPlace = this.state.ValidUnloadingPlace;
        let ValidLoadingDate = this.state.ValidLoadingDate;
        let ValidLoadingTime = this.state.ValidLoadingTime;
        let ValidAcceptedDelay = this.state.ValidAcceptedDelay;
        let ValidPrice = this.state.ValidPrice;

        switch (field) {
            case "CargoType":
                ValidCargoType = (value !== "");
                Errors.CargoType = ValidCargoType ? "" : "Cargo type is required.";
                break;
            case "CargoWeight":
                ValidCargoWeight = (value !== "");
                Errors.CargoWeight = ValidCargoWeight ? "" : "Cargo weight is required.";

                if (Errors.CargoWeight !== "") {
                    break;
                }

                ValidCargoWeight = (value >= 100);
                Errors.CargoWeight = ValidCargoWeight ? "" : "Cargo weight must be greater than 100 lbs.";
                break;
            case "LoadingPlace":
                ValidLoadingPlace = (value !== "");
                Errors.LoadingPlace = ValidLoadingPlace ? "" : "Loading place is required.";
                break;
            case "UnloadingPlace":
                ValidUnloadingPlace = (value !== "");
                Errors.UnloadingPlace = ValidUnloadingPlace ? "" : "Unloading place is required.";
                break;
            case "LoadingDate":
                ValidLoadingDate = (value !== "");
                Errors.LoadingDate = ValidLoadingDate ? "" : "Loading date is required.";

                if (Errors.LoadingDate !== "") {
                    break;
                }

                ValidLoadingDate = (new Date(value) >= new Date());
                Errors.LoadingDate = ValidLoadingDate ? "" : "Loading date must be later than yesterday.";
                break;
            case "LoadingTime":
                break;
            case "AcceptedDelay":
                ValidAcceptedDelay = (value !== "");
                Errors.AcceptedDelay = ValidAcceptedDelay ? "" : "Accepted delay is required.";

                if (Errors.AcceptedDelay !== "") {
                    break;
                }

                ValidAcceptedDelay = (value >= 0 && value <= 48);
                Errors.AcceptedDelay = ValidAcceptedDelay ? "" : "Accepted delay can be in the range of 0 to 48 hours.";
                break;
            case "Price":
                ValidPrice = (value !== "");
                Errors.Price = ValidPrice ? "" : "Price is required.";

                if (Errors.Price !== "") {
                    break;
                }

                ValidPrice = (value > 0.00);
                Errors.Price = ValidPrice ? "" : "Price must be more than $0.00.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidCargoType: ValidCargoType,
            ValidCargoWeight: ValidCargoWeight,
            ValidLoadingPlace: ValidLoadingPlace,
            ValidUnloadingPlace: ValidUnloadingPlace,
            ValidLoadingDate: ValidLoadingDate,
            ValidLoadingTime: ValidLoadingTime,
            ValidAcceptedDelay: ValidAcceptedDelay,
            ValidPrice: ValidPrice
        }, () => {
            this.setState({
                ValidForm: this.state.ValidCargoType &&
                    this.state.ValidCargoWeight &&
                    this.state.ValidLoadingPlace &&
                    this.state.ValidUnloadingPlace &&
                    this.state.ValidLoadingDate &&
                    this.state.ValidLoadingTime &&
                    this.state.AcceptedDelay &&
                    this.state.ValidPrice
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedJobOffer = {
            Token: localStorage.Token,
            JobOfferID: this.state.JobOfferID,
            TripType: this.state.TripType,
            CargoType: this.state.CargoType,
            CargoWeight: this.state.CargoWeight,
            LoadingPlace: this.state.LoadingPlace,
            UnloadingPlace: this.state.UnloadingPlace,
            LoadingDate: this.state.LoadingDate,
            LoadingTime: this.state.LoadingTime,
            EntryExit: this.state.EntryExit,
            Price: this.state.Price,
            AcceptedDelay: this.state.AcceptedDelay,
            JobOfferType: this.state.JobOfferType
        };

        console.log("Going to update Job offer.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateJobOffer(updatedJobOffer).then(response => {
            if (response.Message === "Job offer is updated.") {
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
            <div className="modal" id={`edit-job-offer-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <section>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="modal-header">
                                    <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                    <div className="type-h3">Edit Job Offer</div>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                                    alt="job_offfers.png" src="./images/job_offers.png" data-source-index="2" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Loading Place</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="LoadingPlace" className="form-control" autoComplete="off"
                                                    value={this.state.LoadingPlace} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.LoadingPlace}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Unloading Place</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="UnloadingPlace" className="form-control" autoComplete="off"
                                                    value={this.state.UnloadingPlace} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.UnloadingPlace}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Trip Type</label><br />
                                                <div className="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                                    <button id="example-dropdown" className="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                        aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                        <span>{this.state.TripType}</span>
                                                        <span className="caret"></span>
                                                    </button>
                                                    <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                        <li><a onClick={() => { this.setState({ TripType: "One Way" }); }}>One Way</a></li>
                                                        <li><a onClick={() => { this.setState({ TripType: "Two Way" }); }}>Two Way</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Cargo Type</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="CargoType" className="form-control" autoComplete="off"
                                                    value={this.state.CargoType} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.CargoType}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Cargo Weight (lbs)</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" name="CargoWeight" className="form-control" autoComplete="off"
                                                    value={this.state.CargoWeight} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.CargoWeight}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Loading Date</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="date" name="LoadingDate" className="form-control" autoComplete="off"
                                                    value={this.state.LoadingDate} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.LoadingDate}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Loading Time</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="time" name="LoadingTime" className="form-control" autoComplete="off"
                                                    value={this.state.LoadingTime} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.LoadingTime}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Accepted Delay (Hours)</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" name="AcceptedDelay" className="form-control" autoComplete="off"
                                                    value={this.state.AcceptedDelay} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.AcceptedDelay}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Price (USD)</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                    className="form-control" autoComplete="off" value={this.state.Price} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <button type="button" data-toggle="button" className={(this.state.JobOfferType === "Auctionable") ? "btn btn-toggle-switch active" : "btn btn-toggle-switch"}
                                                    autocomplete="off" aria-pressed={(this.state.JobOfferType === "Auctionable") ? "true" : "false"}
                                                    onClick={() => {
                                                        this.state.JobOfferType = (this.state.JobOfferType === "Fixed-Price") ?
                                                            "Auctionable" : "Fixed-Price";
                                                        this.validateField("", "");
                                                    }}>
                                                    <span className="stateLabel stateLabel-on">Auctionable Job Offer</span>
                                                    <span className="stateLabel stateLabel-off">Fixed-Price Job Offer</span>
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                <div className="checkbox">
                                                    <label className="control-label">
                                                        <input type="checkbox" name="EntryExit" defaultChecked={(this.state.EntryExit === 1) ? "checked" : ""}
                                                            value={this.state.EntryExit} onChange={() => {
                                                                this.state.EntryExit = (this.state.EntryExit === 1) ? 0 : 1;
                                                                this.validateField("", "");
                                                            }}></input>
                                                        <span>Entry/Exit</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-default" data-dismiss="modal"
                                        ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                    <input type="submit" value="Update" className="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default EditJobOfferDialog;