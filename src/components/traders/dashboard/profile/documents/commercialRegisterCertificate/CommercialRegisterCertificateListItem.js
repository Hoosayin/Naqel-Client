import React, { Component } from "react";
import EditCommercialRegisterCertificateDialog from "./EditCommercialRegisterCertificateDialog.js";
import { getData, deleteCommercialRegisterCertificate } from "../../../../TraderFunctions.js";
import Preloader from "../../../../../../controls/Preloader.js";

class CommercialRegisterCertificateListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ID: "",
            Number: "",
            Type: "",
            PhotoURL: "./images/default_image.png",

            EditCommercialRegisterCertificateDialog: null,
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onDelete = () => {
        this.setState({
            Preloader: <Preloader />
        });

        let discardedCommercialRegisterCertificate = {
            Token: localStorage.Token
        };

        console.log(`Going to delete commercial register certificate.`);

        deleteCommercialRegisterCertificate(discardedCommercialRegisterCertificate).then(response => {
            if (response.Message === "Commercial register certificate is deleted.") {
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
                Get: "CommercialRegisterCertificate"
            };

            getData(request).then(response => {
                if (response.Message === "Commercial register certificate found.") {
                    let commercialRegisterCertificate = response.CommercialRegisterCertificate;

                    this.setState({
                        ID: commercialRegisterCertificate.ID,
                        Number: commercialRegisterCertificate.Number,
                        Type: commercialRegisterCertificate.Type,
                        PhotoURL: commercialRegisterCertificate.PhotoURL
                    });
                }
                else {
                    this.setState({
                        ID: "",
                        Number: "",
                        Type: "",
                        PhotoURL: "./images/default_image.png"
                    });
                }
            });
        }
    };

    render() {
        return (
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div data-toggle="collapse" aria-expanded="false" data-target={`#commercial-register-certificate-${this.state.ID}`}>
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
                                    <span style={{ fontWeight: "bold", color: "#008575" }}>{Dictionary.CRCertificate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="collapse" id={`commercial-register-certificate-${this.state.ID}`}>
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
                                    <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.CRCertificateSubtitle}</div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-hashtag"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.CertificateNumber}</div>
                                                        <div className="content-text-secondary">{this.state.Number}</div>
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
                                                        <div className="content-text-secondary">{this.state.Type}</div>
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
                            data-target="#edit-commercial-register-certificate-dialog"
                            onMouseDown={() => {
                                this.setState({
                                    EditCommercialRegisterCertificateDialog: <EditCommercialRegisterCertificateDialog
                                        OnCancel={() => {
                                            this.setState({
                                                EditCommercialRegisterCertificateDialog: null
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
                {this.state.EditCommercialRegisterCertificateDialog}
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