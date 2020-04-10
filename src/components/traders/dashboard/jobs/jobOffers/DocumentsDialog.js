import React, { Component } from "react";

class DocumentsDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const identityCard = this.props.Documents.IdentityCard;
        const entryExitCard = this.props.Documents.EntryExitCard;
        const drivingLicence = this.props.Documents.DrivingLicence;

        const IdentityCard = identityCard ? <div className="row">
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
                <div className="type-h5" style={{ color: "#008575", paddingTop: "0px" }}>Identity Card</div>
                <div className="row">
                    <div className="col-md-24">
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-hashtag"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">ID Number</div>
                                    <div class="content-text-secondary">{identityCard.IDNumber}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;

        const DrivingLicence = drivingLicence ? <div className="row">
            <div className="col-md-8">
                <div className="form-group" style={{ marginBottom: "5px", }}>
                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                        src={drivingLicence.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                            overflow: "hidden",
                            border: "5px solid #3A3A3C",
                            margin: "5px"
                        }} />
                </div>
            </div>
            <div className="col-md-16">
                <div className="type-h5" style={{ color: "#008575", paddingTop: "0px" }}>Driving Licence</div>
                <div className="row">
                    <div className="col-md-24">
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-hashtag"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Licence Number</div>
                                    <div class="content-text-secondary">{drivingLicence.LicenceNumber}</div>
                                </div>
                            </div>
                        </div>
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-cog"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Licence Type</div>
                                    <div class="content-text-secondary">{drivingLicence.Type}</div>
                                </div>
                            </div>
                        </div>
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-calendar"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Release Date</div>
                                    <div class="content-text-secondary">{new Date(drivingLicence.ReleaseDate).toDateString()}</div>
                                </div>
                            </div>
                        </div>
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-calendar"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Expiry Date</div>
                                    <div class="content-text-secondary">{new Date(drivingLicence.ExpiryDate).toDateString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;

        const EntryExitCard = entryExitCard ? <div className="row">
            <div className="col-md-8">
                <div className="form-group" style={{ marginBottom: "5px", }}>
                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                        src="./images/default_image.png" alt="profile_photo.png" data-source-index="2" style={{
                            overflow: "hidden",
                            border: "5px solid #3A3A3C",
                            margin: "5px"
                        }} />
                </div>
            </div>
            <div className="col-md-16">
                <div className="type-h5" style={{ color: "#008575", paddingTop: "0px" }}>Entry/Exit Card</div>
                <div className="row">
                    <div className="col-md-24">
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-hashtag"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Entry/Exit Number</div>
                                    <div class="content-text-secondary">{entryExitCard.EntryExitNumber}</div>
                                </div>
                            </div>
                        </div>
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-cog"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Card Type</div>
                                    <div class="content-text-secondary">{entryExitCard.Type}</div>
                                </div>
                            </div>
                        </div>
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-calendar"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Release Date</div>
                                    <div class="content-text-secondary">{new Date(entryExitCard.ReleaseDate).toDateString()}</div>
                                </div>
                            </div>
                        </div>
                        <div class="entity-list">
                            <div class="entity-list-item">
                                <div class="item-icon">
                                    <span class="fas fa-hashtag"></span>
                                </div>
                                <div class="item-content-primary">
                                    <div class="content-text-primary">Number of Months</div>
                                    <div class="content-text-secondary">{entryExitCard.NumberOfMonths}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;

        return <section>
            <div className="modal" id={`driver-request-documents-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ padding: "0px", backgroundColor: "#FFFFFF" }}>
                        <div className="jumbotron theme-default">
                            <div className="container">
                                <div className="modal-header">
                                    <div className="type-h4" style={{ color: "#008575", paddingTop: "0px" }}>Documents</div>
                                </div>
                                <div className="modal-body">
                                    {IdentityCard}
                                    {DrivingLicence}
                                    {EntryExitCard}
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-default" data-dismiss="modal">Close</button>
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