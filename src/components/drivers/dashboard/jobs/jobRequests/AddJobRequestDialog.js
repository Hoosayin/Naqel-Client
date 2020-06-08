import React, { Component } from "react";
import PlaceInput from "../../../../../controls/PlaceInput";
import Preloader from "../../../../../controls/Preloader.js";
import Strings from "../../../../../res/strings";
import { addJobRequest } from "../../../DriverFunctions.js";

class AddJobRequestDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LoadingPlace: null,
            UnloadingPlace: null,
            TripType: "One Way",
            Price: 0.00,

            ValidLoadingPlace: false,
            ValidUnloadingPlace: false,
            ValidPrice: false,

            ValidForm: false,
            ShowPreloader: false,

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
        let {
            Errors,
            ValidPrice
        } = this.state;

        switch (field) {
            case "Price":
                ValidPrice = (value > 0.00);
                Errors.Price = ValidPrice ? "" : "Price must be more than $0.00.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPrice: ValidPrice
        }, () => {
                this.setState({
                    ValidForm: ValidPrice
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

        this.setState({
            ShowPreloader: true
        });

        const newJobRequest = {
            Token: localStorage.Token,
            LoadingPlace: this.state.LoadingPlace.Address,
            LoadingLat: this.state.LoadingPlace.Lat,
            LoadingLng: this.state.LoadingPlace.Lng,
            UnloadingPlace: this.state.UnloadingPlace.Address,
            UnloadingLat: this.state.UnloadingPlace.Lat,
            UnloadingLng: this.state.UnloadingPlace.Lng,
            TripType: this.state.TripType,
            Price: this.state.Price
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
            Price,
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
                                        <div className="type-h3 color-default p-t-xxs">Add Job Request</div>
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
                                                    <label className="control-label">{`Price (${Strings.SAUDI_RIYAL})`}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" min="0.00" step="0.01" max="100.00" name="Price"
                                                        className="form-control" autoComplete="off" value={Price} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Price}</span>
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

export default AddJobRequestDialog;