import React, { Component } from "react";
import { getData, updateTruck } from "../../DriverFunctions";
import { getPublicData } from "../../../shared/UserFunctions";
import Preloader from "../../../../controls/Preloader";

class TruckSettings extends Component {
    constructor() {
        super();

        this.state = {
            PlateNumber: "",
            Owner: "Anonymous Owner",
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

            TruckTypes: [],
            TruckSizes: [],

            ValidForm: false,
            Preloader: null,

            Errors: {
                PlateNumber: "",
                Owner: "",
                ProductionYear: "",
                Brand: "",
                Model: "",
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Truck"
            };

            await getData(request).then(response => {
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

            request = {
                Get: "TruckTypes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Truck types found.") {
                    this.setState({
                        TruckTypes: response.TruckTypes,
                    });
                }
                else {
                    this.setState({
                        TruckTypes: [],
                    });
                }
            });

            request = {
                Get: "TruckSizes"
            };

            await getPublicData(request).then(response => {
                if (response.Message === "Truck sizes found.") {
                    this.setState({
                        TruckSizes: response.TruckSizes,
                    });
                }
                else {
                    this.setState({
                        TruckSizes: [],
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
        }, () => {
            this.setState({
                ValidForm: this.state.ValidPlateNumber &&
                    //this.state.ValidOwner &&
                    this.state.ValidProductionYear &&
                    this.state.ValidBrand &&
                    this.state.ValidModel
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
                    Preloader: <Preloader />
                });

                const updatedTruck = {
                    Token: localStorage.Token,
                    TransportCompanyResponsibleID: response.Owner ? response.Owner.TransportCompanyResponsibleID : null,
                    PlateNumber: this.state.PlateNumber,
                    Owner: response.Owner ? response.Owner.Username : this.state.Owner,
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
        const {
            TruckTypes,
            TruckSizes
        } = this.state;

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
                                    <input type="text" name="PlateNumber" placeholder="ABC-1234" className="form-control" autocomplete="off"
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
                                <div class="combobox">
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
                                        {TruckTypes.map((type, index) => {
                                            return <option key={index} value={type.TruckType}>{type.TruckType}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.TruckType}</div>
                            </div>
                        </div>
                        <div className="entity-list-item">
                            <div className="item-icon">
                                <span className="fas fa-weight"></span>
                            </div>
                            <div className="item-content-secondary">
                                <div class="combobox">
                                    <select class="form-control"
                                        style={{
                                            width: "100%",
                                            maxWidth: "296px",
                                            minWidth: "193px"
                                        }}
                                        onChange={event => {
                                            this.setState({
                                                MaximumWeight: event.target.value
                                            }, this.validateField("", ""));
                                        }}
                                        value={this.state.MaximumWeight}>
                                        {TruckSizes.map((size, index) => {
                                            return <option key={index} value={size.TruckSize}>{`${size.TruckSize} KG`}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">{Dictionary.MaximumWeight}</div>
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
        Owner: "اسم مالك الشاحنة",
        ProductionYear: "سنة الصنع",
        Brand: "العلامة التجارية",
        TruckModel: "موديل الشاحنة",
        TruckType: "نوع الشاحنة",
        MaximumWeight: "الوزن الأقصى (KG)",
        SaveChanges: "حفظ التغييرات؟",
        Undone: ". لا يمكن التراجع عنها",
        Save: "حفظ",
        PlateNumberError1: ".رقم اللوحة مطلوب",
        PlateNumberError2: ".(ABC-1234 :يجب أن يتكون رقم اللوحة من 3 أحرف وأربعة أرقام فقط (مثال",
        OwnerError: ".لم يتم العثور على المالك",
        ProductionYearError: ".يجب ان لا تتجاوز سنةالصنع السنة الحالية",
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
        TruckSettings: "Truck Settings",
        PlateNumber: "Plate Number",
        Owner: "Owner Username",
        ProductionYear: "Production Year",
        Brand: "Brand",
        TruckModel: "Truck Model",
        TruckType: "Truck Type",
        MaximumWeight: "Maximum Weight (KG)",
        SaveChanges: "Save Changes?",
        Undone: "This cannot be undone.",
        Save: "Save",
        PlateNumberError1: "Plate number is required.",
        PlateNumberError2: "Plate number must have only 3 letters and 4-digits (Example: ABC-1234).",
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