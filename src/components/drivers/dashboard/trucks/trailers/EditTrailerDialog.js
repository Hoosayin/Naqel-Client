import React, { Component } from "react";
import { Required } from "../../../../../styles/MiscellaneousStyles";
import ImageUploader from "../../../../../controls/ImageUploader";
import Preloader from "../../../../../controls/Preloader.js";
import { updateTrailer } from "../../../DriverFunctions.js";

class EditTrailerDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            MaximumWeight: this.props.Trailer.MaximumWeight,
            PhotoURL: this.props.Trailer.PhotoURL,
            Type: this.props.Trailer.Type,

            ValidMaximumWeight: true,
            ValidPhotoURL: true,
            ValidType: true,

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

    onSubmit = event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedTrailer = {
            Token: localStorage.Token,
            TrailerID: this.props.Trailer.TrailerID,
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL,
            Type: this.state.Type
        }

        console.log("Going to update trailer...");

        this.setState({
            Preloader: <Preloader />
        });

        updateTrailer(updatedTrailer).then(response => {
            if (response.Message === "Trailer is updated.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id={`edit-trailer-dialog${this.props.dialogID}`}
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
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ImageUploader
                                                    Source={this.state.PhotoURL}
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
                                                    ImageCategory="IdentityCard" />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="type-h3 color-default p-t-xxs">Edit Your Trailer</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">Maximum Weight (GVW)</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="MaximumWeight" className="form-control" autocomplete="off"
                                                        value={this.state.MaximumWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.MaximumWeight}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Trailer Type</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Type" className="form-control" autocomplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Update" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default EditTrailerDialog;