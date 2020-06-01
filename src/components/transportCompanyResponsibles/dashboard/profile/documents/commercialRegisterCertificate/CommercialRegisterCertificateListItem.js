import React, { Component } from "react";
import Preloader from "../../../../../../controls/Preloader";
import EditCommercialRegisterCertificateDialog from "./EditCommercialRegisterCertificateDialog";
import { deleteCommercialRegisterCertificate } from "../../../../TransportCompanyResponsiblesFunctions";

class CommercialRegisterCertificateListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: null
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowPreloader: true
        });

        let discardedCommercialRegisterCertificate = {
            Token: localStorage.Token
        };

        await deleteCommercialRegisterCertificate(discardedCommercialRegisterCertificate).then(response => {
            this.setState({
                ShowPreloader: false
            });

            if (response.Message === "Commercial register certificate is deleted.") {
                this.props.OnCertificateDeleted();
            }
        });
    }

    render() {
        const {
            ShowPreloader
        } = this.state;

        const {
            CommercialRegisterCertificate
        } = this.props;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            <div data-toggle="collapse" aria-expanded="false" data-target={`#commercial-register-certificate-list-item`}>
                <div className="entity-list">
                    <div className="entity-list-item">
                        <div className="item-icon" style={{ borderRadius: "50%" }}>
                            <span className="glyph glyph-add"></span>
                            <span className="glyph glyph-remove"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">
                                <span style={{ fontWeight: "bold", color: "#008575" }}>1.</span>
                            </div>
                            <div className="content-text-secondary">
                                <span style={{ fontWeight: "bold", color: "#008575" }}>COMMERCIAL REGISTER CERTIFICATE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="collapse" id={`commercial-register-certificate-list-item`}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    src={CommercialRegisterCertificate.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                        overflow: "hidden",
                                        border: "5px solid #3A3A3C",
                                        margin: "5px"
                                    }} />
                            </div>
                            <div className="col-md-18">
                                <div className="type-h3 color-default p-t-xxs">Commercial Register Certificate</div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-hashtag"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Certificate Number</div>
                                                    <div className="content-text-secondary">{CommercialRegisterCertificate.Number}</div>
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
                                                    <div className="content-text-secondary">{CommercialRegisterCertificate.Type}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right back-color-gray p-xxs">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#edit-commercial-register-certificate-dialog">Edit</button>
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete</button>
                </div>
            </div>
            {ShowPreloader ? <Preloader /> : null}
            <EditCommercialRegisterCertificateDialog CommercialRegisterCertificate={CommercialRegisterCertificate}
                OnOK={this.props.OnCertificateUpdated} />
        </li>;
    }
};

export default CommercialRegisterCertificateListItem;