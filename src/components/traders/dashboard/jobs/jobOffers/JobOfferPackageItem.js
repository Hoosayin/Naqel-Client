import React, { Component } from "react";
import DriverRequestsCarousel from "./DriverRequestsCarousel";
import EditJobOfferDialog from "./EditJobOfferDialog";
import Preloader from "../../../../../controls/Preloader";
import { deleteJobOffer } from "../../../TraderFunctions";

class JobOfferPackageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async jobOfferID => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobOffer = {
            Token: localStorage.Token,
            JobOfferID: jobOfferID
        };

        console.log(`Going to delete Job offer...`);

        await deleteJobOffer(discardedJobOffer).then(response => {
            if (response.Message === "Job offer is deleted.") {
                this.props.OnJobOfferUpdated();
            }
        });
    }

    render() {
        const jobOffer = this.props.JobOfferPackage.JobOffer;
        const driverRequestPackages = this.props.JobOfferPackage.DriverRequestPackages;
        const index = this.props.Index;

        const createdHoursAgo = Math.abs(new Date() - new Date(jobOffer.TimeCreated)) / 36e5;

        return <section>
            <div className="jumbotron theme-default">
                <div className="container">
                    <div className="col-md-24">
                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`${index + 1}. ${jobOffer.JobOfferType} Job Offer`}</div>
                        <div className="type-sh3">
                            <span className="fas fa-tag" style={{ color: "#606060" }}></span>   {`$${jobOffer.Price}`}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Place</div>
                                        <div className="content-text-secondary">{jobOffer.LoadingPlace}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-marker-alt"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Unloading Place</div>
                                        <div className="content-text-secondary">{jobOffer.UnloadingPlace}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-map-signs"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Trip Type</div>
                                        <div className="content-text-secondary">{jobOffer.TripType}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Accpeted Delay</div>
                                        <div className="content-text-secondary">{`${jobOffer.AcceptedDelay} Hour(s)`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-box"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Cargo Type</div>
                                        <div className="content-text-secondary">{jobOffer.CargoType}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-weight"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Cargo Weight</div>
                                        <div className="content-text-secondary">{`${jobOffer.CargoWeight} lbs.`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Date</div>
                                        <div className="content-text-secondary">{new Date(jobOffer.LoadingDate).toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Loading Time</div>
                                        <div className="content-text-secondary">{jobOffer.LoadingTime}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-id-badge"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Entry/Exit</div>
                                        <div className="content-text-secondary">{(jobOffer.EntryExit === 1) ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-plug"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Availabe</div>
                                        <div className="content-text-secondary">{(createdHoursAgo < jobOffer.WaitingTime) ?
                                            <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-calendar"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Posted on</div>
                                        <div className="content-text-secondary">{new Date(jobOffer.TimeCreated).toDateString()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-clock"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Posted at</div>
                                        <div className="content-text-secondary">{new Date(jobOffer.TimeCreated).toTimeString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: "#E5E5E5", textAlign: "right", padding: "10px" }}>
                <button type="button" className="btn btn-default"
                    data-toggle="modal"
                    disabled={(driverRequestPackages.length !== 0)}
                    data-target={`#edit-job-offer-dialog-${index}`}>Edit</button>
                <button className="btn btn-danger" onClick={async () => { await this.onDelete(jobOffer.JobOfferID); }}>Delete</button>
            </div>

            <EditJobOfferDialog
                DialogID={index}
                JobOffer={jobOffer}
                CanEdit={() => { return (driverRequestPackages.length === 0) ? true : false }}
                OnOK={() => { this.props.OnJobOfferUpdated(); }} />

            <div data-toggle="collapse" aria-expanded="false" data-target={`#job-offer-package-${index}`} style={{ backgroundColor: "#DFDFDF" }}>
                <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>
                    <span style={{
                        backgroundColor: "#D75A4A",
                        color: "#FEFEFE",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "x-small",
                        padding: "5px",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "inline-block"
                    }}>{driverRequestPackages.length}</span> {(jobOffer.JobOfferType === "Fixed-Price") ? "Driver Requests" : "Driver Bids"} <i className="fas fa-ellipsis-v"></i></div>
            </div>

            <div className="collapse" id={`job-offer-package-${index}`}>
                {(driverRequestPackages.length === 0) ? <div className="jumbotron theme-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24 text-center">
                                <h3><span className="fas fa-exclamation-triangle" style={{ color: "#FFBF15" }}></span> {(jobOffer.JobOfferType === "Fixed-Price") ? "No requests found." : "No bids found."}</h3>
                            </div>
                        </div>
                    </div>
                </div> : <DriverRequestsCarousel DriverRequestPackages={driverRequestPackages} />}
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            </div>

            {this.state.Preloader}
       </section>;
    }
};

export default JobOfferPackageItem;