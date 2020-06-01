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
                                        <div className="type-h3 color-default p-t-xxs">Send Request</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">Cargo Type</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="CargoType" className="form-control" autoComplete="off"
                                                        value={this.state.CargoType} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.CargoType}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Cargo Weight (lbs)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="CargoWeight" className="form-control" autoComplete="off"
                                                        value={this.state.CargoWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.CargoWeight}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Accepted Delay (Hours)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="AcceptedDelay" className="form-control" autoComplete="off"
                                                        value={this.state.AcceptedDelay} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.AcceptedDelay}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">Loading Date</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="date" name="LoadingDate" className="form-control" autoComplete="off"
                                                        value={this.state.LoadingDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.LoadingDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Loading Time</label>
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
                                                            <span>Entry/Exit</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Send" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default SendTraderRequestDialog;