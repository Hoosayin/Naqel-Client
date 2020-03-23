import React, { Component } from "react";
import UUID from "uuid-v4";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { addCommercialRegisterCertificate } from "../../../../TraderFunctions.js";

class AddCommercialRegisterCertificateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Number: UUID(),
            Type: "",
            PhotoURL: "./images/default_image.png",

            ValidType: false,
            ValidPhotoURL: false,

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
    }

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

        const newCommercialRegisterCertificate = {
            Token: localStorage.Token,
            Number: this.state.Number,
            Type: this.state.Type,
            PhotoURL: this.state.PhotoURL
        };

        console.log("Going to add commercial register certificate.");

        this.setState({
            Preloader: <Preloader />
        });

        addCommercialRegisterCertificate(newCommercialRegisterCertificate).then(response => {
            if (response.Message === "Commercial register certificate is added.") {
                this.props.OnOK(this.cancelButton);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return (
            <section className="text-left">
                <div className="modal" id="add-commercial-register-certificate-dialog"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="modal-header">
                                        <img alt="add.png" src="./images/add.png" height="60" />
                                        <div className="type-h3">Add Commercial Register Certificate</div>
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
                                                        ImageCategory="CommercialRegisterCertificate" />
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
                                        <input type="submit" value="Add" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default AddCommercialRegisterCertificateDialog;