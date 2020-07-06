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
                                <span style={{ fontWeight: "bold", color: "#008575" }}>{Dictionary.CRCertificate}</span>
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
                                <div className="type-h3 color-default p-t-xxs">{Dictionary.CRCertificateSubtitle}</div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-hashtag"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">{Dictionary.CertificateNumber}</div>
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
                                                    <div className="content-text-primary">{Dictionary.CertificateType}</div>
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
                        data-target="#edit-commercial-register-certificate-dialog">{Dictionary.Edit}</button>
                    <button type="button" className="btn btn-danger"
                        data-toggle="modal"
                        data-target={`#delete-crc-dialog`}>{Dictionary.Delete}</button>
                </div>
            </div>

            <div className="modal modal-center-vertical" id={`delete-crc-dialog`}
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
                            <div className="jumbotron theme-default" dir={GetDirection()}>
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

            {ShowPreloader ? <Preloader /> : null}
            <EditCommercialRegisterCertificateDialog CommercialRegisterCertificate={CommercialRegisterCertificate}
                OnOK={this.props.OnCertificateUpdated} />
        </li>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        CRCertificate: "شهادة السجل التجاري",
        CRCertificateSubtitle: "شهادة السجل التجاري",
        CertificateNumber: "رقم شهادة",
        CertificateType: "نوع الشهادة",
        Edit: "تعديل",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف شهادة السجل التجاري هذه؟"
    };
}
else {
    Dictionary = {
        CRCertificate: "COMMERCIAL REGISTER CERTIFICATE",
        CRCertificateSubtitle: "Commercial Register Certificate",
        CertificateNumber: "Certificate Number",
        CertificateType: "Certificate Type",
        Edit: "Edit",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this commercial register certificate?"
    };
}

export default CommercialRegisterCertificateListItem;