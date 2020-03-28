import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../controls/Preloader.js";
import { addJobOffer } from "../../../TraderFunctions.js";

class AddJobOfferDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: "",
            UnloadingPlace: "",
            TripType: "One Way",
            CargoType: "",
            CargoWeight: 0,          
            LoadingDate: new Date(),
            LoadingTime: new Date().getTime(),
            AcceptedDelay: 0,
            Price: 0.00,
            JobOfferType: "Fixed-Price",
            EntryExit: 0,

            ValidCargoType: false,
            ValidCargoWeight: false,
            ValidLoadingPlace: false,
            ValidUnloadingPlace: false,
            ValidLoadingDate: false,
            ValidLoadingTime: false,
            ValidAcceptedDelay: false,
            ValidPrice: false,

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

        if (name === "EntryExit" ||
            name === "JobOfferType") {
            console.log(`Value of ${name} is ${value}`);
        }
        

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
        let ValidAcceptedDelay = this.state.AcceptedDelay;
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
                ValidLoadingTime = (value !== "");
                Errors.LoadingTime = ValidLoadingTime ? "" : "Loading time is required.";
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

        const newJobOffer = {
            Token: localStorage.Token,
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

        console.log("Going to add Job offer.");

        this.setState({
            Preloader: <Preloader />
        });

        await addJobOffer(newJobOffer).then(response => {
            if (response.Message === "Job offer is added.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section className="text-left">
                <div className="modal" id="add-job-offer-dialog"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div className="type-h3">Add Job Offer</div>
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
                                                        value={this.state.LoadingDate} onChange={this.onChange} />
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
                                                    <button type="button" data-toggle="button" class="btn btn-toggle-switch"
                                                        autocomplete="off" aria-pressed="false"
                                                        onClick={() => {
                                                            this.state.JobOfferType = (this.state.JobOfferType === "Fixed-Price") ?
                                                                "Auctionable" : "Fixed-Price";
                                                        }}>
                                                        <span class="stateLabel stateLabel-on">Auctionable Job Offer</span>
                                                        <span class="stateLabel stateLabel-off">Fixed-Price Job Offer</span>
                                                    </button>
                                                </div>
                                                <div className="form-group">
                                                    <div className="checkbox">
                                                        <label className="control-label">
                                                            <input type="checkbox" name="EntryExit"
                                                                value={this.state.EntryExit} onChange={() => {
                                                                    this.state.EntryExit = this.state.EntryExit ? 0 : 1;
                                                                }}></input>
                                                            <span>Entry/Exit</span>
                                                        </label>
                                                    </div>
                                                </div>   
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Add" className="btn btn-primary" disabled={!this.state.ValidForm} />
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default AddJobOfferDialog;