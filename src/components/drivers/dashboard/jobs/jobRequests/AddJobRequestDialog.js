import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader.js";
import Strings from "../../../../../res/strings";
import PlacePicker from "../../../../../controls/PlacePicker";
import LocationPicker from "../../../../../controls/LocationPicker";
import { addJobRequest } from "../../../DriverFunctions.js";

class AddJobRequestDialog extends Component {
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
            Price: 0,
            WaitingTime: 48,

            ValidLoadingPlace: false,
            ValidUnloadingPlace: false,
            ValidPrice: false,
            ValidWaitingTime: true,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                LoadingPlace: "",
                UnloadingPlace: "",
                Price: "",
                WaitingTime: "",
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
        let {
            Errors,
            ValidPrice,
            ValidWaitingTime
        } = this.state;

        switch (field) {
            case "Price":
                ValidPrice = (value > 0.00);
                Errors.Price = ValidPrice ? "" : Dictionary.PriceError;
                break;
            case "WaitingTime":
                ValidWaitingTime = (value !== "");
                Errors.WaitingTime = ValidWaitingTime ? "" : Dictionary.WatingTimeError1;

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
            ValidPrice: ValidPrice,
            ValidWaitingTime: ValidWaitingTime
        }, () => {
                this.setState({
                    ValidForm: ValidPrice && ValidWaitingTime
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

        const newJobRequest = {
            Token: sessionStorage.Token,
            LoadingPlace: this.state.LoadingPlace.Place,
            LoadingLat: this.state.LoadingPlace.Lat,
            LoadingLng: this.state.LoadingPlace.Lng,
            UnloadingPlace: this.state.UnloadingPlace.Place,
            UnloadingLat: this.state.UnloadingPlace.Lat,
            UnloadingLng: this.state.UnloadingPlace.Lng,
            TripType: this.state.TripType,
            Price: this.state.Price,
            WaitingTime: this.state.WaitingTime,
        };

        await addJobRequest(newJobRequest).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Job request is added.") {
                this.cancelButton.click();
                this.props.OnOK();
            }
        });
    }

    render() {
        let {
            TripType,
            LoadingPlace,
            UnloadingPlace,
            Price,
            WaitingTime,
            Errors,
            ShowPreloader,
            ValidForm
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id="add-job-request-dialog"
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
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.AddJobRequest}</div>
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
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{`${Dictionary.Price} (${Strings.SAUDI_RIYAL})`}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0"  name="Price"
                                                        className="form-control" autoComplete="off" value={Price} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Price}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.WaitingTime}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="48" name="WaitingTime"
                                                        className="form-control" autoComplete="off" value={WaitingTime} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.WaitingTime}</span>
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

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        AddJobRequest: "إضافة طلب وظيفة",
        LoadingPlace: "مكان التحميل",
        UnloadingPlace: "مكان التفريغ",
        TripType: "نوع الرحلة",
        OneWay: "اتجاه واحد",
        TwoWay: "اتجاهين",
        Price: "السعر",
        WaitingTime: "وقت الانتظار - ساعات",
        Add: "أضف",
        PriceError: "يجب أن يكون السعر أكثر من 0 ريال.",
        WatingTimeError1: "مطلوب وقت الانتظار.",
        WaitingTimeError2: "يجب أن يكون وقت الانتظار أكثر من 47 ساعة.",
        LoadingPlaceError: "مطلوب مكان التحميل.",
        UnloadingPlaceError: "مطلوب مكان التفريغ."
    };
}
else {
    Dictionary = {
        AddJobRequest: "Add Job Request",
        LoadingPlace: "Loading Place",
        UnloadingPlace: "Unloading Place",
        TripType: "Trip Type",
        OneWay: "One Way",
        TwoWay: "Two Way",
        Price: "Price",
        WaitingTime: "Waiting Time (Hours)",
        Add: "Add",
        PriceError: "Price must be more than 0 SR.",
        WatingTimeError1: "Waiting time is required.",
        WaitingTimeError2: "Waiting time must be more than 47 hours.",
        LoadingPlaceError: "Loading place is required.",
        UnloadingPlaceError: "Unloading place is required."
    };
}

export default AddJobRequestDialog;