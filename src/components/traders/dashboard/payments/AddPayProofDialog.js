import React, { Component } from "react";
import ImageUploader from "../../../../controls/ImageUploader";
import Preloader from "../../../../controls/Preloader";
import { addTraderPayProof } from "../../TraderFunctions";

class AddPayProofDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PhotoURL: "./images/default_image.png",

            ValidPhotoURL: false,

            ValidForm: false,
            ShowPreloader: false,

            Errors: {
                PhotoURL: ""
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    validateField(field, value) {
        let Errors = this.state.Errors;
        let ValidPhotoURL = this.state.ValidPhotoURL;

        switch (field) {
            case "PhotoURL":
                ValidPhotoURL = (value !== null);
                Errors.PhotoURL = ValidPhotoURL ? "" : "Invalid Image. Please upload a correct one.";
                break;
            default:
                break;
        }

        this.setState({
            Errors: Errors,
            ValidPhotoURL: ValidPhotoURL,
        }, () => {
            this.setState({
                ValidForm: this.state.ValidPhotoURL
            });
        });
    }

    onSubmit = async event => {
        event.preventDefault();

        if (!this.state.ValidForm) {
            return;
        }

        const newTraderPayProof = {
            Token: sessionStorage.Token,
            TraderBillID: this.props.TraderBillID,
            PhotoURL: this.state.PhotoURL
        };

        console.log("Going to add trader pay proof.");

        this.setState({
            ShowPreloader: true
        });

        await addTraderPayProof(newTraderPayProof).then(response => {
            if (response.Message === "Trader pay proof is added.") {
                this.setState({
                    ShowPreloader: false
                });

                this.cancelButton.click();
                this.props.OnOK();
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    }

    render() {
        const showPreloader = this.state.ShowPreloader;
        const index = this.props.Index;

        return <section>
            <div className="modal modal-center-vertical" id={`add-pay-proof-dialog-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                {showPreloader ? <Preloader /> : null}
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
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
                                                <div className="form-group">
                                                    <label className="text-danger"></label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="type-h3 color-default p-t-n">Upload Payment Proof</div>
                                                <div className="type-sh3"> The proof of a payment can be a Bank Transfer Receipt.</div>
                                                <div className="type-sh4 text-danger">{this.state.Errors.PhotoURL}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value="Upload" className="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default AddPayProofDialog;