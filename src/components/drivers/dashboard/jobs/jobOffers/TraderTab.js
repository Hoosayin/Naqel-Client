import React, { Component } from "react";
import UUID from "uuid-v4";
import DocumentsDialog from "./DocumentsDialog";

class TraderTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const trader = this.props.Trader;
        const profilePhoto = this.props.ProfilePhoto ?
            this.props.ProfilePhoto.PhotoURL : "./images/defaultProfilePhoto.png";

        const dialogID = UUID().substring(0, 7).toUpperCase();

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group" style={{ marginBottom: "5px", }}>
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={profilePhoto} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                {trader.FirstName + " " + trader.LastName}
                            </div>
                            <div className="type-sh3">
                                <span className="fas fa-briefcase" style={{ color: "#606060" }}></span>   {trader.Type}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <div class="item-icon">
                                                <span class={(trader.Gender === "Male") ? "fas fa-male" : "fas fa-female"}></span>
                                            </div>
                                            <div class="item-content-primary">
                                                <div class="content-text-primary">Gender</div>
                                                <div class="content-text-secondary">{trader.Gender}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <div class="item-icon">
                                                <span class="fas fa-birthday-cake"></span>
                                            </div>
                                            <div class="item-content-primary">
                                                <div class="content-text-primary">Birthday</div>
                                                <div class="content-text-secondary">{trader.DateOfBirth}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <div class="item-icon">
                                                <span class="fas fa-flag"></span>
                                            </div>
                                            <div class="item-content-primary">
                                                <div class="content-text-primary">Nationality</div>
                                                <div class="content-text-secondary">{trader.Nationality}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <div class="item-icon">
                                                <span class="fas fa-envelope"></span>
                                            </div>
                                            <div class="item-content-primary">
                                                <div class="content-text-primary">Email</div>
                                                <div class="content-text-secondary">{trader.Email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <div class="item-icon">
                                                <span class="fas fa-phone"></span>
                                            </div>
                                            <div class="item-content-primary">
                                                <div class="content-text-primary">Phone Number</div>
                                                <div class="content-text-secondary">{trader.PhoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <button type="button" className="btn btn-default"
                                                style={{ minWidth: "152px" }} data-toggle="modal"
                                                disabled={!this.props.Documents}
                                                data-target={`#documents-dialog-${dialogID}`}>Documents</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DocumentsDialog Documents={this.props.Documents} DialogID={dialogID} />
        </section>;
    }
};

export default TraderTab;