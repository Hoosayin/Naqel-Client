import React, { Component } from "react";
import EditDriverLicenceDialog from "./EditDrivingLicenceDialog.js";
import { getData, deleteDrivingLicence } from "../../../../DriverFunctions.js";
import Preloader from "../../../../../../controls/Preloader.js";

class DrivingLicenceListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DrivingLicenceID: "",
            LicenceNumber: "",
            Type: "",
            ReleaseDate: "",
            ExpiryDate: "",
            PhotoURL: "./images/default_image.png",
            EditDrivingLicenceDialog: null,
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    onDelete = async () => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedDrivingLicence = {
            Token: sessionStorage.Token
        };

        console.log(`Going to delete Driving Licence...`);

        await deleteDrivingLicence(discardedDrivingLicence).then(response => {
            if (response.Message === "Driving Licence is deleted.") {
                this.props.OnDocumentsUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "DrivingLicence"
            };

            getData(request).then(response => {
                if (response.Message === "Driving licence found.") {
                    let drivingLicence = response.DrivingLicence;

                    this.setState({
                        DrivingLicenceID: drivingLicence.DrivingLicenceID,
                        LicenceNumber: drivingLicence.LicenceNumber,
                        Type: drivingLicence.Type,
                        ReleaseDate: drivingLicence.ReleaseDate,
                        ExpiryDate: drivingLicence.ExpiryDate,
                        PhotoURL: drivingLicence.PhotoURL
                    });
                }
                else {
                    this.setState({
                        DrivingLicenceID: "",
                        LicenceNumber: "",
                        Type: "",
                        ReleaseDate: "",
                        ExpiryDate: "",
                        PhotoURL: "./images/default_image.png"
                    });
                }
            });
        }
    }

    render() {
        return (
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div data-toggle="collapse" aria-expanded="false" data-target={`#driving-licence-${this.state.DrivingLicenceID}`}>
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
                                    <span style={{ fontWeight: "bold", color: "#008575" }}>{Dictionary.DrivingLicence}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="collapse" id={`driving-licence-${this.state.DrivingLicenceID}`}>
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
                                    <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{Dictionary.DrivingLicenceSubtitle}</div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-hashtag"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.LicenceNumber}</div>
                                                        <div className="content-text-secondary">{this.state.LicenceNumber}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-star-of-life"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.LicenceType}</div>
                                                        <div className="content-text-secondary">{this.state.Type}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="entity-list">
                                                <div className="entity-list-item">
                                                    <div className="item-icon">
                                                        <span className="fas fa-calendar"></span>
                                                    </div>
                                                    <div className="item-content-primary">
                                                        <div className="content-text-primary">{Dictionary.ReleaseDate}</div>
                                                        <div className="content-text-secondary">{this.state.ReleaseDate}</div>
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
                                                        <div className="content-text-secondary">{this.state.ExpiryDate}</div>
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
                            data-target="#edit-driving-licence-dialog"
                            onMouseDown={() => {
                                this.setState({
                                    EditDrivingLicenceDialog: <EditDriverLicenceDialog
                                        OnCancel={() => {
                                            this.setState({
                                                EditDrivingLicenceDialog: null
                                            });
                                        }}
                                        OnOK={cancelButton => {
                                            cancelButton.click();
                                            this.onComponentUpdated();
                                        }} />
                                });
                            }}>{Dictionary.Edit}</button>
                        <button type="button" className="btn btn-danger"
                            data-toggle="modal"
                            data-target={`#delete-driving-licence-dialog`}>{Dictionary.Delete}</button>
                    </div>
                </div> 

                <div className="modal modal-center-vertical" id={`delete-driving-licence-dialog`}
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

                {this.state.Preloader}
                {this.state.EditDrivingLicenceDialog}
            </li>        
        );
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        DrivingLicence: "رخصة قيادة",
        DrivingLicenceSubtitle: "رخصة قيادة",
        LicenceNumber: "رقم الرخصة",
        LicenceType: "نوع الترخيص",
        ReleaseDate: "يوم الاصدار",
        ExpiryDate: "تاريخ الانتهاء",
        Edit: "تعديل",
        Delete: "حذف",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف رخصة القيادة هذه؟",
    };
}
else {
    Dictionary = {
        DrivingLicence: "DRIVING LICENCE",
        DrivingLicenceSubtitle: "Driving Licence",
        LicenceNumber: "Licence Number",
        LicenceType: "Licence Type",
        ReleaseDate: "Release Date",
        ExpiryDate: "Expiry Date",
        Edit: "Edit",
        Delete: "Delete",
        DeleteMessage: "Are you sure you want to delete this driving licence?",
    };
}

export default DrivingLicenceListItem;