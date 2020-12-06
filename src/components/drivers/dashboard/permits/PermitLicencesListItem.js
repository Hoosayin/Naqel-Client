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
                                                <div className="content-text-primary">{Dictionary.PermitNumber}</div>
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
                                                <div className="content-text-primary">{Dictionary.ExpiryDate}</div>
                                                <div className="content-text-secondary">{new Date(permitLicence.ExpiryDate).toDateString()}</div>
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
                                                <div className="content-text-primary">{Dictionary.PermitType}</div>
                                                <div className="content-text-secondary">{permitLicence.Type}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entity-list">
                                        <div className="entity-list-item">
                                            <div className="item-icon">
                                                <span className="fas fa-map-marker-alt"></span>
                                            </div>
                                            <div className="item-content-primary">
                                                <div className="content-text-primary">{Dictionary.PermitPlace}</div>
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
                    data-target={`#edit-permit-dialog${index}`}>{Dictionary.Edit}</button>
                <button type="button" className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-permit-licence-dialog-${index}`}>{Dictionary.Delete}</button>
            </div>
            <EditPermitLicenceDialog
                DialogID={index}
                PermitLicence={permitLicence}
                OnOK={async () => { await this.props.OnPermitLicenceUpdated(); }} />

            <div className="modal modal-center-vertical" id={`delete-permit-licence-dialog-${index}`}
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
                                            <div className="type-sh3 m-b-xxs">Are you sure you want to delete this permit licence?</div>
                                        </div>
                                        <div className="text-right">
                                            <button className="btn btn-danger"
                                                onClick={async () => {
                                                    this.cancelButton.click();
                                                    await this.onDelete(permitLicence.PermitLicenceID);
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
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        PermitNumber: "رقم الترخيص",
        ExpiryDate: "تاريخ الانتهاء",
        PermitType: "نوع رخصة التصريح",
        PermitPlace: "مكان التصريح",
        Edit: "تعديل",
        Delete: "حذف"
    };
}
else {
    Dictionary = {
        PermitNumber: "Permit Number",
        ExpiryDate: "Expiry Date",
        PermitType: "Permit Type",
        PermitPlace: "Permit Place",
        Edit: "Edit",
        Delete: "Delete"
    };
}

export default PermitLicenceListItem;