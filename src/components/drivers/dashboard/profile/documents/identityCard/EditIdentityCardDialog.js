import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Required } from "../../../../../../styles/MiscellaneousStyles.js";
import ImageUploader from "../../../../../../controls/ImageUploader.js";
import Preloader from "../../../../../../controls/Preloader.js";
import { updateIdentityCard } from "../../../../DriverFunctions.js";

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
        if (localStorage.userToken) {
            const identityCard = jwt_decode(localStorage.userToken).IdentityCard;

            if (identityCard) {
                this.setState({
                    IDNumber: identityCard.IDNumber,
                    PhotoURL: identityCard.PhotoURL,
                });

                return;
            }
        }

        this.setState({
            IDNumber: "",
            PhotoURL: "./images/default_image.png",
        });
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
                Errors.IDNumber = ValidIDNumber ? "" : "ID number is required.";

                if (Errors.IDNumber !== "") {
                    break;
                }

                ValidIDNumber = (value >= 1000000000 && value <= 9999999999);
                Errors.IDNumber = ValidIDNumber ? "" : "ID number must be 10-digits long.";
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
            Token: localStorage.getItem("userToken"),
            IDNumber: this.state.IDNumber,
            PhotoURL: this.state.PhotoURL,
        }

        console.log("Going to update Identity Card.");

        this.setState({
            Preloader: <Preloader />
        });

        await updateIdentityCard(updatedIdentityCard).then(response => {
            if (response.Message === "Identity card is updated.") {
                localStorage.setItem("userToken", response.Token);
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
                <div class="modal" id="edit-identity-card-dialog"
                    tabindex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
                    {this.state.Preloader}
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <section>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div class="modal-header">
                                        <img alt="pencil.png" src="./images/pencil.png" height="60" />
                                        <div class="type-h3">Edit Identity Card</div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
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
                                                <div class="form-group">
                                                    <label class="text-danger">{this.state.Errors.PhotoURL}</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="control-label">ID Number</label>
                                                    <span class="text-danger" style={Required}>*</span>
                                                    <input type="number" name="IDNumber" class="form-control" autoComplete="off" required
                                                        value={this.state.IDNumber} onChange={this.onChange} min="1000000000" max="99999999999" />
                                                    <span class="text-danger">{this.state.Errors.IDNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-default" data-dismiss="modal" onClick={this.props.OnCancel}
                                            ref={cancelButton => this.cancelButton = cancelButton}>Cancel</button>
                                        <input type="submit" value="Update" class="btn btn-primary" disabled={!this.state.ValidForm} />
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

export default EditIdentityCardDialog;