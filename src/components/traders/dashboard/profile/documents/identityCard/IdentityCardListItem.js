import React, { Component } from "react";
import EditIdentityCardDialog from "./EditIdentityCardDialog.js";
import { getData, deleteIdentityCard } from "../../../../TraderFunctions.js";
import Preloader from "../../../../../../controls/Preloader.js";

class IdentityCardListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Key: Math.floor(Math.random() * 100),
            IdentityCardID: "",
            IDNumber: "",
            PhotoURL: "./images/default_image.png",

            EditIdentityCardDialog: null,
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onDelete = () => {
        this.setState({
            Preloader: <Preloader />
        });

        let discardedIdentityCard = {
            Token: localStorage.Token
        };

        console.log(`Going to delete Identity Card.`);

        deleteIdentityCard(discardedIdentityCard).then(response => {
            console.log(response);
            if (response.Message === "Identity card is deleted.") {
                this.props.OnDocumentsUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh = () => {
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
                        PhotoURL: identityCard.PhotoURL
                    });
                }
                else {
                    this.setState({
                        IdentityCardID: "",
                        IDNumber: "",
                        PhotoURL: "./images/default_image.png"
                    });
                }
            });
        }
    };

    render() {
        return (
            <li className="list-items-row">
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
                            <div>
                                <span style={{ fontWeight: "bold", color: "#008575" }}>IDENTITY CARD</span>
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>ID Number:</span> {this.state.IDNumber}
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
                                        EditIdentityCardDialog: <EditIdentityCardDialog
                                            OnCancel={() => {
                                                this.setState({
                                                    EditIdentityCardDialog: null
                                                });
                                            }}
                                            OnOK={cancelButton => {
                                                cancelButton.click();
                                                this.onRefresh();
                                            }} />
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
            </li>        
        );
    }
};

export default IdentityCardListItem;