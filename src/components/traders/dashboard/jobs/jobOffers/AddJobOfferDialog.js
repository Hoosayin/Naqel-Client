import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader.js";
import PlaceInput from "../../../../../controls/PlaceInput";
import { addJobOffer } from "../../../TraderFunctions.js";

class AddJobOfferDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: null,
            UnloadingPlace: null,
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
            ShowPreloader: null,

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
        let {
            Errors,
            ValidCargoType,
            ValidCargoWeight,
            ValidLoadingDate,
            ValidLoadingTime,
            ValidAcceptedDelay,
            ValidPrice
        } = this.state;

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
            ValidLoadingDate: ValidLoadingDate,
            ValidLoadingTime: ValidLoadingTime,
            ValidAcceptedDelay: ValidAcceptedDelay,
            ValidPrice: ValidPrice
        }, () => {
                this.setState({
                    ValidForm: ValidCargoType &&
                        ValidCargoWeight &&
                        ValidLoadingDate &&
                        ValidLoadingTime &&
                        ValidAcceptedDelay &&
                        ValidPrice
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        if (!this.state.LoadingPlace) {
            let {
                Errors
            } = this.state;

            Errors.LoadingPlace = "Loading place is required.";

            this.setState({
                Errors: Errors
            });

            return;
        }

        if (!this.state.UnloadingPlace) {
            let {
                Errors
            } = this.state;

            Errors.UnloadingPlace = "Unloading place is required.";

            this.setState({
                Errors: Errors
            });

            return;
        }

        const newJobOffer = {
            Token: localStorage.Token,
            TripType: this.state.TripType,
            CargoType: this.state.CargoType,
            CargoWeight: this.state.CargoWeight,
            LoadingPlace: this.state.LoadingPlace.Address,
            LoadingLat: this.state.LoadingPlace.Lat,
            LoadingLng: this.state.LoadingPlace.Lng,
            UnloadingPlace: this.state.UnloadingPlace.Address,
            UnloadingLat: this.state.UnloadingPlace.Lat,
            UnloadingLng: this.state.UnloadingPlace.Lng,
            LoadingDate: this.state.LoadingDate,
            LoadingTime: this.state.LoadingTime,
            EntryExit: this.state.EntryExit,
            Price: this.state.Price,
            AcceptedDelay: this.state.AcceptedDelay,
            JobOfferType: this.state.JobOfferType
        };

        console.log("Going to add Job offer.");

        this.setState({
            ShowPreloader: true
        });

        await addJobOffer(newJobOffer).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Job offer is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        let {
            TripType,
            CargoType,
            CargoWeight,
            LoadingDate,
            LoadingTime,
            AcceptedDelay,
            Price,
            JobOfferType,
            EntryExit,
            ValidForm,
            ShowPreloader,
            Errors,
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id="add-job-offer-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
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
                                        <div className="type-h3 color-default p-t-xxs">Add Job Offer</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">Loading Place</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <PlaceInput Address=""
                                                        OnPlaceSelected={place => {
                                                            this.setState({
                                                                LoadingPlace: place,
                                                            });
                                                        }} />
                                                    <span className="text-danger">{Errors.LoadingPlace}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Unloading Place</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <PlaceInput Address=""
                                                        OnPlaceSelected={place => {
                                                            this.setState({
                                                                UnloadingPlace: place,
                                                            });
                                                        }} />
                                                    <span className="text-danger">{Errors.UnloadingPlace}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">Trip Type</label><br />
                                                    <div className="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                                        <button id="example-dropdown" className="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                            aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                            <span>{TripType}</span>
                                                            <span className="caret"></span>
                                                        </button>
                                                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                            <li><a onClick={() => { this.setState({ TripType: "One Way" }); }}>One Way</a></li>
                                                            <li><a onClick={() => { this.setState({ TripType: "Two Way" }); }}>Two Way</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Cargo Type</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="CargoType" className="form-control" autoComplete="off"
                                                        value={CargoType} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.CargoType}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Cargo Weight (lbs)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="CargoWeight" className="form-control" autoComplete="off"
                                                        value={CargoWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.CargoWeight}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Loading Date</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="LoadingDate" className="form-control" autoComplete="off"
                                                        value={LoadingDate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.LoadingDate}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">Loading Time</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="time" name="LoadingTime" className="form-control" autoComplete="off"
                                                        value={LoadingTime} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.LoadingTime}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Accepted Delay (Hours)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="AcceptedDelay" className="form-control" autoComplete="off"
                                                        value={AcceptedDelay} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.AcceptedDelay}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Price (USD)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                        className="form-control" autoComplete="off" value={Price} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button type="button" data-toggle="button" className="btn btn-toggle-switch"
                                                        autocomplete="off" aria-pressed="false"
                                                        onClick={() => {
                                                            this.state.JobOfferType = (JobOfferType === "Fixed-Price") ?
                                                                "Auctionable" : "Fixed-Price";
                                                        }}>
                                                        <span className="stateLabel stateLabel-on">Auctionable Job Offer</span>
                                                        <span className="stateLabel stateLabel-off">Fixed-Price Job Offer</span>
                                                    </button>
                                                </div>
                                                <div className="form-group">
                                                    <div className="checkbox">
                                                        <label className="control-label">
                                                            <input type="checkbox" name="EntryExit"
                                                                value={EntryExit} onChange={() => {
                                                                    this.state.EntryExit = EntryExit ? false : true;
                                                                }}></input>
                                                            <span>Entry/Exit</span>
                                                        </label>
                                                    </div>
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

export default AddJobOfferDialog;