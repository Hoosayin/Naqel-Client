import React, { Component } from "react";
import ImageUploader from "../../../../../controls/ImageUploader";
import Preloader from "../../../../../controls/Preloader.js";
import { addTrailer } from "../../../DriverFunctions.js";

class AddTrailerDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            MaximumWeight: "",
            PhotoURL: "./images/default_image.png",
            Type: "",

            ValidMaximumWeight: false,
            ValidPhotoURL: false,
            ValidType: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                MaximumWeight: "",
                PhotoURL: "",
                Type: ""
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

        let ValidMaximumWeight = this.state.ValidMaximumWeight;
        let ValidPhotoURL = this.state.ValidPhotoURL;
        let ValidType = this.state.ValidType;

        switch (field) {
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
                Errors.PhotoURL = ValidPhotoURL ? "" : Dictionary.PhotoURLError;
                break;
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : Dictionary.TypeError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidMaximumWeight: ValidMaximumWeight,
            ValidPhotoURL: ValidPhotoURL,
            ValidType: ValidType
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidMaximumWeight &&
                        this.state.ValidPhotoURL &&
                        this.state.ValidType
                });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newTrailer = {
            Token: localStorage.Token,
            MaximumWeight: this.state.MaximumWeight,
            PhotoURL: this.state.PhotoURL,
            Type: this.state.Type
        }

        console.log("Going to add the trailer...");

        this.setState({
            Preloader: <Preloader />
        });

        await addTrailer(newTrailer).then(response => {
            this.setState({
                Preloader: null
            });

            if (response.Message === "Trailer is added.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-trailer-dialog"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.AddTrailer}</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.MaximumWeight}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="MaximumWeight" className="form-control" autocomplete="off"
                                                        value={this.state.MaximumWeight} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.MaximumWeight}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.TrailerType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Type" className="form-control" autocomplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
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
        AddTrailer: "إضافة مقطع دعائي جديد",
        MaximumWeight: "الوزن الأقصى (KG)",
        TrailerType: "نوع المقطورة",
        Add: "أضف",
        MaximumWeightError1: ".مطلوب الوزن الأقصى",
        MaximumWeightError2: ".يجب أن يكون الوزن الأقصى أكبر من 699",
        PhotoURLError: ".صورة غير صالحة. يرجى تحميل واحد صحيح",
        TypeError: ".النوع مطلوب",
    };
}
else {
    Dictionary = {
        AddTrailer: "Add a New Trailer",
        MaximumWeight: "Maximum Weight (KG)",
        TrailerType: "Trailer Type",
        Add: "Add",
        MaximumWeightError1: "Maximum Weight is required.",
        MaximumWeightError2: "Maximum weight must be greater than 699.",
        PhotoURLError: "Invalid Image. Please upload a correct one.",
        TypeError: "Type is required.",
    };
}

export default AddTrailerDialog;