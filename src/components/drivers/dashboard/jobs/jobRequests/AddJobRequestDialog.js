import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles.js";
import Preloader from "../../../../../controls/Preloader.js";
import { addJobRequest } from "../../../DriverFunctions.js";
import Map from "../../../../../controls/Map.js";

class AddJobRequestDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: "",
            UnloadingPlace: "",
            TripType: "One Way",
            Price: 0.00,

            ValidLoadingPlace: false,
            ValidUnloadingPlace: false,
            ValidPrice: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                LoadingPlace: "",
                UnloadingPlace: "",
                Price: ""
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

        const newJobRequest = {
            Token: localStorage.Token,
            LoadingPlace: this.state.LoadingPlace,
            UnloadingPlace: this.state.UnloadingPlace,
            TripType: this.state.TripType,
            Price: this.state.Price
        };

        console.log("Going to add Job Request.");

        this.setState({
            Preloader: <Preloader />
        });

        await addJobRequest(newJobRequest).then(response => {
            if (response.Message === "Job request is added.") {
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
                <div className="modal" id="add-job-request-dialog"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div className="type-h3">Add Job Request</div>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
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
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
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
                                                    <div className="form-group">
                                                        <label className="control-label">Price (USD)</label>
                                                        <span className="text-danger" style={Required}>*</span>
                                                        <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                            className="form-control" autoComplete="off" value={this.state.Price} onChange={this.onChange} />
                                                        <span className="text-danger">{this.state.Errors.Price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-24">
                                                <Map />
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

export default AddJobRequestDialog;