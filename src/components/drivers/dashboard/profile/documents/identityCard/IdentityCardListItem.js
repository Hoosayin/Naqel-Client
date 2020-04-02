import React, { Component } from "react";
import EditIdentityCardDialog from "./EditIdentityCardDialog.js";
import { getData, deleteIdentityCard } from "../../../../DriverFunctions.js";
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
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    onDelete = async () => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedIdentityCard = {
            Token: localStorage.Token
        };

        console.log(`Going to delete Identity Card.`);

        await deleteIdentityCard(discardedIdentityCard).then(response => {
            if (response.Message === "Identity card is deleted.") {
                this.props.OnDocumentsUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "IdentityCard"
            };

            getData(request).then(response => {
                if (response.Message === "Identity card found.") {
                    let identityCard = response.IdentityCard;

                    this.setState({
                        IdentityCardID: identityCard.IdentityCardID,
                        IDNumber: identityCard.IDNumber,
                        PhotoURL: identityCard.PhotoURL,
                    });
                }
                else {
                    this.setState({
                        IdentityCardID: "",
                        IDNumber: "",
                        PhotoURL: "./images/default_image.png",
                    });
                }
            });
        }
    };

    render() {
        return <li className="list-items-row">
            <div data-toggle="collapse" aria-expanded="false" data-target={`#identity-card-${this.state.IdentityCardID}`}>
                <div className="row">
                    <div className="col-md-2">
                        <i className="glyph glyph-add"></i>
                        <i className="glyph glyph-remove"></i>
                        <strong>{this.props.Index}</strong>
                    </div>
                    <div className="col-md-4">
                        <img className="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                            src={this.state.PhotoURL} alt="identity_card.png" data-source-index="2" style={{
                                overflow: "hidden",
                                border: "5px solid #3A3A3C",
                                margin: "5px"
                            }} />
                    </div>
                    <div className="col-md-6">
                        <div style={{ padding: "3px 0px 3px 0px" }}>
                            <span style={{ fontWeight: "bold", color: "#008575" }}>IDENTITY CARD</span>
                        </div>
                        <div style={{ padding: "3px 0px 3px 0px" }}>
                            <span className="fas fa-hashtag" style={{ color: "#606060" }}></span>
                            <span style={{ fontWeight: "bold", color: "#606060" }}>ID Number:</span> {this.state.IDNumber}
                        </div>
                    </div>
                </div>
            </div>

            <div className="collapse" id={`identity-card-${this.state.IdentityCardID}`}>
                <div className="row">
                    <div className="col-md-18 col-md-offset-2">
                        <img className="img-responsive visible-xs-inline-block visible-sm-inline-block"
                            src={this.state.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                overflow: "hidden",
                                border: "5px solid #3A3A3C",
                                margin: "5px"
                            }} />
                    </div>
                    <div className="col-md-4 text-right">
                        <button
                            type="button"
                            className="btn btn-primary"
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
                                            this.onComponentUpdated();
                                        }} />)
                                });
                            }}>
                            Edit
                                </button>
                        <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(); }}>Delete</button>
                    </div>
                </div>
            </div>
            {this.state.Preloader}
            {this.state.EditIdentityCardDialog}
        </li>;
    }
};

export default IdentityCardListItem;