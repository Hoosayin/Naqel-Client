import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../controls/Preloader.js";
import Map from "../../../../../controls/Map.js";
import { updateJobRequest } from "../../../DriverFunctions.js";

class EditJobRequestDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: this.props.JobRequest.LoadingPlace,
            UnloadingPlace: this.props.JobRequest.UnloadingPlace,
            TripType: this.props.JobRequest.TripType,
            Price: this.props.JobRequest.Price,

            ValidLoadingPlace: true,
            ValidUnloadingPlace: true,
            ValidPrice: true,

            ValidForm: false,
            Preloader: null,

            Errors: {
                LoadingPlace: "",
                UnloadingPlace: "",
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
        let ValidLoadingPlace = this.state.ValidLoadingPlace;
        let ValidUnloadingPlace = this.state.ValidUnloadingPlace;
        let ValidPrice = this.state.ValidPrice;

        switch (field) {
            case "LoadingPlace":
                ValidLoadingPlace = (value !== "");
                Errors.LoadingPlace = ValidLoadingPlace ? "" : "Loading place is required.";
                break;
            case "UnloadingPlace":
                ValidUnloadingPlace = (value !== "");
                Errors.UnloadingPlace = ValidUnloadingPlace ? "" : "Unloading place is required.";
                break;
            case "Price":
                ValidPrice = (value > 0.00);
                Errors.Price = ValidPrice ? "" : "Price must be more than $0.00.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidLoadingPlace: ValidLoadingPlace,
            ValidUnloadingPlace: ValidUnloadingPlace,
            ValidPrice: ValidPrice
        }, () => {
            this.setState({
                ValidForm: this.state.LoadingPlace &&
                    this.state.ValidUnloadingPlace &&
                    this.state.ValidPrice
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedJobRequest = {
            Token: localStorage.getItem("userToken"),
            JobRequestID: this.props.JobRequest.JobRequestID,
            LoadingPlace: this.state.LoadingPlace,
            UnloadingPlace: this.state.UnloadingPlace,
            TripType: this.state.TripType,
            Price: this.state.Price,
        }

        console.log("Going to update Job Request.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateJobRequest(updatedJobRequest).then(response => {
            if (response.Message === "Job request is updated.") {
                localStorage.setItem("userToken", response.Token);
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }
    
    render() {
        return (
            <section class="text-left">
                <div class="modal" id={`edit-job-request-dialog-${this.props.DialogID}`}
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                        <div class="type-h3">Edit Job Request</div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="form-group">
                                                        <label class="control-label">Loading Place</label>
                                                        <span class="text-danger" style={Required}>*</span>
                                                        <input type="text" name="LoadingPlace" class="form-control" autoComplete="off"
                                                            value={this.state.LoadingPlace} onChange={this.onChange} />
                                                        <span class="text-danger">{this.state.Errors.LoadingPlace}</span>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label">Unloading Place</label>
                                                        <span class="text-danger" style={Required}>*</span>
                                                        <input type="text" name="UnloadingPlace" class="form-control" autoComplete="off"
                                                            value={this.state.UnloadingPlace} onChange={this.onChange} />
                                                        <span class="text-danger">{this.state.Errors.UnloadingPlace}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <div class="form-group">
                                                        <label class="control-label">Trip Type</label><br />
                                                        <div class="dropdown" style={{ width: "100%", maxWidth: "296px", }}>
                                                            <button id="example-dropdown" class="btn btn-dropdown dropdown-toggle" type="button" data-toggle="dropdown"
                                                                aria-haspopup="true" role="button" aria-expanded="false" style={{ width: "100%", }}>
                                                                <span>{this.state.TripType}</span>
                                                                <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-example">
                                                                <li><a onClick={() => { this.setState({ TripType: "One Way" }); }}>One Way</a></li>
                                                                <li><a onClick={() => { this.setState({ TripType: "Two Way" }); }}>Two Way</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label">Price (USD)</label>
                                                        <span class="text-danger" style={Required}>*</span>
                                                        <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                            class="form-control" autoComplete="off" value={this.state.Price} onChange={this.onChange} />
                                                        <span class="text-danger">{this.state.Errors.Price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-24">
                                                <Map />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Update" class="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default EditJobRequestDialog;