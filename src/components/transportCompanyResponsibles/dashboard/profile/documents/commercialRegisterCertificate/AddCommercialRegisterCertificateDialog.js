import React, { Component } from "react";
import ImageUploader from "../../../../../../controls/ImageUploader";
import Preloader from "../../../../../../controls/Preloader";
import { addCommercialRegisterCertificate } from "../../../../TransportCompanyResponsiblesFunctions";

class AddCommercialRegisterCertificateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PhotoURL: "./images/default_image.png",
            Type: "",

            ValidPhotoURL: false,
            ValidType: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                PhotoURL: "",
                Type: ""
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
        let {
            Errors,
            ValidType,
            ValidPhotoURL
        } = this.state;

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
                ValidForm: ValidType &&
                    ValidPhotoURL
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        const newCommercialRegisterCertificate = {
            Token: localStorage.Token,
            Type: this.state.Type,
            PhotoURL: this.state.PhotoURL
        };

        await addCommercialRegisterCertificate(newCommercialRegisterCertificate).then(response => {
            this.setState({
                ShowPreloader: false
            });

            console.log(response);

            if (response.Message === "Commercial register certificate is added.") {
                this.cancelButton.click();
                this.props.OnOK(response.CommercialRegisterCertificate);
            }
        });
    }

    render() {
        const {
            Type,
            PhotoURL,
            ValidForm,
            ShowPreloader,
            Errors
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id={`add-commercial-register-certificate-dialog`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {ShowPreloader ? <Preloader /> : null}
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
                                                    Source={PhotoURL}
                                                    OnImageUploaded={response => {
                                                        if (response.message === "Image uploaded successfully.") {
                                                            this.setState({
                                                                PhotoURL: response.imageUrl
                                                            });

                                                            this.validateField("PhotoURL", PhotoURL);
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
                                                <div className="type-h3 color-default p-t-xxs">{Dictionary.AddCRCertificate}</div>
                                                <div className="type-sh4 text-danger">{Errors.PhotoURL}</div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.CertificateType}</label>
                                                    <span className="text-danger m-l-xxxs">*</span>
                                                    <input type="text" name="Type" className="form-control" autoComplete="off"
                                                        value={Type} onChange={this.onChange} />
                                                    <span className="text-danger">{Errors.Type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.Add} className="btn btn-primary" disabled={!ValidForm} />
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
        AddCRCertificate: "إضافة شهادة السجل التجاري",
        CertificateType: "نوع الشهادة",
        Add: "أضف",
        TypeError: ".نوع الشهادة مطلوب",
        PhotoURLError: ".صورة غير صالحة. يرجى تحميل واحد صحيح"
    };
}
else {
    Dictionary = {
        AddCRCertificate: "Add Commercial Register Certificate",
        CertificateType: "Certificate Type",
        Add: "Add",
        TypeError: "Certificate type is required.",
        PhotoURLError: "Invalid Image. Please upload a correct one."
    };
}

export default AddCommercialRegisterCertificateDialog;