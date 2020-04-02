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
            Token: localStorage.Token
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
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
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
            <li className="list-items-row">
                <div data-toggle="collapse" aria-expanded="false" data-target={`#driving-licence-${this.state.DrivingLicenceID}`}>
                    <div className="row">
                        <div className="col-md-2">
                            <i className="glyph glyph-add"></i>
                            <i className="glyph glyph-remove"></i>
                            <strong>{this.props.Index}</strong>
                        </div>
                        <div className="col-md-4">
                            <img className="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={this.state.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div className="col-md-6">
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span style={{ fontWeight: "bold", color: "#008575" }}>DRIVING LICENCE</span>
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-hashtag" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Licence Number:</span> {this.state.LicenceNumber}
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-star-of-life" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Licence Type:</span> {this.state.Type}
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-calendar" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Release Date:</span> {this.state.ReleaseDate}
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-calendar" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Expiry Date:</span> {this.state.ExpiryDate}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="collapse" id={`driving-licence-${this.state.DrivingLicenceID}`}>
                    <div className="row">
                        <div className="col-md-18 col-md-offset-2">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                src={this.state.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div className="col-md-4 text-right">
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
                                }}>
                                Edit
                                </button>
                            <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(); }}>Delete</button>
                        </div>
                    </div>
                </div>               
                {this.state.Preloader}
                {this.state.EditDrivingLicenceDialog}
            </li>        
        );
    }
};

export default DrivingLicenceListItem;