import React, { Component } from "react";
import jwt_decode from "jwt-decode";
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
            ImageCategory: "Trailer-1",
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
        this.onInvalidImageSelected = this.onInvalidImageSelected.bind(this);
        this.onImageUploaded = this.onImageUploaded.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const trailers = jwt_decode(localStorage.userToken).Truck.Trailers;

            if (trailers) {
                this.setState({
                    ImageCategory: `Trailer-${trailers.length + 1}`
                });
            }
            else {
                this.setState({
                    ImageCategory: "Trailer-1"
                });
            }         
        }
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

        const newTrailer = {
            Token: localStorage.getItem("userToken"),
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL,
            Type: this.state.Type
        }

        console.log("Going to add the trailer.");

        this.setState({
            Preloader: <Preloader />
        });

        await addTrailer(newTrailer).then(response => {
            if (response.Message === "Trailer is added.") {
                localStorage.setItem("userToken", response.Token);
                this.props.OnTrailerAdded(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section>
                <div class="modal" id="add-trailer-dialog"
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div class="type-h3">New Trailer</div>
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
                                        <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnAddTrailerDialogRemove}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Add" class="btn btn-primary" disabled={!this.state.ValidForm} />
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