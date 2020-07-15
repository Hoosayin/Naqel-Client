import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { getData, updateIdentityCard } from "../../../../DriverFunctions.js";

class EditIdentityCardDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IDNumber: "",
            PhotoURL: "./images/default_image.png",

            ValidIDNumber: true,
            ValidPhotoURL: true,

            ValidForm: false,
            Preloader: null,

            Errors: {
                IDNumber: "",
                PhotoURL: "",
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "IdentityCard"
            };

            getData(request).then(response => {
                if (response.Message === "Identity card found.") {
                    let identityCard = response.IdentityCard;

                    this.setState({
                        IDNumber: identityCard.IDNumber,
                        PhotoURL: identityCard.PhotoURL,
                    });
                }
                else {
                    this.setState({
                        IDNumber: "",
                        PhotoURL: "./images/default_image.png",
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

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedIdentityCard = {
            Token: sessionStorage.Token,
            IDNumber: this.state.IDNumber,
            PhotoURL: this.state.PhotoURL
        };

        console.log("Going to update Identity Card.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateIdentityCard(updatedIdentityCard).then(response => {
            this.setState({
                Preloader: null
            });

            if (response.Message === "Identity card is updated.") {
                this.props.OnOK(this.cancelButton);
            }
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="edit-identity-card-dialog"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.EditIdentityCard}</div>
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
                                            <input type="submit" value={Dictionary.Update} className="btn btn-primary" disabled={!this.state.ValidForm} />
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

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        EditIdentityCard: "تحرير بطاقة الهوية الخاصة بك",
        IDNumber: "رقم الهوية",
        Update: "تحديث",
        IDNumberError1: ".رقم الهوية مطلوب",
        IDNumberError2: ".يجب أن يتكون رقم الهوية من 10 أرقام",
        IDNumberError3: ".صورة غير صالحة. يرجى تحميل واحد صحيح"
    };
}
else {
    Dictionary = {
        EditIdentityCard: "Edit Your Identity Card",
        IDNumber: "ID Number",
        Update: "Update",
        IDNumberError1: "ID number is required.",
        IDNumberError2: "ID number must be 10-digits long.",
        IDNumberError3: "Invalid Image. Please upload a correct one."
    };
}

export default EditIdentityCardDialog;