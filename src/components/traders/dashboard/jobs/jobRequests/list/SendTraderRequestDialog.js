import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { addTraderRequest } from "../../../../TraderFunctions.js";

class SendTraderRequestDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CargoType: "",
            CargoWeight: 0,          
            LoadingDate: new Date(),
            LoadingTime: new Date().getTime(),
            AcceptedDelay: 0,
            EntryExit: 0,

            ValidCargoType: false,
            ValidCargoWeight: false,
            ValidLoadingDate: false,
            ValidLoadingTime: false,
            ValidAcceptedDelay: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                CargoType: "",
                CargoWeight: "",
                LoadingDate: "",
                LoadingTime: "",
                AcceptedDelay: ""
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
        let ValidLoadingDate = this.state.ValidLoadingDate;
        let ValidLoadingTime = this.state.ValidLoadingTime;
        let ValidAcceptedDelay = this.state.ValidAcceptedDelay;

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
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidCargoType: ValidCargoType,
            ValidCargoWeight: ValidCargoWeight,
            ValidLoadingDate: ValidLoadingDate,
            ValidLoadingTime: ValidLoadingTime,
            ValidAcceptedDelay: ValidAcceptedDelay
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidCargoType &&
                        this.state.ValidCargoWeight &&
                        this.state.ValidLoadingDate &&
                        this.state.ValidLoadingTime &&
                        this.state.AcceptedDelay
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

        const newTraderRequest = {
            Token: localStorage.Token,
            JobRequestID: this.props.JobRequest.JobRequestID,
            CargoType: this.state.CargoType,
            CargoWeight: this.state.CargoWeight,
            LoadingDate: this.state.LoadingDate,
            LoadingTime: this.state.LoadingTime,
            EntryExit: this.state.EntryExit,
            AcceptedDelay: this.state.AcceptedDelay
        };

        console.log("Going to add trader request...");

        this.setState({
            Preloader: <Preloader />
        });

        await addTraderRequest(newTraderRequest).then(response => {
            if (response.Message === "Trader request is added.") {

                this.setState({
                    Preloader: null
                });

                this.cancelButton.click();
                this.props.OnOK(response.TraderRequest);
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
            <div className="modal modal-center-vertical" id={`send-trader-reqeust-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
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
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.SendRequest}</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CargoType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="CargoType" className="form-control" autoComplete="off"
                                                        value={this.state.CargoType} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.CargoType}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CargoWeight}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="CargoWeight" className="form-control" autoComplete="off"
                                                        value={this.state.CargoWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.CargoWeight}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.AcceptedDelay}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="AcceptedDelay" className="form-control" autoComplete="off"
                                                        value={this.state.AcceptedDelay} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.AcceptedDelay}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.LoadingDate}</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="date" name="LoadingDate" className="form-control" autoComplete="off"
                                                        value={this.state.LoadingDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.LoadingDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.LoadingTime}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="time" name="LoadingTime" className="form-control" autoComplete="off"
                                                        value={this.state.LoadingTime} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.LoadingTime}</span>
                                                </div>
                                                <div className="form-group">
                                                    <div className="checkbox">
                                                        <label className="control-label">
                                                            <input type="checkbox" name="EntryExit"
                                                                value={this.state.EntryExit} onChange={() => {
                                                                    this.state.EntryExit = this.state.EntryExit ? 0 : 1;
                                                                }}></input>
                                                            <span>{Dictionary.EntryExit}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Send} className="btn btn-primary" disabled={!this.state.ValidForm} />
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
        SendRequest: "ارسل طلب",
        CargoType: "نوع البضائع",
        CargoWeight: "(وزن الشحنة (رطل",
        AcceptedDelay: "(التأخير المقبول (ساعات",
        LoadingDate: "تاريخ التحميل",
        LoadingTime: "وقت التحميل",
        EntryExit: "الدخول / الخروج",
        Send: "إرسال",
        CargoTypeError: ".نوع البضائع مطلوب",
        CargoWeightError1: ".وزن البضائع مطلوب",
        CargoWeightError2: ".يجب أن يكون وزن البضائع أكبر من 100 رطل",
        LoadingDateError1: ".تاريخ التحميل مطلوب",
        LoadingDateError2: ".يجب أن يكون تاريخ التحميل في وقت متأخر عن الأمس",
        LoadingTimeError: ".وقت التحميل مطلوب",
        AcceptedDelayError1: ".مطلوب التأخير المقبول",
        AcceptedDelayError2: ".يمكن أن يتراوح التأخير المقبول بين 0 و 48 ساعة",
    };
}
else {
    Dictionary = {
        SendRequest: "Send Request",
        CargoType: "Cargo Type",
        CargoWeight: "Cargo Weight (lbs)",
        AcceptedDelay: "Accepted Delay (Hours)",
        LoadingDate: "Loading Date",
        LoadingTime: "Loading Time",
        EntryExit: "Entry/Exit",
        Send: "Send",
        CargoTypeError: "Cargo type is required.",
        CargoWeightError1: "Cargo weight is required.",
        CargoWeightError2: "Cargo weight must be greater than 100 lbs.",
        LoadingDateError1: "Loading date is required.",
        LoadingDateError2: "Loading date must be later than yesterday.",
        LoadingTimeError: "Loading time is required.",
        AcceptedDelayError1: "Accepted delay is required.",
        AcceptedDelayError2: "Accepted delay can be in the range of 0 to 48 hours.",
    };
}

export default SendTraderRequestDialog;