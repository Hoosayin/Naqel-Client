import React, { Component } from "react";
import CountryList from "iso-3166-country-list";
import Preloader from "../../../../../controls/Preloader.js";
import LocationPicker from "../../../../../controls/LocationPicker";
import Strings from "../../../../../res/strings";
import { addJobOffer } from "../../../TraderFunctions.js";
import { getPublicData } from "../../../../shared/UserFunctions";

class AddJobOfferDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: {
                Lat: 24.642132551799346,
                Lng: 46.718101978759776,
                Place: "شارع الغرابي، حي، Al Amal, Riyadh 12643, Saudi Arabia"
            },
            UnloadingPlace: {
                Lat: 24.62208132788588,
                Lng: 46.73878717468263,
                Place: "4179 Ammar Bin Yasir St, Ghubairah, Riyadh 12664 7229, Saudi Arabia"
            },
            TripType: "One Way",
            CargoType: "",
            CargoWeight: 0, 
            DriverNationalities: "| Any Nationality |",
            TruckTypes: "| Any Truck Type |",
            TruckSizes: "| Any Truck Size |",         
            LoadingDate: new Date(),
            LoadingTime: new Date().getTime(),
            AcceptedDelay: 0,
            PermitType: "",
            Price: 0.00,
            WaitingTime: 48,
            JobOfferType: "Fixed-Price",
            EntryExit: 0,
            ValidCargoType: false,
            ValidCargoWeight: false,
            ValidLoadingPlace: false,
            ValidUnloadingPlace: false,
            ValidLoadingDate: false,
            ValidLoadingTime: false,
            ValidAcceptedDelay: true,
            ValidPrice: false,

            TruckTypesList: [],
            TruckSizesList: [],
            WaitingTimesList: [],
            PermitTypes: [],

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

    async componentDidMount () {
        if (localStorage.Token) {
            let request = {
                Get: "TruckTypes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Truck types found.") {
                    this.setState({
                        TruckTypesList: response.TruckTypes
                    });
                }
                else {
                    this.setState({
                        TruckTypesList: []
                    });
                }
            });

            request = {
                Get: "TruckSizes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Truck sizes found.") {
                    this.setState({
                        TruckSizesList: response.TruckSizes
                    });
                }
                else {
                    this.setState({
                        TruckSizesList: []
                    });
                }
            });

            request = {
                Get: "WaitingTimes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Waiting times found.") {
                    this.setState({
                        WaitingTimesList: response.WaitingTimes
                    });
                }
                else {
                    this.setState({
                        WaitingTimesList: []
                    });
                }
            });

            request = {
                Get: "PermitTypes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Permit types found.") {
                    this.setState({
                        PermitTypes: response.PermitTypes,
                        PermitType: response.PermitTypes[0].PermitType,
                    });
                }
                else {
                    this.setState({
                        PermitTypes: [],
                        PermitType: "No Permit Type"
                    });
                }
            });
        }
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

        const newJobOffer = {
            Token: localStorage.Token,
            TripType: this.state.TripType,
            CargoType: this.state.CargoType,
            CargoWeight: this.state.CargoWeight,
            DriverNationalities: this.state.DriverNationalities,
            TruckTypes: this.state.TruckTypes,
            TruckSizes: this.state.TruckSizes,
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
            WaitingTime: parseInt(this.state.WaitingTime),
            AcceptedDelay: this.state.AcceptedDelay,
            PermitType: this.state.PermitType,
            JobOfferType: this.state.JobOfferType
        };

        console.log("Going to add Job offer.");
        console.log(newJobOffer);

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

                this.setState({
                    LoadingPlace: {
                        Lat: 24.642132551799346,
                        Lng: 46.718101978759776,
                        Place: "شارع الغرابي، حي، Al Amal, Riyadh 12643, Saudi Arabia"
                    },
                    UnloadingPlace: {
                        Lat: 24.62208132788588,
                        Lng: 46.73878717468263,
                        Place: "4179 Ammar Bin Yasir St, Ghubairah, Riyadh 12664 7229, Saudi Arabia"
                    },
                    TripType: "One Way",
                    CargoType: "",
                    CargoWeight: 0, 
                    DriverNationalities: "| Any Nationality |", 
                    TruckTypes: "| Any Truck Type |",
                    TruckSizes: "| Any Truck Size |",         
                    LoadingDate: new Date(),
                    LoadingTime: new Date().getTime(),
                    AcceptedDelay: 0,
                    PermitPlace: "",
                    Price: 0.00,
                    WaitingTime: 48,
                    JobOfferType: "Fixed-Price",
                    EntryExit: 0,
        
                    ValidCargoType: false,
                    ValidCargoWeight: false,
                    ValidLoadingPlace: false,
                    ValidUnloadingPlace: false,
                    ValidLoadingDate: false,
                    ValidLoadingTime: false,
                    ValidAcceptedDelay: true,
                    ValidPrice: false,
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
                        WaitingTime: ""
                    },
                });
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
            DriverNationalities,
            TruckSizes,
            TruckTypes,
            LoadingDate,
            LoadingTime,
            AcceptedDelay,
            PermitType,
            Price,
            WaitingTime,
            JobOfferType,
            EntryExit,
            ValidForm,
            ShowPreloader,
            Errors,
            TruckSizesList,
            TruckTypesList,
            WaitingTimesList,
            PermitTypes
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
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.AddJobOffer}</div>
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
                                                    <label className="control-label">{Dictionary.CargoWeight}</label>
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
                                                    <select class="form-control"
                style={{
                    width: "100%",
                    maxWidth: "296px",
                    minWidth: "88px"
                }}
                onChange={event => {
                    this.setState({
                        WaitingTime: event.target.value
                    });
                }}>
                {WaitingTimesList.map((waitingTime, index) => {
                    return <option key={index} value={waitingTime.WaitingTime}>{waitingTime.WaitingTime}</option>;
                })}
            </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.PermitType}</label>
                                                    <select class="form-control"
                                                        style={{
                                                            width: "100%",
                                                            maxWidth: "296px",
                                                            minWidth: "193px"
                                                        }}
                                                        onChange={event => {
                                                            this.setState({
                                                                PermitType: event.target.value
                                                            }, this.validateField("", ""));
                                                        }}
                                                        value={this.state.PermitType}>
                                                        {PermitTypes.map((type, index) => {
                                                            return <option key={index} value={type.PermitType}>{type.PermitType}</option>;
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" data-toggle="button" className={JobOfferType === "Fixed-Price" ? 
                                                        "btn btn-toggle-switch" : "btn btn-toggle-switch active"}
                                                        autocomplete="off" aria-pressed="false"
                                                        onClick={() => {
                                                            this.setState({
                                                                JobOfferType: (this.state.JobOfferType === "Fixed-Price") ?
                                                                "Auctionable" : "Fixed-Price"
                                                            });

                                                            console.log(this.state.JobOfferType);
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
                                                            this.setState({
                                                                EntryExit: EntryExit ?
                                                                false : true
                                                            });
                                                        }}>
                                                        <span className="stateLabel stateLabel-on">{Dictionary.EntryExit}</span>
                                                        <span className="stateLabel stateLabel-off">{Dictionary.NoEntryExit}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-t-xxs">
                                            <div className="col-md-8">
                                            <div class="form-group">
                                                <label className="control-label">{Dictionary.DriverNationalities}</label>
            <select multiple class="form-control" 
            style={{
                width: "100%",
                maxWidth: "296px",
                minWidth: "88px"
            }}
            onChange={event => {
                let driverNationalities = "|";
                let options = event.target.options;

                for (let option of options) {              
                  if (option.selected) {
                    driverNationalities += ` ${option.value || option.text} |`;
                  }
                }

                this.setState({
                    DriverNationalities: driverNationalities
                });
            }}>
                <option value="Any Naitonality" selected>Any Nationality</option>
                {CountryList.names.map((name, index) => {
                    return <option key={index} value={name}>{name}</option>;
                })}
            </select>
            <label className="control-label p-xxxs"
                                            style={{
                                                width: "100%",
                                                maxWidth: "296px",
                                                minWidth: "88px"
                                            }}>{DriverNationalities}</label>
        </div>
                                            </div>
                                            <div className="col-md-8">
                                            <div class="form-group">
                                                <label className="control-label">{Dictionary.TruckSizes}</label>
            <select multiple class="form-control" 
            style={{
                width: "100%",
                maxWidth: "296px",
                minWidth: "88px"
            }}
            onChange={event => {
                let truckSizes = "|";
                let options = event.target.options;

                for (let option of options) {              
                  if (option.selected) {
                    truckSizes += ` ${option.value || option.text} |`;
                  }
                }

                this.setState({
                    TruckSizes: truckSizes
                });
            }}>
                <option value="Any Truck Size" selected>Any Truck Size</option>
                {TruckSizesList.map((truckSize, index) => {
                    return <option key={index} value={`${truckSize.TruckSize} KG`}>{`${truckSize.TruckSize} KG`}</option>;
                })}
            </select>
            <label className="control-label p-xxxs"
                                            style={{
                                                width: "100%",
                                                maxWidth: "296px",
                                                minWidth: "88px"
                                            }}>{TruckSizes}</label>
        </div>
                                            </div>
                                            <div className="col-md-8">
                                            <div class="form-group">
                                                <label className="control-label">{Dictionary.TruckTypes}</label>
            <select multiple class="form-control" 
            style={{
                width: "100%",
                maxWidth: "296px",
                minWidth: "88px"
            }}
            onChange={event => {
                let truckTypes = "|";
                let options = event.target.options;

                for (let option of options) {              
                  if (option.selected) {
                    truckTypes += ` ${option.value || option.text} |`;
                  }
                }

                this.setState({
                    TruckTypes: truckTypes
                });
            }}>
                <option value="Any Truck Type" selected>Any Truck Type</option>
                {TruckTypesList.map((truckType, index) => {
                    return <option key={index} value={truckType.TruckType}>{truckType.TruckType}</option>;
                })}
            </select>
            <label className="control-label p-xxxs"
                                            style={{
                                                width: "100%",
                                                maxWidth: "296px",
                                                minWidth: "88px"
                                            }}>{TruckTypes}</label>
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
                                                        });
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
                                                        });
                                                    }} />
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Add} className="btn btn-primary" disabled={!ValidForm} />
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

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        AddJobOffer: "إضافة عرض عمل",
        TripType: "نوع الرحلة",
        OneWay: "اتجاه واحد",
        TwoWay: "اتجاهين",
        CargoType: "نوع البضائع",
        CargoWeight: "(وزن البضائع (كغالعلامة",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        AcceptedDelay: "(التأخير المقبول (ساعات",
        Price: "السعر",
        WaitingTime: "(وقت الانتظار (ساعات",
        AuctionableJobOffer: "عرض عمل قابل للمزايدة",
        FixedPriceJobOffer: "عرض عمل بسعر ثابت",
        EntryExit: "الدخول / الخروج",
        NoEntryExit: "لا دخول / خروج",
        Add: "أضف",
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
        WaitingTimeError2: ".يجب أن يكون وقت الانتظار أكثر من 47 ساعة",
        PermitType: "نوع التصريح",
        DriverNationalities: "جنسيات السائقين",
        TruckTypes: "أنواع الشاحنات",
        TruckSizes: "أحجام الشاحنات",
    };
}
else {
    Dictionary = {
        AddJobOffer: "Add job Offer",
        TripType: "Trip Type",
        OneWay: "One Way",
        TwoWay: "Two Way",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight (KG)",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        AcceptedDelay: "Accepted Delay (Hours)",
        Price: "Price",
        WaitingTime: "Waiting Time (Hours)",
        AuctionableJobOffer: "Auctionable Job Offer",
        FixedPriceJobOffer: "Fixed-Price Job Offer",
        EntryExit: "Entry/Exit",
        NoEntryExit: "No Entry/Exit",
        Add: "Add",
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
        WaitingTimeError2: "Waiting time must be more than 47 hours.",
        PermitType: "Permit Type",
        DriverNationalities: "Driver Nationalities",
        TruckTypes: "Truck Types",
        TruckSizes: "Truck Sizes",
    };
}

export default AddJobOfferDialog;