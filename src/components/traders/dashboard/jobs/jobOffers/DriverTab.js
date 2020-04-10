import React, { Component } from "react";
import UUID from "uuid-v4";
import DocumentsDialog from "./DocumentsDialog";

class DriverTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const driver = this.props.Driver;
        const driverProfilePhoto = this.props.DriverProfilePhoto ?
            this.props.DriverProfilePhoto : "./images/defaultProfilePhoto.png";
        const driverRequest = this.props.DriverRequest;

        const dialogID = UUID().substring(0, 7).toUpperCase();

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group" style={{ marginBottom: "5px", }}>
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={driverProfilePhoto} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                                {driver.FirstName + " " + driver.LastName}
                            </div>
                            <div className="type-sh3" style={{ color: "#008575" }}>
                                {(driverRequest.Price) ? `BADE AT $${driverRequest.Price}.` : "WANTS TO TAKE YOUR OFFER."}
                            </div>
                            <div className="type-sh3">
                                <span className="fas fa-car" style={{ color: "#606060" }}></span>   Driver
                            </div>
                            {(index === 0) ? <div className="type-sh3" style={{ color: "#FFBF15" }}>
                                <span className="fas fa-certificate" style={{ color: "#FFBF15" }}></span>   LATEST
                                </div> : null}
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <div class="item-icon">
                                                <span class={(driver.Gender === "Male") ? "fas fa-male" : "fas fa-female"}></span>
                                            </div>
                                            <div class="item-content-primary">
                                                <div class="content-text-primary">Gender</div>
                                                <div class="content-text-secondary">{driver.Gender}</div>
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
                                                <div class="content-text-secondary">{driver.DateOfBirth}</div>
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
                                                <div class="content-text-secondary">{driver.Nationality}</div>
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
                                                <div class="content-text-secondary">{driver.Email}</div>
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
                                                <div class="content-text-secondary">{driver.PhoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="entity-list">
                                        <div class="entity-list-item">
                                            <button type="button" className="btn btn-default"
                                                style={{ minWidth: "152px" }} data-toggle="modal"
                                                disabled
                                                data-target={`#driver-request-documents-dialog-${dialogID}`}>Documents</button>
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

export default DriverTab;