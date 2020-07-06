import React, { Component } from "react";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { addIdentityCard } from "../../../../TraderFunctions.js";

class AddIdentityCardDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IDNumber: "",
            PhotoURL: "./images/default_image.png",

            ValidIDNumber: false,
            ValidPhotoURL: false,

            ValidForm: false,
            Preloader: null,

            Errors: {
                IDNumber: "",
                PhotoURL: "",
            }
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

        let ValidIDNumber = this.state.ValidIDNumber;
        let ValidPhotoURL = this.state.ValidPhotoURL;

        switch (field) {
            case "IDNumber":
                ValidIDNumber = (value !== "");
                Errors.IDNumber = ValidIDNumber ? "" : Dictionary.IDNumberError1;

                if (Errors.IDNumber !== "") {
                    break;
                }

                ValidIDNumber = (value >= 1000000000 && value <= 9999999999);
                Errors.IDNumber = ValidIDNumber ? "" : Dictionary.IDNumberError2;
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : Dictionary.IDNumberError3;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidIDNumber: ValidIDNumber,
            ValidPhotoURL: ValidPhotoURL,
        }, () => {
                this.setState({
                    ValidForm: this.state.ValidIDNumber &&
                        this.state.ValidPhotoURL
                });
        });
    }

    onSubmit = event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newIdentityCard = {
            Token: localStorage.Token,
            IDNumber: this.state.IDNumber,
            PhotoURL: this.state.PhotoURL
        };

        console.log("Going to add Identity Card.");

        this.setState({
            Preloader: <Preloader />
        });

        addIdentityCard(newIdentityCard).then(response => {
            this.setState({
                Preloader: null
            });

            if (response.Message === "Identity card is added.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-identity-card-dialog"
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
                                                    Height="220px"
                                                    Width="220px"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.AddIdentityCard}</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.IDNumber}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="number" name="IDNumber" className="form-control" autoComplete="off" required
                                                        value={this.state.IDNumber} onChange={this.onChange} min="1000000000" max="99999999999" />
                                                    <span className="text-danger">{this.state.Errors.IDNumber}</span>
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
        AddIdentityCard: "أضف بطاقة الهوية الخاصة بك",
        IDNumber: "رقم الهوية",
        Add: "أضف",
        IDNumberError1: ".رقم الهوية مطلوب",
        IDNumberError2: ".يجب أن يتكون رقم الهوية من 10 أرقام",
        IDNumberError3: ".صورة غير صالحة. يرجى تحميل واحد صحيح"
    };
}
else {
    Dictionary = {
        AddIdentityCard: "Add Your Identity Card",
        IDNumber: "ID Number",
        Add: "Add",
        IDNumberError1: "ID number is required.",
        IDNumberError2: "ID number must be 10-digits long.",
        IDNumberError3: "Invalid Image. Please upload a correct one."
    };
}

export default AddIdentityCardDialog;