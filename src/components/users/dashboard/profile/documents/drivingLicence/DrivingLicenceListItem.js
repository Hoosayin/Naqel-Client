import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import EditDriverLicenceDialog from "./EditDrivingLicenceDialog.js";
import { deleteDrivingLicence } from "../../../../DriverFunctions.js";
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
    }

    onDelete = async () => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedDrivingLicence = {
            Token: localStorage.getItem("userToken")
        };

        console.log(`Going to delete Driving Licence.`);

        await deleteDrivingLicence(discardedDrivingLicence)
            .then(response => {
                if (response.Message === "Driving Licence is deleted.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnDocumentsUpdated();
                }

                this.setState({
                    Preloader: null
                });
            });
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const drivingLicence = jwt_decode(localStorage.userToken).DrivingLicence;

            if (drivingLicence) {
                this.setState({
                    DrivingLicenceID: drivingLicence.DrivingLicenceID,
                    LicenceNumber: drivingLicence.LicenceNumber,
                    Type: drivingLicence.Type,
                    ReleaseDate: drivingLicence.ReleaseDate,
                    ExpiryDate: drivingLicence.ExpiryDate,
                    PhotoURL: drivingLicence.PhotoURL,
                });

                console.log(this.state.ExpiryDate);

                return;
            }
        }

        this.setState({
            DrivingLicenceID: "",
            LicenceNumber: "",
            Type: "",
            ReleaseDate: "",
            ExpiryDate: "",
            PhotoURL: "./images/default_image.png",
        });
    }

    render() {
        return (
            <li class="list-items-row">
                <div data-toggle="collapse" aria-expanded="false" data-target={`#driving-licence-${this.state.DrivingLicenceID}`}>
                    <div class="row">
                        <div class="col-md-2">
                            <i class="glyph glyph-add"></i>
                            <i class="glyph glyph-remove"></i>
                            <strong>{this.props.Index}</strong>
                        </div>
                        <div class="col-md-4">
                            <img class="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={this.state.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div class="col-md-6">
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>DRIVING LICENCE</span>
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Licence Number:</span> {this.state.LicenceNumber}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Licence Type:</span> {this.state.Type}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Release Date:</span> {this.state.ReleaseDate}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Expiry Date:</span> {this.state.ExpiryDate}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="collapse" id={`driving-licence-${this.state.DrivingLicenceID}`}>
                    <div class="row">
                        <div class="col-md-18 col-md-offset-2">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                src={this.state.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div class="col-md-4 text-right">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#edit-driving-licence-dialog"
                                onMouseDown={() => {
                                    this.setState({
                                        EditDrivingLicenceDialog: (<EditDriverLicenceDialog
                                            OnDismissDialog={() => {
                                                this.setState({
                                                    EditDrivingLicenceDialog: null
                                                });
                                            }}
                                            OnDrivingLicenceUpdated={cancelButton => {
                                                cancelButton.click();
                                                this.props.OnDocumentsUpdated();
                                            }} />)
                                    });
                                }}>
                                Edit
                                </button>
                            <button type="button" class="btn btn-danger" onClick={event => { this.onDelete(); }}>Delete</button>
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