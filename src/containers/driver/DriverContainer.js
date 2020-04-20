import React, { Component } from "react";
import UUID from "uuid-v4";
import SearchingContainer from "../searching/SearchingContainer";
import DocumentsDialog from "./documents/DocumentsDialog";
import { getData } from "../../components/traders/TraderFunctions";

class DriverContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverProfile: null,
            Searching: false
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Token: localStorage.Token,
                Get: "DriverProfile",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Driver profile found.") {
                    this.setState({
                        DriverProfile: response.DriverProfile,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        DriverProfile: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching || !this.state.DriverProfile) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor="driver" />;
        }
        else {
            const driverProfile = this.state.DriverProfile;
            const driver = driverProfile.Driver;
            const onJob = driverProfile.OnJob;
            const profilePhoto = driverProfile.ProfilePhoto ?
                driverProfile.ProfilePhoto :
                "./images/defaultProfilePhoto.png";

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
                                    {`${driver.FirstName} ${driver.LastName} `}
                                    {onJob ? <span class="badge back-color-golden">ON JOB</span> : null}
                                </div>
                                <div className="type-sh3">
                                    <span className="fas fa-car" style={{ color: "#606060" }}></span>   Driver
                            </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-globe-asia"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Active</div>
                                                    <div className="content-text-secondary">{(driver.Active === 1) ?
                                                        <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                        <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                                </div>
                                            </div>
                                        </div>
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
                                </div>
                                <button type="button" className="btn btn-default"
                                    style={{ minWidth: "152px" }} data-toggle="modal"
                                    data-target={`#documents-dialog-${dialogID}`}>Documents</button>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentsDialog DialogID={dialogID}
                    DriverID={this.props.DriverID} />
            </section>;
        } 
    }
};

export default DriverContainer;