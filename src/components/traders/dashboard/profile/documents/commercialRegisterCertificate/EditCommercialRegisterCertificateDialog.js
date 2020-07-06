import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { getData, updateCommercialRegisterCertificate } from "../../../../TraderFunctions.js";

class EditCommercialRegisterCertificateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Type: "",
            PhotoURL: "./images/default_image.png",

            ValidType: true,
            ValidPhotoURL: true,

            ValidForm: false,
            Preloader: null,

            Errors: {
                Type: "",
                PhotoURL: ""
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh = () => {
        this.setState({
            Preloader: <Preloader />
        });

        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "CommercialRegisterCertificate"
            };

            getData(request).then(response => {
                if (response.Message === "Commercial register certificate found.") {
                    let commercialRegisterCertificate = response.CommercialRegisterCertificate;

                    this.setState({
                        Type: commercialRegisterCertificate.Type,
                        PhotoURL: commercialRegisterCertificate.PhotoURL,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        Type: "",
                        PhotoURL: "./images/default_image.png",
                        Preloader: null
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidType = this.state.ValidType;
        let ValidPhotoURL = this.state.ValidPhotoURL;

        switch (field) {
            case "Type":
                ValidType = (value !== "");
                Errors.Type = ValidType ? "" : Dictionary.TypeError;
                break;
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : Dictionary.PhotoURLError;
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidType: ValidType,
            ValidPhotoURL: ValidPhotoURL,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidType &&
                    this.state.ValidPhotoURL
            });
        });
    }

    onSubmit = event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const updatedCommercialRegisterCertificate = {
            Token: localStorage.Token,
            Type: this.state.Type,
            PhotoURL: this.state.PhotoURL
        };

        console.log("Going to update commercial register certificate.");

        this.setState({
            Preloader: <Preloader />
        });

        updateCommercialRegisterCertificate(updatedCommercialRegisterCertificate).then(response => {
            if (response.Message === "Commercial register certificate is updated.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return <section>
            <div className="modal modal-center-vertical" id="add-commercial-register-certificate-dialog"
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.EditCRCertificate}</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CertificateType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Type" className="form-control" autoComplete="off"
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
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

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        EditCRCertificate: "تحرير شهادة السجل التجاري",
        CertificateType: "نوع الشهادة",
        Update: "تحديث",
        TypeError: ".نوع الشهادة مطلوب",
        PhotoURLError: ".صورة غير صالحة. يرجى تحميل واحد صحيح"
    };
}
else {
    Dictionary = {
        EditCRCertificate: "Edit Commercial Register Certificate",
        CertificateType: "Certificate Type",
        Update: "Update",
        TypeError: "Certificate type is required.",
        PhotoURLError: "Invalid Image. Please upload a correct one."
    };
}

export default EditCommercialRegisterCertificateDialog;