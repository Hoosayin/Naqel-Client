import React, { Component } from "react";
import { Required } from "../../../../styles/MiscellaneousStyles";
import ImageUploader from "../../../../controls/ImageUploader";
import Preloader from "../../../../controls/Preloader.js";
import { updatePermitLicence } from "../../DriverFunctions.js";

class EditPermitLicenceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PermitNumber: this.props.PermitLicence.PermitNumber,
            ExpiryDate: this.props.PermitLicence.ExpiryDate,
            PhotoURL: this.props.PermitLicence.PhotoURL,
            Code: this.props.PermitLicence.Code,
            Place: this.props.PermitLicence.Place,

            ValidPermitNumber: true,
            ValidExpiryDate: true,
            ValidPhotoURL: true,
            ValidCode: true,
            ValidPlace: true,

            ValidForm: false,
            Preloader: null,

            Errors: {
                PermitNumber: "",
                ExpiryDate: "",
                PhotoURL: "",
                Code: "",
                Place: "",
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

        let ValidPermitNumber = this.state.ValidPermitNumber;
        let ValidExpiryDate = this.state.ValidExpiryDate;
        let ValidPhotoURL = this.state.ValidPhotoURL;
        let ValidCode = this.state.ValidCode;
        let ValidPlace = this.state.ValidPlace;

        switch (field) {
            case "PermitNumber":
                ValidPermitNumber = (value !== "");
                Errors.PermitNumber = ValidPermitNumber ? "" : "Permit number is required.";
                break;
            case "ExpiryDate":
                ValidExpiryDate = (new Date(value).getTime() >= new Date().getTime());
                Errors.ExpiryDate = ValidExpiryDate ? "" : "Expiry Date must be later than yesterday.";
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : "Invalid Image. Please upload a correct one.";
                break;
            case "Code":
                ValidCode = (value !== "");
                Errors.Code = ValidCode ? "" : "Permit code is required.";
                break;
            case "Place":
                ValidPlace = (value !== "");
                Errors.Place = ValidPlace ? "" : "Permit place is required.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPermitNumber: ValidPermitNumber,
            ValidExpiryDate: ValidExpiryDate,
            ValidPhotoURL: ValidPhotoURL,
            ValidCode: ValidCode,
            ValidPlace: ValidPlace,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidPermitNumber &&
                    this.state.ValidExpiryDate &&
                    this.state.ValidPhotoURL &&
                    this.state.ValidCode &&
                    this.state.ValidPlace
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedPermitLicence = {
            Token: localStorage.Token,
            PermitLicenceID: this.props.PermitLicence.PermitLicenceID,
            PermitNumber: this.state.PermitNumber,
            ExpiryDate: this.state.ExpiryDate,
            PhotoURL: this.state.PhotoURL,
            Code: this.state.Code,
            Place: this.state.Place
        }

        console.log("Going to update Permit Licence.");

        this.setState({
            Preloader: <Preloader />
        });

        await updatePermitLicence(updatedPermitLicence).then(response => {
            if (response.Message === "Permit Licence is updated.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return <section className="text-left">
            <div className="modal" id={`edit-permit-dialog${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.Preloader}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <section>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="modal-header">
                                    <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                    <div className="type-h3">Add Permit Licence</div>
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
                                                    }} />
                                            </div>
                                            <div className="form-group">
                                                <label className="text-danger">{this.state.Errors.PhotoURL}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Permit Number</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" name="PermitNumber" className="form-control" autoComplete="off"
                                                    value={this.state.PermitNumber} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.PermitNumber}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Expiry Date</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="date" name="ExpiryDate" className="form-control" autoComplete="off"
                                                    value={this.state.ExpiryDate} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.ExpiryDate}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Permit Code</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="Code" className="form-control" autoComplete="off"
                                                    value={this.state.Code} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Permit Place</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="Place" className="form-control" autoComplete="off"
                                                    value={this.state.Place} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Place}</span>
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
        </section>;
    }
};

export default EditPermitLicenceDialog;