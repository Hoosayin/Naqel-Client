import React, { Component } from "react";
import { addTruck } from "../../DriverFunctions";
import MessageBox from "../../../../controls/MessageBox";
import { Required } from "../../../../styles/MiscellaneousStyles";
import ImageUploader from "../../../../controls/ImageUploader";

class AddTruck extends Component {
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
            MessageBox: null,

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
        this.onInvalidImageSelected = this.onInvalidImageSelected.bind(this);
        this.onImageUploaded = this.onImageUploaded.bind(this);
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

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

    onInvalidImageSelected = () => {
        this.validateField("PhotoURL", null);
    }

    onImageUploaded = response => {
        if (response.message === "Image uploaded successfully.") {
            this.setState({
                PhotoURL: response.imageUrl
            });

            this.validateField("PhotoURL", this.state.PhotoURL);
        }
        else {
            this.validateField("PhotoURL", null);
        }
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newTruck = {
            Token: localStorage.getItem("userToken"),
            PlateNumber: this.state.PlateNumber,
            Owner: this.state.Owner,
            ProductionYear: this.state.ProductionYear,
            Brand: this.state.Brand,
            Model: this.state.Model,
            Type: this.state.Type,
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL
        }

        await addTruck(newTruck)
            .then(response => {
                if (response.Message === "Driver's truck is added.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnAddTruckDialogRemove();
                }
                else {
                    this.setState({
                        MessageBox: (<MessageBox Message="Truck Not Added." Show={true} />),
                    });
                }
            });
    }

    render() {
        return (
            <div class="modal" id="add-truck-dialog"
                tabindex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div class="modal-header">
                                    <img alt="add.png" src="./images/add.png" height="60" />
                                    <div class="type-h3">New Truck</div>
                                    <div class="type-sh3">These detials will be displayed on your profile.</div>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <ImageUploader Source={this.state.PhotoURL} Height="220px"
                                                    Width="220px" OnImageUploaded={this.onImageUploaded} OnInvalidImageSelected={this.onInvalidImageSelected} ImageCategory="Truck" />
                                            </div>
                                            <div class="form-group">
                                                <label class="text-danger">{this.state.Errors["PhotoURL"]}</label>
                                            </div>
                                        </div>
                                        <div class="col-md-12">                                          
                                            <div class="form-group">
                                                <label class="control-label">Plate Number</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="number" name="PlateNumber" class="form-control" autocomplete="off"
                                                    value={this.state.PlateNumber} onChange={this.onChange} />
                                                <span class="text-danger">{this.state.Errors["PlateNumber"]}</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">Owner</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="text" name="Owner" class="form-control" autocomplete="off"
                                                    value={this.state.Owner} onChange={this.onChange} />
                                                <span class="text-danger">{this.state.Errors["Owner"]}</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">Production Year</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="number" name="ProductionYear" class="form-control" autocomplete="off"
                                                    value={this.state.ProductionYear} onChange={this.onChange} placeholder="XXXX"/>
                                                <span class="text-danger">{this.state.Errors["ProductionYear"]}</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">Brand</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="text" name="Brand" class="form-control" autocomplete="off"
                                                    value={this.state.Brand} onChange={this.onChange} />
                                                <span class="text-danger">{this.state.Errors["Brand"]}</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">Truck Model</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="text" name="Model" class="form-control" autocomplete="off"
                                                    value={this.state.Model} onChange={this.onChange} />
                                                <span class="text-danger">{this.state.Errors["Model"]}</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">Truck Type</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="text" name="Type" class="form-control" autocomplete="off"
                                                    value={this.state.Type} onChange={this.onChange} />
                                                <span class="text-danger">{this.state.Errors["Type"]}</span>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">Maximum Weight (GVW)</label>
                                                <span class="text-danger" style={Required}>*</span>
                                                <input type="number" name="MaximumWeight" class="form-control" autocomplete="off"
                                                    value={this.state.MaximumWeight} onChange={this.onChange} />
                                                <span class="text-danger">{this.state.Errors["MaximumWeight"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnAddTruckDialogRemove}>Cancel</button>
                                    <input type="submit" value="Add" class="btn btn-primary"  disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </p>
                    </div>
                </div>
                {this.state.MessageBox}
            </div>             
        );
    }
};

export default AddTruck;