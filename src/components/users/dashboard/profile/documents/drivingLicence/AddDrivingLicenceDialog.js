import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { addDrivingLicence } from "../../../../DriverFunctions.js";

class AddDrivingLicenceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LicenceNumber: "",
            Type: "",
            ReleaseDate: new Date(),
            ExpiryDate: new Date(),
            PhotoURL: "./images/default_image.png",

            ImageCategory: "DrivingLicense",

            ValidLicenceNumber: false,
            ValidType: false,
            ValidReleaseDate: false,
            ValidExpiryDate: false,
            ValidPhotoURL: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                LicenceNumber: "",
                Type: "",
                ReleaseDate: "",
                ExpiryDate: "",
                PhotoURL: "",
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

        let ValidLicenceNumber = this.state.ValidLicenceNumber;
        let ValidType = this.state.ValidType;
        let ValidReleaseDate = this.state.ValidReleaseDate;
        let ValidExpiryDate = this.state.ValidExpiryDate;
        let ValidPhotoURL = this.state.ValidPhotoURL;

        switch (field) {
            case "LicenceNumber":
                ValidLicenceNumber = (value !== "");
                Errors.LicenceNumber = ValidLicenceNumber ? "" : "Licence number is required.";
                break;
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : "Licence type is required";
                break;
            case "ReleaseDate":
                ValidReleaseDate = (new Date(value).getTime() < new Date(this.state.ExpiryDate).getTime());
                Errors.ReleaseDate = ValidReleaseDate ? "" : "Release date must be earlier than Expiry date.";
                break;
            case "ExpiryDate":
                ValidExpiryDate = ((new Date(value).getTime() > new Date(this.state.ReleaseDate).getTime()) &&
                    (new Date(value).getTime() < new Date().getTime()));
                Errors.ExpiryDate = ValidExpiryDate ? "" : "Expiry Date must be later than Release date but earlier than today.";
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : "Invalid Image. Please upload a correct one.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidLicenceNumber: ValidLicenceNumber,
            ValidType: ValidType,
            ValidReleaseDate: ValidReleaseDate,
            ValidExpiryDate: ValidExpiryDate,
            ValidPhotoURL: ValidPhotoURL,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidLicenceNumber &&
                        this.state.ValidType &&
                        this.state.ValidReleaseDate &&
                        this.state.ValidExpiryDate &&
                        this.state.ValidPhotoURL,
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newDrivingLicence = {
            Token: localStorage.getItem("userToken"),
            LicenceNumber: this.state.LicenceNumber,
            Type: this.state.Type,
            ReleaseDate: this.state.ReleaseDate,
            ExpiryDate: this.state.ExpiryDate,
            PhotoURL: this.state.PhotoURL,
        }

        console.log("Going to add the Driving Licence.");

        this.setState({
            Preloader: <Preloader />
        });

        await addDrivingLicence(newDrivingLicence).then(response => {
            if (response.Message === "Driving Licence is added.") {
                localStorage.setItem("userToken", response.Token);
                this.props.OnDrivingLicenceAdded(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section class="text-left">
                <div class="modal" id="add-driving-licence-dialog"
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div class="type-h3">Add Driving Licence</div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <ImageUploader
                                                        Source={this.state.PhotoURL}
                                                        Height="220px"
                                                        Width="220px"
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
                                                        ImageCategory={this.state.ImageCategory} />
                                                </div>
                                                <div class="form-group">
                                                    <label class="text-danger">{this.state.Errors.PhotoURL}</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="control-label">Licence Number</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="text" name="LicenceNumber" class="form-control" autocomplete="off"
                                                        value={this.state.LicenceNumber} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.LicenceNumber}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Licence Type</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="text" name="Type" class="form-control" autocomplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.Type}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Release Date</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="date" name="ReleaseDate" class="form-control" autocomplete="off"
                                                        value={this.state.ReleaseDate} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.ReleaseDate}</span>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Trailer Type</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="date" name="ExpiryDate" class="form-control" autocomplete="off"
                                                        value={this.state.ExpiryDate} onChange={this.onChange} />
                                                    <span class="text-danger">{this.state.Errors.ExpiryDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnAddDrivingLicenceDialogRemove}
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

export default AddDrivingLicenceDialog;