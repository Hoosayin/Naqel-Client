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
                ValidPlateNumber = ((value !== "") && (value >= 1 && value <= 999));
                Errors.PlateNumber = ValidPlateNumber ? "" : "Plate Number must be between 001 and 999.";
                break;
            case "Owner":
                ValidOwner = (value !== "");
                Errors.Owner = ValidOwner ? "" : "Owner is required.";
                break;
            case "ProductionYear":
                let currentYear = new Date().getFullYear();
                ValidProductionYear = ((value !== "") && (value >= 2000 && value <= currentYear));
                Errors.ProductionYear = ValidProductionYear ? "" : `Production Year must be between 2000 and ${currentYear}`;
                break;
            case "Brand":
                ValidBrand = (value !== "");
                Errors.Brand = ValidBrand ? "" : "Brand is required.";
                break;
            case "Model":
                ValidModel = (value !== "");
                Errors.Model = ValidModel ? "" : "Model is required.";
                break;
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : "Type is required";
                break;
            case "MaximumWeight":
                ValidMaximumWeight = (value !== "");
                Errors.MaximumWeight = ValidMaximumWeight ? "" : "Maximum Weight is required.";

                if (Errors.MaximumWeight !== "") {
                    break;
                }

                ValidMaximumWeight = (value >= 700);
                Errors.MaximumWeight = ValidMaximumWeight ? "" : "Maximum weight must be greater than 699.";
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

                Errors.Owner = "Owner not found."

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
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Truck Settings</div>
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
                                <div className="content-text-primary">Plate Number</div>
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
                                <div className="content-text-primary">Owner</div>
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
                                <div className="content-text-primary">Production Year</div>
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
                                <div className="content-text-primary">Brand</div>
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
                                <div className="content-text-primary">Truck Model</div>
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
                                <div className="content-text-primary">Truck Type</div>
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
                                <div className="content-text-primary">Maximum Weight (GVW)</div>
                                <div className="text-danger">{this.state.Errors.MaximumWeight}</div>
                            </div>
                        </div>                      
                        <div className="entity-list-item active">
                            <div className="item-icon">
                                <span className="fas fa-save"></span>
                            </div>
                            <div className="item-content-primary">
                                <div className="content-text-primary">Save Changes?</div>
                                <div className="content-text-secondary">This cannot be undone.</div>
                            </div>
                            <div className="item-content-expanded">
                                <input type="submit" value="Save" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default TruckSettings;