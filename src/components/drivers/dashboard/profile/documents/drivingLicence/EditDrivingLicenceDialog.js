import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { getData, updateDrivingLicence } from "../../../../DriverFunctions.js";

class EditDrivingLicenceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            LicenceNumber: "",
            Type: "",
            ReleaseDate: new Date(),
            ExpiryDate: new Date(),
            PhotoURL: "./images/default_image.png",

            ValidLicenceNumber: true,
            ValidType: true,
            ValidReleaseDate: true,
            ValidExpiryDate: true,
            ValidPhotoURL: true,

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

    componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "DrivingLicence"
            };

            getData(request).then(response => {
                if (response.Message === "Driving licence found.") {
                    let drivingLicence = response.DrivingLicence;

                    this.setState({
                        DrivingLicenceID: drivingLicence.DrivingLicenceID,
                        LicenceNumber: drivingLicence.LicenceNumber,
                        Type: drivingLicence.Type,
                        ReleaseDate: drivingLicence.ReleaseDate,
                        ExpiryDate: drivingLicence.ExpiryDate,
                        PhotoURL: drivingLicence.PhotoURL,
                    });
                }
                else {
                    this.setState({
                        DrivingLicenceID: "",
                        LicenceNumber: "",
                        Type: "",
                        ReleaseDate: new Date(),
                        ExpiryDate: new Date(),
                        PhotoURL: "./images/default_image.png",
                    });
                }
            });
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
                ValidExpiryDate = (new Date(value).getTime() > new Date().getTime());
                Errors.ExpiryDate = ValidExpiryDate ? "" : "Expiry Date must be later than today.";
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
                        this.state.ValidPhotoURL
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedDrivingLicence = {
            Token: localStorage.Token,
            LicenceNumber: this.state.LicenceNumber,
            Type: this.state.Type,
            ReleaseDate: this.state.ReleaseDate,
            ExpiryDate: this.state.ExpiryDate,
            PhotoURL: this.state.PhotoURL,
        }

        console.log("Going to update the Driving Licence.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateDrivingLicence(updatedDrivingLicence).then(response => {
            if (response.Message === "Driving Licence is updated.") {
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
                <div className="modal" id="edit-driving-licence-dialog"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="modal-header">
                                        <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                        <div className="type-h3">Edit Driving Licence</div>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
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
                                                        ImageCategory="DrivingLicence" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="text-danger">{this.state.Errors.PhotoURL}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label">Licence Number</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="number" name="LicenceNumber" className="form-control" autoComplete="off"
                                                        value={this.state.LicenceNumber} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.LicenceNumber}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Licence Type</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="text" name="Type" className="form-control" autoComplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Release Date</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="date" name="ReleaseDate" className="form-control" autoComplete="off"
                                                        value={this.state.ReleaseDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ReleaseDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Expiry Date</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="date" name="ExpiryDate" className="form-control" autoComplete="off"
                                                        value={this.state.ExpiryDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ExpiryDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Update" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default EditDrivingLicenceDialog;