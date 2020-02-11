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
            ImageCategory: `Trailer-${this.props.dialogID + 1}`,

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
        this.onInvalidImageSelected = this.onInvalidImageSelected.bind(this);
        this.onImageUploaded = this.onImageUploaded.bind(this);
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

    onInvalidImageSelected = () => {
        this.validateField("PhotoURL", null);
    }

    onImageUploaded = response => {
        if (response.message === "Image uploaded successfully.") {
            this.setState({
                PhotoURL: response.imageUrl
            });

            this.validateField("PhotoURL", this.state.PhotoURL);
        }
        else {
            this.validateField("PhotoURL", null);
        }
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedTrailer = {
            Token: localStorage.getItem("userToken"),
            TrailerID: this.props.Trailer.TrailerID,
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL,
            Type: this.state.Type
        }

        console.log(updatedTrailer);

        console.log("Updating trailer now.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateTrailer(updatedTrailer).then(response => {
            if (response.Message === "Trailer is updated.") {
                localStorage.setItem("userToken", response.Token);
                this.props.OnTrailerUpdated(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section>
                <div class="modal" id={`edit-trailer-dialog${this.props.dialogID}`}
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                        <div class="type-h3">Edit Trailer</div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <ImageUploader Source={this.state.PhotoURL} Height="220px"
                                                        Width="220px" OnImageUploaded={this.onImageUploaded}
                                                        OnInvalidImageSelected={this.onInvalidImageSelected} ImageCategory={this.state.ImageCategory} />
                                                </div>
                                                <div class="form-group">
                                                    <label class="text-danger">{this.state.Errors["PhotoURL"]}</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="control-label">Maximum Weight (GVW)</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="number" name="MaximumWeight" class="form-control" autocomplete="off"
                                                        value={this.state.MaximumWeight} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors["MaximumWeight"]}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Trailer Type</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="text" name="Type" class="form-control" autocomplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.Type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnEditTrailerDialogRemove}
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

export default EditTrailerDialog;