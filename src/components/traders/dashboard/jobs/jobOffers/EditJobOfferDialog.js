import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader.js";
import LocationPicker from "../../../../../controls/LocationPicker";
import Strings from "../../../../../res/strings";
import { updateJobOffer } from "../../../TraderFunctions.js";

class EditJobOfferDialog extends Component {
    constructor(props) {
        super(props);

        const {
            JobOffer
        } = this.props;

        this.state = {
            LoadingPlace: {
                Place: JobOffer.LoadingPlace,
                Lat: JobOffer.LoadingLat,
                Lng: JobOffer.LoadingLng
            },
            UnloadingPlace: {
                Place: JobOffer.UnloadingPlace,
                Lat: JobOffer.UnloadingLat,
                Lng: JobOffer.UnloadingLng
            },
            TripType: JobOffer.TripType,
            CargoType: JobOffer.CargoType,
            CargoWeight: JobOffer.CargoWeight,
            LoadingDate: JobOffer.LoadingDate,
            LoadingTime: JobOffer.LoadingTime,
            AcceptedDelay: JobOffer.AcceptedDelay,
            Price: JobOffer.Price,
            WaitingTime: JobOffer.WaitingTime,
            JobOfferType: JobOffer.JobOfferType,
            EntryExit: JobOffer.EntryExit,

            ValidCargoType: true,
            ValidCargoWeight: true,
            ValidLoadingPlace: true,
            ValidUnloadingPlace: true,
            ValidLoadingDate: true,
            ValidLoadingTime: true,
            ValidAcceptedDelay: true,
            ValidPrice: true,
            ValidWaitingTime: true,

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
            ValidPrice,
            ValidWaitingTime
        } = this.state;

        switch (field) {
            case "CargoType":
                ValidCargoType = (value !== "");
                Errors.CargoType = ValidCargoType ? "" : Dictionary.CargoTypeError;
                break;
            case "CargoWeight":
                ValidCargoWeight = (value !== "");
                Errors.CargoWeight = ValidCargoWeight ? "" : Dictionary.CargoWeightError1;

                if (Errors.CargoWeight !== "") {
                    break;
                }

                ValidCargoWeight = (value >= 100);
                Errors.CargoWeight = ValidCargoWeight ? "" : Dictionary.CargoWeightError2;
                break;
            case "LoadingDate":
                ValidLoadingDate = (value !== "");
                Errors.LoadingDate = ValidLoadingDate ? "" : Dictionary.LoadingDateError1;

                if (Errors.LoadingDate !== "") {
                    break;
                }

                ValidLoadingDate = (new Date(value) >= new Date());
                Errors.LoadingDate = ValidLoadingDate ? "" : Dictionary.LoadingDateError2;
                break;
            case "LoadingTime":
                ValidLoadingTime = (value !== "");
                Errors.LoadingTime = ValidLoadingTime ? "" : Dictionary.LoadingTimeError;
                break;
            case "AcceptedDelay":
                ValidAcceptedDelay = (value !== "");
                Errors.AcceptedDelay = ValidAcceptedDelay ? "" : Dictionary.AcceptedDelayError1;

                if (Errors.AcceptedDelay !== "") {
                    break;
                }

                ValidAcceptedDelay = (value >= 0 && value <= 48);
                Errors.AcceptedDelay = ValidAcceptedDelay ? "" : Dictionary.AcceptedDelayError2;
                break;
            case "Price":
                ValidPrice = (value !== "");
                Errors.Price = ValidPrice ? "" : Dictionary.PriceError1;

                if (Errors.Price !== "") {
                    break;
                }

                ValidPrice = (value > 0.00);
                Errors.Price = ValidPrice ? "" : Dictionary.PriceError2;
                break;
            case "WaitingTime":
                ValidWaitingTime = (value !== "");
                Errors.WaitingTime = ValidWaitingTime ? "" : Dictionary.WaitingTimeError1;

                if (Errors.WaitingTime !== "") {
                    break;
                }

                ValidWaitingTime = (value >= 48);
                Errors.WaitingTime = ValidWaitingTime ? "" : Dictionary.WaitingTimeError2;
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
            ValidPrice: ValidPrice,
            ValidWaitingTime: ValidWaitingTime
        }, () => {
            this.setState({
                ValidForm: ValidCargoType &&
                    ValidCargoWeight &&
                    ValidLoadingDate &&
                    ValidLoadingTime &&
                    ValidAcceptedDelay &&
                    ValidPrice &&
                    ValidWaitingTime
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

        const updatedJobOffer = {
            Token: sessionStorage.Token,
            JobOfferID: this.props.JobOffer.JobOfferID,
            TripType: this.state.TripType,
            CargoType: this.state.CargoType,
            CargoWeight: this.state.CargoWeight,
            LoadingPlace: this.state.LoadingPlace.Place,
            LoadingLat: this.state.LoadingPlace.Lat,
            LoadingLng: this.state.LoadingPlace.Lng,
            UnloadingPlace: this.state.UnloadingPlace.Place,
            UnloadingLat: this.state.UnloadingPlace.Lat,
            UnloadingLng: this.state.UnloadingPlace.Lng,
            LoadingDate: this.state.LoadingDate,
            LoadingTime: this.state.LoadingTime,
            EntryExit: this.state.EntryExit,
            Price: this.state.Price,
            WaitingTime: this.state.WaitingTime,
            AcceptedDelay: this.state.AcceptedDelay,
            JobOfferType: this.state.JobOfferType
        };

        await updateJobOffer(updatedJobOffer).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Job offer is updated.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        let {
            LoadingPlace,
            UnloadingPlace,
            TripType,
            CargoType,
            CargoWeight,
            LoadingDate,
            LoadingTime,
            AcceptedDelay,
            Price,
            WaitingTime,
            JobOfferType,
            EntryExit,
            ValidCargoType,
            ValidCargoWeight,
            ValidLoadingDate,
            ValidLoadingTime,
            ValidAcceptedDelay,
            ValidPrice,
            ValidWaitingTime,
            ValidForm,
            ShowPreloader,
            Errors,
        } = this.state;

        const {
            DialogID
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`edit-job-offer-dialog-${DialogID}`}
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
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.EditJobOffer}</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.TripType}</label><br />
                                                    <div className="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                                        <button id="example-dropdown" className="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                            aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                            {this.state.TripType === "One Way" ? 
                                                            <span>{Dictionary.OneWay}</span> : 
                                                            <span>{Dictionary.TwoWay}</span>}
                                                            <span className="caret"></span>
                                                        </button>
                                                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                            <li><a onClick={() => { this.setState({ TripType: "One Way" }); }}>{Dictionary.OneWay}</a></li>
                                                            <li><a onClick={() => { this.setState({ TripType: "Two Way" }); }}>{Dictionary.TwoWay}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CargoType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="CargoType" className="form-control" autoComplete="off"
                                                        value={CargoType} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.CargoType}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CargoWeight})</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="CargoWeight" className="form-control" autoComplete="off"
                                                        value={CargoWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.CargoWeight}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.LoadingDate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="LoadingDate" className="form-control" autoComplete="off"
                                                        value={LoadingDate} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.LoadingDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.LoadingTime}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="time" name="LoadingTime" className="form-control" autoComplete="off"
                                                        value={LoadingTime} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.LoadingTime}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.AcceptedDelay}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="AcceptedDelay" className="form-control" autoComplete="off"
                                                        value={AcceptedDelay} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.AcceptedDelay}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{`${Dictionary.Price} (${Strings.SAUDI_RIYAL})`}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                        className="form-control" autoComplete="off" value={Price} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Price}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.WaitingTime}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="48" name="WaitingTime"
                                                        className="form-control" autoComplete="off" value={WaitingTime} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.WaitingTime}</span>
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" data-toggle="button" className={JobOfferType === "Fixed-Price" ? 
                                                        "btn btn-toggle-switch" : "btn btn-toggle-switch active"}
                                                        autocomplete="off" aria-pressed="false"
                                                        onClick={() => {
                                                            this.state.JobOfferType = (JobOfferType === "Fixed-Price") ?
                                                                "Auctionable" : "Fixed-Price";
                                                        }}>
                                                        <span className="stateLabel stateLabel-on">{Dictionary.AuctionableJobOffer}</span>
                                                        <span className="stateLabel stateLabel-off">{Dictionary.FixedPriceJobOffer}</span>
                                                    </button>
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" data-toggle="button" className={!EntryExit ?
                                                        "btn btn-toggle-switch" : "btn btn-toggle-switch active"}
                                                        autocomplete="off" aria-pressed="false"
                                                        onClick={() => {
                                                            this.state.EntryExit = EntryExit ?
                                                                this.setState({
                                                                    EntryExit: false
                                                                }, () => {
                                                                    this.setState({
                                                                        ValidForm: ValidCargoType &&
                                                                            ValidCargoWeight &&
                                                                            ValidLoadingDate &&
                                                                            ValidLoadingTime &&
                                                                            ValidAcceptedDelay &&
                                                                            ValidPrice &&
                                                                            ValidWaitingTime
                                                                    });
                                                                }) : this.setState({
                                                                    EntryExit: true
                                                                }, () => {
                                                                    this.setState({
                                                                        ValidForm: ValidCargoType &&
                                                                            ValidCargoWeight &&
                                                                            ValidLoadingDate &&
                                                                            ValidLoadingTime &&
                                                                            ValidAcceptedDelay &&
                                                                            ValidPrice &&
                                                                            ValidWaitingTime
                                                                    });
                                                                });
                                                        }}>
                                                        <span className="stateLabel stateLabel-on">{Dictionary.EntryExit}</span>
                                                        <span className="stateLabel stateLabel-off">{Dictionary.NoEntryExit}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-t-xxs">
                                            <div className="col-md-12">
                                                <LocationPicker
                                                    Label="Loading Place"
                                                    Icon="source"
                                                    Location={LoadingPlace}
                                                    OnLocationPicked={location => {
                                                        this.setState({
                                                            LoadingPlace: location
                                                        }, this.validateField("", ""));
                                                    }} />
                                            </div>
                                            <div className="col-md-12">
                                                <LocationPicker
                                                    Label="Unloading Place"
                                                    Icon="destination"
                                                    Location={UnloadingPlace}
                                                    OnLocationPicked={location => {
                                                        this.setState({
                                                            UnloadingPlace: location
                                                        }, this.validateField("", ""));
                                                    }} />
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Update} className="btn btn-primary" disabled={!ValidForm} />
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
        EditJobOffer: "تعديل عرض العمل",
        TripType: "نوع الرحلة",
        OneWay: "اتجاه واحد",
        TwoWay: "اتجاهين",
        CargoType: "نوع البضائع",
        CargoWeight: "(وزن الشحنة (رطل",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        AcceptedDelay: "(التأخير المقبول (ساعات",
        Price: "السعر",
        WaitingTime: "(وقت الانتظار (ساعات",
        AuctionableJobOffer: "عرض عمل قابل للمزاد",
        FixedPriceJobOffer: "عرض عمل بسعر ثابت",
        EntryExit: "الدخول / الخروج",
        NoEntryExit: "لا دخول / خروج",
        Update: "تحديث",
        CargoTypeError: ".نوع البضائع مطلوب",
        CargoWeightError1: ".وزن البضائع مطلوب",
        CargoWeightError2: ".يجب أن يكون وزن البضائع أكبر من 100 رطل",
        LoadingDateError1: ".تاريخ التحميل مطلوب",
        LoadingDateError2: ".يجب أن يكون تاريخ التحميل في وقت متأخر عن الأمس",
        LoadingTimeError: ".وقت التحميل مطلوب",
        AcceptedDelayError1: ".مطلوب التأخير المقبول",
        AcceptedDelayError2: ".يمكن أن يتراوح التأخير المقبول بين 0 و 48 ساعة",
        PriceError1: ".السعر مطلوب",
        PriceError2: ".يجب أن يكون السعر أكثر من 0 ريال",
        WaitingTimeError1: ".مطلوب وقت الانتظار",
        WaitingTimeError2: ".يجب أن يكون وقت الانتظار أكثر من 47 ساعة"
    };
}
else {
    Dictionary = {
        EditJobOffer: "Edit job Offer",
        TripType: "Trip Type",
        OneWay: "One Way",
        TwoWay: "Two Way",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight (lbs)",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        AcceptedDelay: "Accepted Delay (Hours)",
        Price: "Price",
        WaitingTime: "Waiting Time (Hours)",
        AuctionableJobOffer: "Auctionable Job Offer",
        FixedPriceJobOffer: "Fixed-Price Job Offer",
        EntryExit: "Entry/Exit",
        NoEntryExit: "No Entry/Exit",
        Update: "Update",
        CargoTypeError: "Cargo type is required.",
        CargoWeightError1: "Cargo weight is required.",
        CargoWeightError2: "Cargo weight must be greater than 100 lbs.",
        LoadingDateError1: "Loading date is required.",
        LoadingDateError2: "Loading date must be later than yesterday.",
        LoadingTimeError: "Loading time is required.",
        AcceptedDelayError1: "Accepted delay is required.",
        AcceptedDelayError2: "Accepted delay can be in the range of 0 to 48 hours.",
        PriceError1: "Price is required.",
        PriceError2: "Price must be more than 0 SR.",
        WaitingTimeError1: "Waiting time is required.",
        WaitingTimeError2: "Waiting time must be more than 47 hours."
    };
}

export default EditJobOfferDialog;