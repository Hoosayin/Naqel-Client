import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader";
import Preloader from "../../../../controls/Preloader.js";
import PlaceInput from "../../../../controls/PlaceInput";
import { updatePermitLicence } from "../../DriverFunctions.js";
import { getPublicData } from "../../../shared/UserFunctions";

class EditPermitLicenceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PermitNumber: this.props.PermitLicence.PermitNumber,
            ExpiryDate: this.props.PermitLicence.ExpiryDate,
            PhotoURL: this.props.PermitLicence.PhotoURL,
            Type: this.props.PermitLicence.Type,
            Place: {
                Lat: this.props.PermitLicence.Lat,
                Lng: this.props.PermitLicence.Lng,
                Address: this.props.PermitLicence.Place
            },

            ValidPermitNumber: true,
            ValidExpiryDate: true,
            ValidPhotoURL: true,
            ValidForm: false,
            Preloader: null,

            PermitTypes: [],

            Errors: {
                PermitNumber: "",
                ExpiryDate: "",
                PhotoURL: "",
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    async componentDidMount () {
        if (localStorage.Token) {
            let request = {
                Get: "PermitTypes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Permit types found.") {
                    this.setState({
                        PermitTypes: response.PermitTypes,
                    });
                }
                else {
                    this.setState({
                        PermitTypes: [],
                        Type: "No Permit Type"
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

        let ValidPermitNumber = this.state.ValidPermitNumber;
        let ValidExpiryDate = this.state.ValidExpiryDate;
        let ValidPhotoURL = this.state.ValidPhotoURL;

        switch (field) {
            case "PermitNumber":
                ValidPermitNumber = (value !== "");
                Errors.PermitNumber = ValidPermitNumber ? "" : Dictionary.PermitNumberError1;
                break;
            case "ExpiryDate":
                ValidExpiryDate = (new Date(value).getTime() >= new Date().getTime());
                Errors.ExpiryDate = ValidExpiryDate ? "" : Dictionary.ExpiryDateError;
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : Dictionary.PhotoURLError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPermitNumber: ValidPermitNumber,
            ValidExpiryDate: ValidExpiryDate,
            ValidPhotoURL: ValidPhotoURL,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidPermitNumber &&
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

        const updatedPermitLicence = {
            Token: localStorage.Token,
            PermitLicenceID: this.props.PermitLicence.PermitLicenceID,
            PermitNumber: this.state.PermitNumber,
            ExpiryDate: this.state.ExpiryDate,
            PhotoURL: this.state.PhotoURL,
            Type: this.state.Type,
            Place: this.state.Place.Address,
            Lat: this.state.Place.Lat,
            Lng: this.state.Place.Lng,
        }

        console.log("Going to update Permit Licence.");

        this.setState({
            Preloader: <Preloader />
        });

        await updatePermitLicence(updatedPermitLicence).then(async response => {
            if (response.Message === "Permit Licence is updated.") {
                this.cancelButton.click();
                await this.props.OnOK();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        const {
            PermitTypes
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`edit-permit-dialog${this.props.DialogID}`}
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
                                                    }} />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.EditPermit}</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.PermitNumber}r</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="PermitNumber" className="form-control" autoComplete="off"
                                                        value={this.state.PermitNumber} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.PermitNumber}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.ExpiryDate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="ExpiryDate" className="form-control" autoComplete="off"
                                                        value={this.state.ExpiryDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ExpiryDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.PermitType}</label>
                                                    <select class="form-control"
                                                        style={{
                                                            width: "100%",
                                                            maxWidth: "296px",
                                                            minWidth: "193px"
                                                        }}
                                                        onChange={event => {
                                                            this.setState({
                                                                Type: event.target.value
                                                            }, this.validateField("", ""));
                                                        }}
                                                        value={this.state.Type}>
                                                        {PermitTypes.map((type, index) => {
                                                            return <option key={index} value={type.PermitType}>{type.PermitType}</option>;
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.PermitPlace}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <PlaceInput 
                                                        Address={this.state.Place.Address}
                                                        OnPlaceSelected={(place) => {
                                                            this.setState({
                                                                Place: place
                                                            }, this.validateField("", ""));
                                                        }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Update} className="btn btn-primary" disabled={!this.state.ValidForm} />
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        EditPermit: "تحرير رخصة التصريح",
        PermitNumber: "رقم الترخيص",
        ExpiryDate: "تاريخ الانتهاء",
        PermitType: "نوع رخصة التصريح",
        PermitPlace: "مكان التصريح",
        Update: "تحديث",
        PermitNumberError1: ".رقم التصريح مطلوب",
        PermitNumberError2: ".رقم التصريح مطلوب",
        ExpiryDateError: ".يجب أن يكون تاريخ انتهاء الصلاحية في وقت متأخر عن الأمس",
        PhotoURLError: ".صورة غير صالحة. يرجى تحميل واحد صحيح",
        PermitCodeError: ".رمز التصريح مطلوب",
        PermitPlaceError: ".مكان التصريح مطلوب",
    };
}
else {
    Dictionary = {
        EditPermit: "Edit Permit Licence",
        PermitNumber: "Permit Number",
        ExpiryDate: "Expiry Date",
        PermitType: "Permit Type",
        PermitPlace: "Permit Place",
        Update: "Update",
        PermitNumberError1: "Permit number is required.",
        PermitNumberError2: "Permit number is required.",
        ExpiryDateError: "Expiry Date must be later than yesterday.",
        PhotoURLError: "Invalid Image. Please upload a correct one.",
        PermitCodeError: "Permit code is required.",
        PermitPlaceError: "Permit place is required.",
    };
}

export default EditPermitLicenceDialog;