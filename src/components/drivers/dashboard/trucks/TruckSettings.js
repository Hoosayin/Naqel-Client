import React, { Component } from "react";
import { getData, updateTruck } from "../../DriverFunctions";
import Preloader from "../../../../controls/Preloader";

class TruckSettings extends Component {
    constructor() {
        super();

        this.state = {
            PlateNumber: "",
            Owner: "",
            ProductionYear: "",
            Brand: "",
            Model: "",
            Type: "",
            MaximumWeight: "",

            ValidPlateNumber: true,
            ValidOwner: true,
            ValidProductionYear: true,
            ValidBrand: true,
            ValidModel: true,
            ValidType: true,
            ValidMaximumWeight: true,

            ValidForm: false,
            Preloader: null,

            Errors: {
                PlateNumber: "",
                Owner: "",
                ProductionYear: "",
                Brand: "",
                Model: "",
                Type: "",
                MaximumWeight: ""
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Truck"
            };

            getData(request).then(response => {
                if (response.Message === "Truck found.") {
                    let truck = response.Truck;

                    this.setState({
                        PlateNumber: truck.PlateNumber,
                        Owner: truck.Owner,
                        ProductionYear: truck.ProductionYear,
                        Brand: truck.Brand,
                        Model: truck.Model,
                        Type: truck.Type,
                        MaximumWeight: truck.MaximumWeight
                    });
                }
                else {
                    this.setState({
                        PlateNumber: "",
                        Owner: "",
                        ProductionYear: "",
                        Brand: "",
                        Model: "",
                        Type: "",
                        MaximumWeight: ""
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

        let ValidPlateNumber = this.state.ValidPlateNumber;
        let ValidOwner = this.state.ValidOwner;
        let ValidProductionYear = this.state.ValidProductionYear;
        let ValidBrand = this.state.ValidBrand;
        let ValidModel = this.state.ValidModel;
        let ValidType = this.state.ValidType;
        let ValidMaximumWeight = this.state.MaximumWeight;

        switch (field) {
            case "PlateNumber":
                ValidPlateNumber = (value !== "");
                Errors.PlateNumber = ValidPlateNumber ? "" : Dictionary.PlateNumberError1;

                if (Errors.PlateNumber !== "") {
                    break;
                }

                ValidPlateNumber = (value >= 100 && value <= 999);
                Errors.PlateNumber = ValidPlateNumber ? "" : Dictionary.PlateNumberError2;
                break;
            case "Owner":
                ValidOwner = (value !== "");
                Errors.Owner = ValidOwner ? "" : "Owner is required.";
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
            ValidMaximumWeight: ValidMaximumWeight
        }, () => {
            this.setState({
                ValidForm: this.state.ValidPlateNumber &&
                    this.state.ValidOwner &&
                    this.state.ValidProductionYear &&
                    this.state.ValidBrand &&
                    this.state.ValidModel &&
                    this.state.ValidType &&
                    this.state.MaximumWeight
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
            if (response.Message === "Owner found.") {
                this.setState({
                    Preloader: <Preloader />
                });

                const updatedTruck = {
                    Token: localStorage.Token,
                    TransportCompanyResponsibleID: response.Owner.TransportCompanyResponsibleID,
                    PlateNumber: this.state.PlateNumber,
                    Owner: response.Owner.Username,
                    ProductionYear: this.state.ProductionYear,
                    Brand: this.state.Brand,
                    Model: this.state.Model,
                    Type: this.state.Type,
                    MaximumWeight: this.state.MaximumWeight
                }

                await updateTruck(updatedTruck).then(response => {
                    this.setState({
                        Preloader: false
                    });

                    if (response.Message === "Truck is updated.") {
                        this.setState({
                            ValidForm: false
                        });

                        this.props.OnTruckSettingsUpdated();
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
        return (
            <div>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>{Dictionary.TruckSettings}</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="entity-list entity-list-expandable">
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-list-ol"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="number" name="PlateNumber" className="form-control" autocomplete="off"
                                        value={this.state.PlateNumber} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.PlateNumber}</div>
                                <div className="text-danger">{this.state.Errors.PlateNumber}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-copyright"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="text" name="Owner" className="form-control" autocomplete="off"
                                        value={this.state.Owner} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.Owner}</div>
                                <div className="text-danger">{this.state.Errors.Owner}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-calendar-day"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="number" name="ProductionYear" className="form-control" autocomplete="off"
                                        value={this.state.ProductionYear} onChange={this.onChange} placeholder="XXXX" />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.ProductionYear}</div>
                                <div className="text-danger">{this.state.Errors["ProductionYear"]}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-copyright"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="text" name="Brand" className="form-control" autocomplete="off"
                                        value={this.state.Brand} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.Brand}</div>
                                <div className="text-danger">{this.state.Errors.Brand}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-list-ol"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="text" name="Model" className="form-control" autocomplete="off"
                                        value={this.state.Model} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.TruckModel}</div>
                                <div className="text-danger">{this.state.Errors.Model}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-cog"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="text" name="Type" className="form-control" autocomplete="off"
                                        value={this.state.Type} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.TruckType}</div>
                                <div className="text-danger">{this.state.Errors.Type}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-weight"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div className="form-group">
                                    <input type="number" name="MaximumWeight" className="form-control" autocomplete="off"
                                        value={this.state.MaximumWeight} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.MaximumWeight}</div>
                                <div className="text-danger">{this.state.Errors.MaximumWeight}</div>
                            </div>
                        </div>                      
                        <div className="entity-list-item active">
                            <div className="item-icon">
                                <span className="fas fa-save"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.SaveChanges}</div>
                                <div className="content-text-secondary">{Dictionary.Undone}</div>
                            </div>
                            <div className="item-content-expanded">
                                <input type="submit" value={Dictionary.Save} className="btn btn-primary" disabled={!this.state.ValidForm} />
                            </div>
                        </div>
                    </div>
                </form>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                {this.state.Preloader}
            </div>
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        TruckSettings: "إعدادات الشاحنة",
        PlateNumber: "رقم لوحة",
        Owner: "صاحب",
        ProductionYear: "سنة الإنتاج",
        Brand: "العلامة التجارية",
        TruckModel: "نموذج الشاحنة",
        TruckType: "نوع الشاحنة",
        MaximumWeight: "الوزن الأقصى (GVW)",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ".هذا لا يمكن التراجع عنها",
        Save: "حفظ",
        PlateNumberError1: ".رقم اللوحة مطلوب",
        PlateNumberError2: ".يجب أن يتكون رقم اللوحة من 3 أرقام",
        OwnerError: ".لم يتم العثور على المالك",
        ProductionYearError: ".يجب ألا تتجاوز سنة الإنتاج السنة الحالية",
        BrandError: ".العلامة التجارية مطلوبة",
        ModelError: ".النموذج مطلوب",
        TypeError: ".النوع مطلوب",
        MaximumWeightError1: ".مطلوب الوزن الأقصى",
        MaximumWeightError2: ".يجب أن يكون الوزن الأقصى أكبر من 699",
        PhotoURLError: ".صورة غير صالحة. يرجى تحميل واحد صحيح",
    };
}
else {
    Dictionary = {
        TruckSettings: "Truck Settings",
        PlateNumber: "Plate Number",
        Owner: "Owner",
        ProductionYear: "Production Year",
        Brand: "Brand",
        TruckModel: "Truck Model",
        TruckType: "Truck Type",
        MaximumWeight: "Maximum Weight (GVW)",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",
        PlateNumberError1: "Plate number is required.",
        PlateNumberError2: "Plate number must be 3-digits long.",
        OwnerError: "Owner not found.",
        ProductionYearError: "Production year must not exceed current year.",
        BrandError: "Brand is required.",
        ModelError: "Model is required.",
        TypeError: "Type is required",
        MaximumWeightError1: "Maximum Weight is required.",
        MaximumWeightError2: "Maximum weight must be greater than 699.",
        PhotoURLError: "Invalid Image. Please upload a correct one.",
    };
}

export default TruckSettings;