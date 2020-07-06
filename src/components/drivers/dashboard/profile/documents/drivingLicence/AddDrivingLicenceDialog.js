import React, { Component } from "react";
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
                Errors.LicenceNumber = ValidLicenceNumber ? "" : Dictionary.LicenceNumberError;
                break;
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : Dictionary.LicenceTypeError;
                break;
            case "ReleaseDate":
                ValidReleaseDate = (new Date(value).getTime() < new Date(this.state.ExpiryDate).getTime());
                Errors.ReleaseDate = ValidReleaseDate ? "" : Dictionary.ReleaseDateError;
                break;
            case "ExpiryDate":
                ValidExpiryDate = (new Date(value).getTime() > new Date().getTime());
                Errors.ExpiryDate = ValidExpiryDate ? "" : Dictionary.ExipryDateError;
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
            Token: localStorage.Token,
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
            this.setState({
                Preloader: null
            });

            if (response.Message === "Driving Licence is added.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-driving-licence-dialog"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.AddDrivingLicence}</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.LicenceNumber}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="LicenceNumber" className="form-control" autoComplete="off"
                                                        value={this.state.LicenceNumber} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.LicenceNumber}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.LicenceType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Type" className="form-control" autoComplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.ReleaseDate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="ReleaseDate" className="form-control" autoComplete="off"
                                                        value={this.state.ReleaseDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ReleaseDate}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.ExpiryDate}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="date" name="ExpiryDate" className="form-control" autoComplete="off"
                                                        value={this.state.ExpiryDate} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.ExpiryDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Add} className="btn btn-primary" disabled={!this.state.ValidForm} />
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
        AddDrivingLicence: "إضافة رخصة القيادة الخاصة بك",
        LicenceNumber: "رقم الرخصة",
        LicenceType: "نوع الترخيص",
        ReleaseDate: "يوم الاصدار",
        ExpiryDate: "تاريخ الانتهاء",
        Add: "أضف",
        LicenceNumberError: ".رقم الترخيص مطلوب",
        LicenceTypeError: ".نوع الترخيص مطلوب",
        ReleaseDateError: ".يجب أن يكون تاريخ الإصدار قبل تاريخ انتهاء الصلاحية",
        ExipryDateError: ".يجب أن يكون تاريخ الانتهاء بعد اليوم",
        PhotoURLError: ".صورة غير صالحة. يرجى تحميل واحد صحيح",  
    };
}
else {
    Dictionary = {
        AddDrivingLicence: "Add Your Driving Licence",
        LicenceNumber: "Licence Number",
        LicenceType: "Licence Type",
        ReleaseDate: "Release Date",
        ExpiryDate: "Expiry Date",
        Add: "Add",
        LicenceNumberError: "Licence number is required.",
        LicenceTypeError: "Licence type is required.",
        ReleaseDateError: "Release date must be earlier than Expiry date.",
        ExipryDateError: "Expiry Date must be later than today.",
        PhotoURLError: "Invalid Image. Please upload a correct one.",        
    };
}

export default AddDrivingLicenceDialog;