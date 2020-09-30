import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader.js";
import Preloader from "../../../../controls/Preloader.js";
import { addPermitLicence } from "../../DriverFunctions.js";

class AddPermitLicenceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PermitNumber: "",
            ExpiryDate: new Date(),
            PhotoURL: "./images/default_image.png",
            Code: "",
            Place: "",

            ValidPermitNumber: false,
            ValidExpiryDate: false,
            ValidPhotoURL: false,
            ValidCode: false,
            ValidPlace: false,

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
                Errors.PermitNumber = ValidPermitNumber ? "" : Dictionary.PermitNumberError1;

                if (Errors.PermitNumber !== "") {
                    break;
                }

                ValidPermitNumber = (value !== "");
                Errors.PermitNumber = ValidPermitNumber ? "" : Dictionary.PermitNumberError2;

                break;
            case "ExpiryDate":
                ValidExpiryDate = (new Date(value).getTime() >= new Date().getTime());
                Errors.ExpiryDate = ValidExpiryDate ? "" : Dictionary.ExpiryDateError;
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : Dictionary.PhotoURLError;
                break;
            case "Code":
                ValidCode = (value !== "");
                Errors.Code = ValidCode ? "" : Dictionary.PermitCodeError;
                break;
            case "Place":
                ValidPlace = (value !== "");
                Errors.Place = ValidPlace ? "" : Dictionary.PermitPlaceError;
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

        const newPermitLicence = {
            Token: localStorage.Token,
            PermitNumber: this.state.PermitNumber,
            ExpiryDate: this.state.ExpiryDate,
            PhotoURL: this.state.PhotoURL,
            Code: this.state.Code,
            Place: this.state.Place
        }

        console.log("Going to add Permit Licence.");

        this.setState({
            Preloader: <Preloader />
        });

        await addPermitLicence(newPermitLicence).then(response => {
            this.setState({
                Preloader: null
            });

            if (response.Message === "Permit Licence is added.") {
                this.setState({
                    PermitNumber: "",
            ExpiryDate: new Date(),
            PhotoURL: "./images/default_image.png",
            Code: "",
            Place: "",

            ValidPermitNumber: false,
            ValidExpiryDate: false,
            ValidPhotoURL: false,
            ValidCode: false,
            ValidPlace: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                PermitNumber: "",
                ExpiryDate: "",
                PhotoURL: "",
                Code: "",
                Place: "",
            },
                });
                
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-permit-licence-dialog"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.AddPermit}</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.PermitNumber}</label>
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
                                                    <label className="control-label">{Dictionary.PermitCode}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Code" className="form-control" autoComplete="off"
                                                        value={this.state.Code} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Code}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.PermitPlace}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Place" className="form-control" autoComplete="off"
                                                        value={this.state.Place} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Place}</span>
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
        AddPermit: "إضافة ترخيص تصريح صالح",
        PermitNumber: "رقم الترخيص",
        ExpiryDate: "تاريخ الانتهاء",
        PermitCode: "كود التصريح",
        PermitPlace: "مكان التصريح",
        Add: "أضف",
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
        AddPermit: "Add a Valid Permit Licence",
        PermitNumber: "Permit Number",
        ExpiryDate: "Expiry Date",
        PermitCode: "Permit Code",
        PermitPlace: "Permit Place",
        Add: "Add",
        PermitNumberError1: "Permit number is required.",
        PermitNumberError2: "Permit number is required.",
        ExpiryDateError: "Expiry Date must be later than yesterday.",
        PhotoURLError: "Invalid Image. Please upload a correct one.",
        PermitCodeError: "Permit code is required.",
        PermitPlaceError: "Permit place is required.",
    };
}

export default AddPermitLicenceDialog;