import React, { Component } from "react";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { getData, updateCommercialRegisterCertificate } from "../../../../TraderFunctions.js";

class EditCommercialRegisterCertificateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Number: "",
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
                        Number: commercialRegisterCertificate.Number,
                        Type: commercialRegisterCertificate.Type,
                        PhotoURL: commercialRegisterCertificate.PhotoURL,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        Number: "",
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
                Errors.Type = ValidType ? "" : "Certificate type is required.";
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
            Number: this.state.Number,
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
        return (
            <section>
                <div className="modal" id="edit-commercial-register-certificate-dialog"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="modal-header">
                                        <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                        <div className="type-h3">Edit Commercial Register Certificate</div>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
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
                                                <div className="form-group">
                                                    <label className="text-danger">{this.state.Errors.PhotoURL}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label">Certificate Number</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="text" name="Number" className="form-control" autoComplete="off" readOnly
                                                        value={this.state.Number} onChange={this.onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Certificate Type</label>
                                                    <span className="text-danger" style={Required}>*</span>
                                                    <input type="text" name="Type" className="form-control" autoComplete="off" required
                                                        value={this.state.Type} onChange={this.onChange} />
                                                    <span className="text-danger">{this.state.Errors.Type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Update" className="btn btn-primary" disabled={!this.state.ValidForm} />
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default EditCommercialRegisterCertificateDialog;