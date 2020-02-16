import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import EditIdentityCardDialog from "./EditIdentityCardDialog.js";
import { deleteIdentityCard } from "../../../../DriverFunctions.js";
import Preloader from "../../../../../../controls/Preloader.js";

class IdentityCardListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IdentityCardID: "",
            IDNumber: "",
            PhotoURL: "./images/default_image.png",

            EditIdentityCardDialog: null,
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedIdentityCard = {
            Token: localStorage.getItem("userToken")
        };

        console.log(`Going to delete Identity Card.`);

        await deleteIdentityCard(discardedIdentityCard)
            .then(response => {
                if (response.Message === "Identity card is deleted.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnDocumentsUpdated();
                }

                this.setState({
                    Preloader: null
                });
            });
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const identityCard = jwt_decode(localStorage.userToken).IdentityCard;

            if (identityCard) {
                this.setState({
                    IdentityCardID: identityCard.IdentityCardID,
                    IDNumber: identityCard.IDNumber,
                    PhotoURL: identityCard.PhotoURL,
                });

                return;
            }
        }

        this.setState({
            IdentityCardID: "",
            IDNumber: "",
            PhotoURL: "./images/default_image.png",
        });
    }

    render() {
        return (
            <li class="list-items-row">
                <div data-toggle="collapse" aria-expanded="false" data-target={`#identity-card-${this.state.IdentityCardID}`}>
                    <div class="row">
                        <div class="col-md-2">
                            <i class="glyph glyph-add"></i>
                            <i class="glyph glyph-remove"></i>
                            <strong>{this.props.Index}</strong>
                        </div>
                        <div class="col-md-4">
                            <img class="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={this.state.PhotoURL} alt="identity_card.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div class="col-md-6">
                            <div>
                                <span style={{ fontWeight: "bold", color: "#008575" }}>IDENTITY CARD</span>
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>ID Number:</span> {this.state.IDNumber}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="collapse" id={`identity-card-${this.state.IdentityCardID}`}>
                    <div class="row">
                        <div class="col-md-18 col-md-offset-2">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                src={this.state.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div class="col-md-4 text-right">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#edit-identity-card-dialog"
                                onMouseDown={() => {
                                    this.setState({
                                        EditIdentityCardDialog: (<EditIdentityCardDialog
                                            OnCancel={() => {
                                                this.setState({
                                                    EditIdentityCardDialog: null
                                                });
                                            }}
                                            OnOK={cancelButton => {
                                                cancelButton.click();
                                                this.props.OnDocumentsUpdated();
                                            }} />)
                                    });
                                }}>
                                Edit
                                </button>
                            <button type="button" class="btn btn-danger" onClick={() => { this.onDelete(); }}>Delete</button>
                        </div>
                    </div>
                </div>               
                {this.state.Preloader}
                {this.state.EditIdentityCardDialog}
            </li>        
        );
    }
};

export default IdentityCardListItem;