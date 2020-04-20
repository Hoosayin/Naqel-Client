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
        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            <div data-toggle="collapse" aria-expanded="false" data-target={`#identity-card-${this.state.IdentityCardID}`}>
                <div className="entity-list">
                    <div className="entity-list-item">
                        <div className="item-icon" style={{ borderRadius: "50%" }}>
                            <span className="glyph glyph-add"></span>
                            <span className="glyph glyph-remove"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">
                                <span style={{ fontWeight: "bold", color: "#008575" }}>{`${this.props.Index}.`}</span>
                            </div>
                            <div className="content-text-secondary">
                                <span style={{ fontWeight: "bold", color: "#008575" }}>IDENTITY CARD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="collapse" id={`identity-card-${this.state.IdentityCardID}`}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={this.state.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Identity Card</div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-hashtag"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">ID Number</div>
                                                    <div className="content-text-secondary">{this.state.IDNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#E5E5E5", textAlign: "right", padding: "10px" }}>
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
                        }}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(); }}>Delete</button>
                </div>
            </div> 
            {this.state.Preloader}
            {this.state.EditIdentityCardDialog}
        </li>;
    }
};

export default IdentityCardListItem;