import React, { Component } from "react";

class DocumentsDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const identityCard = this.props.Documents.IdentityCard;
        const commercialRegisterCertificate = this.props.Documents.CommercialRegisterCertificate;

        const identityCardRow = identityCard ? <div className="row">
            <div className="col-md-8">
                <div className="form-group" style={{ marginBottom: "5px", }}>
                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                        src={identityCard.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                            overflow: "hidden",
                            border: "5px solid #3A3A3C",
                            margin: "5px"
                        }} />
                </div>
            </div>
            <div className="col-md-16">
                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Identity Card</div>
                <div className="row">
                    <div className="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-hashtag"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">ID Number</div>
                                    <div className="content-text-secondary">{identityCard.IDNumber}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;

        const commercialRegisterCertificateRow = commercialRegisterCertificate ? <div className="row">
            <div className="col-md-8">
                <div className="form-group" style={{ marginBottom: "5px", }}>
                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                        src={commercialRegisterCertificate.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                            overflow: "hidden",
                            border: "5px solid #3A3A3C",
                            margin: "5px"
                        }} />
                </div>
            </div>
            <div className="col-md-16">
                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Commercial Register Certificate</div>
                <div className="row">
                    <div className="col-md-24">
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-hashtag"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Certificate Number</div>
                                    <div className="content-text-secondary">{commercialRegisterCertificate.Number}</div>
                                </div>
                            </div>
                        </div>
                        <div className="entity-list">
                            <div className="entity-list-item">
                                <div className="item-icon">
                                    <span className="fas fa-cog"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Certificate Type</div>
                                    <div className="content-text-secondary">{commercialRegisterCertificate.Type}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;

        return <section>
            <div className="modal modal-center-vertical" id={`documents-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-secondary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                            <div className="type-h2" style={{ color: "#008575", paddingTop: "0px" }}>Documents</div>
                        </div>
                        <div className="modal-body">
                            <div className="jumbotron theme-default">
                                <div className="container">
                                    {identityCardRow}
                                    {commercialRegisterCertificateRow}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default DocumentsDialog;