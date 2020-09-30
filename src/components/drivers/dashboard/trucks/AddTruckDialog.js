import React, { Component } from "react";
import Preloader from "../../../../controls/Preloader";
import ImageUploader from "../../../../controls/ImageUploader";
import { getData, addTruck } from "../../DriverFunctions";

class AddTruckDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PlateNumber: "",
            Owner: "Anonymous Owner",
            ProductionYear: "",
            Brand: "",
            Model: "",
            Type: "",
            MaximumWeight: "",
            PhotoURL: "./images/default_image.png",

            ValidPlateNumber: false,
            ValidOwner: false,
            ValidProductionYear: false,
            ValidBrand: false,
            ValidModel: false,
            ValidType: false,
            ValidMaximumWeight: false,
            ValidPhotoURL: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                PlateNumber: "",
                Owner: "",
                ProductionYear: "",
                Brand: "",
                Model: "",
                Type: "",
                MaximumWeight: "",
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

        let ValidPlateNumber = this.state.ValidPlateNumber;
        let ValidOwner = this.state.ValidOwner;
        let ValidProductionYear = this.state.ValidProductionYear;
        let ValidBrand = this.state.ValidBrand;
        let ValidModel = this.state.ValidModel;
        let ValidType = this.state.ValidType;
        let ValidMaximumWeight = this.state.ValidMaximumWeight;
        let ValidPhotoURL = this.state.ValidPhotoURL;

        switch (field) {
            case "PlateNumber":
                ValidPlateNumber = (value !== "");
                Errors.PlateNumber = ValidPlateNumber ? "" : Dictionary.PlateNumberError1;

                if (Errors.PlateNumber !== "") {
                    break;
                }

                ValidPlateNumber = value.match(/^(?:[A-Z][A-Z-][A-Z]-[0-9]{4})$/);
                Errors.PlateNumber = ValidPlateNumber ? "" : Dictionary.PlateNumberError2;
                break;
            case "Owner":
                //ValidOwner = (value !== "");
                //Errors.Owner = ValidOwner ? "" : "Owner is required.";
                break;
            case "ProductionYear":
                let currentYear = new Date().getFullYear();
                ValidProductionYear = ((value !== "") && (value >= 2000 && value <= currentYear));
                Errors.ProductionYear = ValidProductionYear ? "" : Dictionary.ProductionYearError;
                break;
            case "Brand":
                ValidBrand = (value !== "");
                Errors.Brand = ValidBrand ? "" : Dictionary.BrandError;
                break;
            case "Model":
                ValidModel = (value !== "");
                Errors.Model = ValidModel ? "" : Dictionary.ModelError;
                break;
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : Dictionary.TypeError;
                break;
            case "MaximumWeight":
                ValidMaximumWeight = (value !== "");
                Errors.MaximumWeight = ValidMaximumWeight ? "" : Dictionary.MaximumWeightError1;

                if (Errors.MaximumWeight !== "") {
                    break;
                }

                ValidMaximumWeight = (value >= 700);
                Errors.MaximumWeight = ValidMaximumWeight ? "" : Dictionary.MaximumWeightError2;
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" :Dictionary.PhotoURLError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPlateNumber: ValidPlateNumber,
            ValidOwner: ValidOwner,
            ValidProductionYear: ValidProductionYear,
            ValidBrand: ValidBrand,
            ValidModel: ValidModel,
            ValidType: ValidType,
            ValidMaximumWeight: ValidMaximumWeight,
            ValidPhotoURL: ValidPhotoURL,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidPlateNumber &&
                        //this.state.ValidOwner &&
                        this.state.ValidProductionYear &&
                        this.state.ValidBrand &&
                        this.state.ValidModel &&
                        this.state.ValidType &&
                        this.state.ValidMaximumWeight &&
                        this.state.ValidPhotoURL
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        let request = {
            Token: localStorage.Token,
            Get: "Owner",
            Params: {
                Owner: this.state.Owner
            }
        };

        await getData(request).then(async response => {
            if (response || response.Message === "Owner found.") {
                
                this.setState({
                    ShowPreloader: true
                });

                const newTruck = {
                    Token: localStorage.Token,
                    TransportCompanyResponsibleID: response.Owner ? response.Owner.TransportCompanyResponsibleID : null,
                    PlateNumber: this.state.PlateNumber,
                    Owner: response.Owner ? response.Owner.Username : this.state.Owner,
                    ProductionYear: this.state.ProductionYear,
                    Brand: this.state.Brand,
                    Model: this.state.Model,
                    Type: this.state.Type,
                    MaximumWeight: this.state.MaximumWeight,
                    PhotoURL: this.state.PhotoURL
                }

                await addTruck(newTruck).then(response => {
                    this.setState({
                        ShowPreloader: false
                    });

                    if (response.Message === "Truck is added.") {
                        this.cancelButton.click();
                        this.props.OnOK();
                    }
                });
            }
            else {
                let {
                    Errors,
                } = this.state;

                Errors.Owner = Dictionary.OwnerError

                this.setState({
                    Errors: Errors,
                    ValidOwner: false,
                    ValidForm: false
                });
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-truck-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.AddTruck}</div>
                                                <label className="text-danger">{this.state.Errors.PhotoURL}</label>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.PlateNumber}</label>
                                                            <span className="text-danger m-l-xxxs">*</span>
                                                            <input type="text" name="PlateNumber" placeholder="ABC-1234" className="form-control" autoComplete="off"
                                                                value={this.state.PlateNumber} onChange={this.onChange} />
                                                            <span className="text-danger">{this.state.Errors.PlateNumber}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.Owner}</label>
                                                            <input type="text" name="Owner" className="form-control" autoComplete="off"
                                                                value={this.state.Owner} onChange={this.onChange} />
                                                            <span className="text-danger">{this.state.Errors.Owner}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.ProductionYear}</label>
                                                            <span className="text-danger m-l-xxxs">*</span>
                                                            <input type="number" name="ProductionYear" className="form-control" autoComplete="off"
                                                                value={this.state.ProductionYear} onChange={this.onChange} placeholder="XXXX" />
                                                            <span className="text-danger">{this.state.Errors.ProductionYear}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.Brand}</label>
                                                            <span className="text-danger m-l-xxxs">*</span>
                                                            <input type="text" name="Brand" className="form-control" autoComplete="off"
                                                                value={this.state.Brand} onChange={this.onChange} />
                                                            <span className="text-danger">{this.state.Errors.Brand}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.TruckModel}</label>
                                                            <span className="text-danger m-l-xxxs">*</span>
                                                            <input type="text" name="Model" className="form-control" autoComplete="off"
                                                                value={this.state.Model} onChange={this.onChange} />
                                                            <span className="text-danger">{this.state.Errors.Model}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.TruckType}</label>
                                                            <span className="text-danger m-l-xxxs">*</span>
                                                            <input type="text" name="Type" className="form-control" autoComplete="off"
                                                                value={this.state.Type} onChange={this.onChange} />
                                                            <span className="text-danger">{this.state.Errors.Type}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="control-label">{Dictionary.MaximumWeight}</label>
                                                            <span className="text-danger m-l-xxxs">*</span>
                                                            <input type="number" name="MaximumWeight" className="form-control" autoComplete="off"
                                                                value={this.state.MaximumWeight} onChange={this.onChange} />
                                                            <span className="text-danger">{this.state.Errors.MaximumWeight}</span>
                                                        </div>
                                                    </div>
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
        AddTruck: "إضافة شاحنة",
        PlateNumber: "رقم لوحة",
        Owner: "اسم مالك الشاحنة",
        ProductionYear: "سنة الصنع",
        Brand: "العلامة التجارية",
        TruckModel: "موديل الشاحنة ",
        TruckType: "نوع الشاحنة",
        MaximumWeight: "الوزن الأقصى (KG)",
        Add: "أضف",
        PlateNumberError1: ".رقم اللوحة مطلوب",
        PlateNumberError2: ".(ABC-1234 :يجب أن يتكون رقم اللوحة من 3 أحرف وأربعة أرقام فقط (مثال",
        OwnerError: ".لم يتم العثور على المالك",
        ProductionYearError: ".نطاق سنة الإنتاج 2000 إلى العام الحالي",
        BrandError: ".العلامة التجارية مطلوبة",
        ModelError: ".موديل الشاحنة مطلوب",
        TypeError: ".نوع الشاحنة مطلوب",
        MaximumWeightError1: ".مطلوب الوزن الأقصى",
        MaximumWeightError2: ".يجب أن يكون الوزن الأقصى أكبر من 699",
        PhotoURLError: ". صورة غير صالحه يرجى تحميل الصورة مره اخرى ",
    };
}
else {
    Dictionary = {
        AddTruck: "Add Truck",
        PlateNumber: "Plate Number",
        Owner: "Owner Username",
        ProductionYear: "Production Year",
        Brand: "Brand",
        TruckModel: "Truck Model",
        TruckType: "Truck Type",
        MaximumWeight: "Maximum Weight (KG)",
        Add: "Add",
        PlateNumberError1: "Plate number is required.",
        PlateNumberError2: "Plate number must have only 3 letters and 4-digits (Example: ABC-1234).",
        OwnerError: "Owner not found.",
        ProductionYearError: "Production year range is 2000 to present year.",
        BrandError: "Brand is required.",
        ModelError: "Model is required.",
        TypeError: "Type is required",
        MaximumWeightError1: "Maximum Weight is required.",
        MaximumWeightError2: "Maximum weight must be greater than 699.",
        PhotoURLError: "Invalid Image. Please upload a correct one.",
    };
}

export default AddTruckDialog;