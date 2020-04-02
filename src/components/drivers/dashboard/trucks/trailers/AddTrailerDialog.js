import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles";
import ImageUploader from "../../../../../controls/ImageUploader";
import Preloader from "../../../../../controls/Preloader.js";
import { addTrailer } from "../../../DriverFunctions.js";

class AddTrailerDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            MaximumWeight: "",
            PhotoURL: "./images/default_image.png",
            Type: "",

            ValidMaximumWeight: false,
            ValidPhotoURL: false,
            ValidType: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                MaximumWeight: "",
                PhotoURL: "",
                Type: ""
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

        let ValidMaximumWeight = this.state.ValidMaximumWeight;
        let ValidPhotoURL = this.state.ValidPhotoURL;
        let ValidType = this.state.ValidType;

        switch (field) {
            case "MaximumWeight":
                ValidMaximumWeight = (value !== "");
                Errors.MaximumWeight = ValidMaximumWeight ? "" : "Maximum Weight is required.";

                if (Errors.MaximumWeight !== "") {
                    break;
                }

                ValidMaximumWeight = (value >= 700);
                Errors.MaximumWeight = ValidMaximumWeight ? "" : "Maximum weight must be greater than 699.";
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : "Invalid Image. Please upload a correct one.";
                break;
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : "Type is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidMaximumWeight: ValidMaximumWeight,
            ValidPhotoURL: ValidPhotoURL,
            ValidType: ValidType
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidMaximumWeight &&
                        this.state.ValidPhotoURL &&
                        this.state.ValidType
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newTrailer = {
            Token: localStorage.Token,
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL,
            Type: this.state.Type
        }

        console.log("Going to add the trailer...");

        this.setState({
            Preloader: <Preloader />
        });

        await addTrailer(newTrailer).then(response => {
            if (response.Message === "Trailer is added.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section>
                <div className="modal" id="add-trailer-dialog"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div className="type-h3">New Trailer</div>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <ImageUploader Source={this.state.PhotoURL}
                                                        Height="220px" Width="220px"
                                                        OnImageUploaded={response => {
                                                            if (response.message === "Image uploaded successfully.") {
                                                                this.setState({
                                                                    PhotoURL: response.imageUrl
                                                                });

                                                                this.validateField("PhotoURL", this.state.PhotoURL);
                                                            }
                                                            else {
                                                                this.validateField("PhotoURL", null);
                                                            }
                                                        }}
                                                        OnInvalidImageSelected={() => {
                                                            this.validateField("PhotoURL", null);
                                                        }}
                                                        ImageCategory="" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="text-danger">{this.state.Errors.PhotoURL}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label">Maximum Weight (GVW)</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="number" name="MaximumWeight" className="form-control" autocomplete="off"
                                                        value={this.state.MaximumWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.MaximumWeight}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Trailer Type</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="text" name="Type" className="form-control" autocomplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
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

export default AddTrailerDialog;