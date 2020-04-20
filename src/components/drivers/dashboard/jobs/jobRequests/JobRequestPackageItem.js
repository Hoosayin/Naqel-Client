import React, { Component } from "react";
import TraderRequestsCarousel from "./TraderRequestsCarousel";
import EditJobRequestDialog from "./EditJobRequestDialog";
import Preloader from "../../../../../controls/Preloader";
import { deleteJobRequest } from "../../../DriverFunctions";

class JobRequestPackageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async jobRequestID => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobRequest = {
            Token: localStorage.Token,
            JobRequestID: jobRequestID
        };

        console.log(`Going to delete Job request...`);

        await deleteJobRequest(discardedJobRequest).then(response => {
            if (response.Message === "Job request is deleted.") {
                this.props.OnJobRequestUpdated();
            }
        });
    }

    render() {
        const jobRequest = this.props.JobRequestPackage.JobRequest;
        const driverOnJob = this.props.JobRequestPackage.DriverOnJob;
        const traderRequestPackages = this.props.JobRequestPackage.TraderRequestPackages;
        const index = this.props.Index;

        const createdHoursAgo = Math.abs(new Date() - new Date(jobRequest.TimeCreated)) / 36e5;

        return <section>
           <div className="jumbotron theme-default">
               <div className="container">
                   <div className="col-md-24">
                       <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`${index + 1}.`}</div>
                       <div className="type-sh3">
                           <span className="fas fa-tag" style={{ color: "#606060" }}></span>   {`$${jobRequest.Price}`}
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-12">
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">Loading Place</div>
                                       <div className="content-text-secondary">{jobRequest.LoadingPlace}</div>
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
                                       <div className="content-text-secondary">{jobRequest.UnloadingPlace}</div>
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
                                       <div className="content-text-secondary">{jobRequest.TripType}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-12">
                           <div className="entity-list">
                               <div className="entity-list-item">
                                   <div className="item-icon">
                                       <span className="fas fa-plug"></span>
                                   </div>
                                   <div className="item-content-primary">
                                       <div className="content-text-primary">Available</div>
                                       <div className="content-text-secondary">{(createdHoursAgo < jobRequest.WaitingTime) ? 
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
                                       <div className="content-text-secondary">{new Date(jobRequest.TimeCreated).toDateString()}</div>
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
                                       <div className="content-text-secondary">{new Date(jobRequest.TimeCreated).toTimeString()}</div>
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
                    disabled={(traderRequestPackages.length !== 0)}
                    data-target={`#edit-job-request-dialog-${index}`}>Edit</button>
                <button className="btn btn-danger" onClick={async () => { await this.onDelete(jobRequest.JobRequestID); }}>Delete</button>
            </div>

            <EditJobRequestDialog
                DialogID={index}
                JobRequest={jobRequest}
                CanEdit={() => { return (traderRequestPackages.length === 0) ? true : false }}
                OnOK={() => { this.props.OnJobRequestUpdated(); }} />

            <div data-toggle="collapse" aria-expanded="false" data-target={`#job-request-package-${index}`}>
                <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>
                    <span class="badge badge-danger" style={{ backgroundColor: "#D75A4A" }}>{traderRequestPackages.length}</span>
                    {"   Trader Requests"} <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`job-request-package-${index}`}>
                {(traderRequestPackages.length === 0) ? <div className="jumbotron theme-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24 text-center">
                                <h3><span className="fas fa-exclamation-triangle" style={{ color: "#FFBF15" }}></span> No requests found.</h3>
                            </div>
                        </div>
                    </div>
                </div> : <TraderRequestsCarousel DriverOnJob={driverOnJob} TraderRequestPackages={traderRequestPackages}
                    OnJobRequestUpdated={() => { this.props.OnJobRequestUpdated(); }} />}
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            </div>

            {this.state.Preloader}
       </section>;
    }
};

export default JobRequestPackageItem;