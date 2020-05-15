import React, { Component } from "react";
import { addTruck } from "../../DriverFunctions";
import Preloader from "../../../../controls/Preloader";
import { Required } from "../../../../styles/MiscellaneousStyles";
import ImageUploader from "../../../../controls/ImageUploader";

class AddTruckDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PlateNumber: "",
            Owner: "",
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
                Errors.PlateNumber = ValidPlateNumber ? "" : "Plate number is required.";

                if (Errors.IDNumber !== "") {
                    break;
                }

                ValidPlateNumber = (value >= 100 && value <= 999);
                Errors.PlateNumber = ValidPlateNumber ? "" : "Plate number must be 3-digits long.";
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
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : "Invalid Image. Please upload a correct one.";
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
                        this.state.ValidOwner &&
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

        const newTruck = {
            Token: localStorage.Token,
            PlateNumber: this.state.PlateNumber,
            Owner: this.state.Owner,
            ProductionYear: this.state.ProductionYear,
            Brand: this.state.Brand,
            Model: this.state.Model,
            Type: this.state.Type,
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL
        }

        this.setState({
            ShowPreloader: true 
        });

        await addTruck(newTruck).then(response => {
            if (response.Message === "Truck is added.") {
                this.cancelButton.click();
                this.props.OnOK();

                this.setState({
                    ShowPreloader: false
                });
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    }

    render() {
        return (
            <div className="modal" id="add-truck-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {this.state.ShowPreloader ? <Preloader /> : null}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="modal-header">
                                    <img alt="add.png" src="./images/add.png" height="60" />
                                    <div className="type-h3">New Truck</div>
                                    <div className="type-sh3">These detials will be displayed on your profile.</div>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <ImageUploader Source={this.state.PhotoURL}
                                                    Height="220px" Width="220px"
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
                                                    ImageCategory="Truck" />
                                            </div>
                                            <div className="form-group">
                                                <label className="text-danger">{this.state.Errors.PhotoURL}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">                                          
                                            <div className="form-group">
                                                <label className="control-label">Plate Number</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" name="PlateNumber" className="form-control" autoComplete="off"
                                                    value={this.state.PlateNumber} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.PlateNumber}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Owner</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="Owner" className="form-control" autoComplete="off"
                                                    value={this.state.Owner} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Owner}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Production Year</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" name="ProductionYear" className="form-control" autoComplete="off"
                                                    value={this.state.ProductionYear} onChange={this.onChange} placeholder="XXXX" />
                                                <span className="text-danger">{this.state.Errors.ProductionYear}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Brand</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="Brand" className="form-control" autoComplete="off"
                                                    value={this.state.Brand} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Brand}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Truck Model</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="Model" className="form-control" autoComplete="off"
                                                    value={this.state.Model} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Model}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Truck Type</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="text" name="Type" className="form-control" autoComplete="off"
                                                    value={this.state.Type} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.Type}</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Maximum Weight (GVW)</label>
                                                <span className="text-danger" style={Required}>*</span>
                                                <input type="number" name="MaximumWeight" className="form-control" autoComplete="off"
                                                    value={this.state.MaximumWeight} onChange={this.onChange} />
                                                <span className="text-danger">{this.state.Errors.MaximumWeight}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-default" data-dismiss="modal"
                                        ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                    <input type="submit" value="Add" className="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </p>
                    </div>
                </div>
            </div>             
        );
    }
};

export default AddTruckDialog;