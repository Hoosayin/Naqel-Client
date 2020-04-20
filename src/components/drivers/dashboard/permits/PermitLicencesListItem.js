import React, { Component } from "react";
import { deletePermitLicence } from "../../DriverFunctions.js";
import EditPermitLicenceDialog from "./EditPermitLicenceDialog.js";
import Preloader from "../../../../controls/Preloader.js";

class PermitLicenceListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllPermitLicences: [],
            PermitLicences: [],
            EditPermitLicenceDialogs: [],
            SearchString: "",
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async permitLicenceID => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedPermitLicence = {
            Token: localStorage.Token,
            PermitLicenceID: permitLicenceID
        };

        console.log("Going to delete Permit licence...");

        await deletePermitLicence(discardedPermitLicence).then(async response => {
            if (response.Message === "Permit Licence is deleted.") {
                await this.props.OnPermitLicenceUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        const index = this.props.Index;
        const permitLicence = this.props.PermitLicence;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={permitLicence.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div className="col-md-18">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`${index + 1}.`}</div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-hashtag"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Permit Number</div>
                                                <div className="content-text-secondary">{permitLicence.PermitNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-calendar"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Expiry Date</div>
                                                <div className="content-text-secondary">{permitLicence.ExpiryDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-asterisk"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Permit Code</div>
                                                <div className="content-text-secondary">{permitLicence.Code}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-map-marker-alt"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">Permit Place</div>
                                                <div className="content-text-secondary">{permitLicence.Place}</div>
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
                    data-target={`#edit-permit-dialog${index}`}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={async () => { await this.onDelete(permitLicence.PermitLicenceID); }}>Delete</button>
            </div>
            <EditPermitLicenceDialog
                DialogID={index}
                PermitLicence={permitLicence}
                OnOK={async () => { await this.props.OnPermitLicenceUpdated(); }} />
            {this.state.Preloader}
        </section>;
    }
};

export default PermitLicenceListItem;