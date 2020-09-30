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
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
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
                                    <span style={{ fontWeight: "bold", color: "#008575" }}>{Dictionary.IdentityCard}</span>
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
                                    <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.IdentityCardSubtitle}</div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-hashtag"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.IDNumber}</div>
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
                            }}>{Dictionary.Edit}</button>
                        <button type="button" className="btn btn-danger"
                            data-toggle="modal"
                            data-target={`#delete-identity-card-dialog`}>{Dictionary.Delete}</button>
                    </div>
                </div>  

                <div className="modal modal-center-vertical" id={`delete-identity-card-dialog`}
                    tabIndex="-1" role="dialog"
                    aria-labelledby="modal-sample-label" aria-hidden="true">
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
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-sh3 m-b-xxs">{Dictionary.DeleteMessage}</div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-danger"
                                                    onClick={async () => {
                                                        this.cancelButton.click();
                                                        await this.onDelete();
                                                    }}>{Dictionary.Delete}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.Preloader}
                {this.state.EditIdentityCardDialog}
            </li>        
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        IdentityCard: "البطاقة الشخصية",
        IdentityCardSubtitle: "البطاقة الشخصية",
        IDNumber: "رقم الهوية",
        Edit: "تعديل",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف بطاقة الهوية هذه؟",
    };
}
else {
    Dictionary = {
        IdentityCard: "IDENTITY CARD",
        IdentityCardSubtitle: "Identity Card",
        IDNumber: "ID Number",
        Edit: "Edit",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this identity card?",
    };
}

export default IdentityCardListItem;