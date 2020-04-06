import React, { Component } from "react";
import Preloader from "../../../../../controls/Preloader";
import { getData } from "../../../TraderFunctions";
import DriverTab from "./DriverTab";
import TruckTab from "./TruckTab";
import JobRequestTab from "./JobRequestTab";

class JobRequestsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobRequestPosts: [],
            Preloader: null
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobRequestPosts"
            };

            this.setState({
                Preloader: <Preloader />
            });

            getData(request).then(response => {
                if (response.Message === "Job request posts found.") {
                    this.setState({
                        JobRequestPosts: response.JobRequestPosts,
                        Preloader: null
                    });
                }
                else {
                    this.setState({
                        JobRequestPosts: [],
                        Preloader: null
                    });
                }
            });
        }
    };

    render() {
        if (this.state.JobRequestPosts.length === 0) {
            return <section>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.png" data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Job Requests</div>
                                <div class="type-sh3">No Job Requests Found...</div>
                                <p>Job requests from Drivers are dispalyed here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else {
            return <section>
           <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
           <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Job Requests</div>
           <ol className="list-items">
               {this.state.JobRequestPosts.map((jobRequestPost, index) => {
                   const jobRequest = jobRequestPost.JobRequest;
                   const driver = jobRequestPost.Driver;
                   const driverProfilePhoto = jobRequestPost.DriverProfilePhoto;
                   const truck = jobRequestPost.Truck;
                   const trailers = jobRequestPost.Trailers;
                   const documents = {
                       IdentityCard: jobRequestPost.IdentityCard,
                       DrivingLicence: jobRequestPost.DrivingLicence,
                       EntryExitCard: jobRequestPost.EntryExitCard
                   };

                   return <li key={index} class="list-items-row" style={{ borderTop: "2px solid #EAEAEA" }}>
                       <div data-toggle="collapse" aria-expanded="false" data-target={`#list-item-line-${index}`}>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <img src={driverProfilePhoto ? driverProfilePhoto : "./images/defaultProfilePhoto.png"} alt="defaultProfilePhoto.png" />
                                   </div>
                                   <div class="item-content-secondary">
                                       <div class="content-text-primary">{jobRequest.LoadingPlace}
                                       </div>
                                       <div class="content-text-secondary">{jobRequest.UnloadingPlace}
                                       </div>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">{driver.FirstName} {driver.LastName}</div>
                                       <div class="content-text-secondary">
                                           <span className="fas fa-calendar" style={{ color: "#707070" }}></span>
                                           {new Date(jobRequest.TimeCreated).toDateString()}
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="collapse" id={`list-item-line-${index}`}>
                           <ul className="nav nav-tabs" role="tablist"
                               style={{
                                   padding: "10px",
                                   backgroundColor: "#EFEFEF",
                                   width: "100%",
                                   margin: "0px"
                               }}>
                               <li role="presentation" className="active"><a href={`#job-request-${index}`} aria-controls={`job-request-${index}`} role="tab" data-toggle="tab">Job Request</a></li>
                               <li role="presentation"><a href={`#driver-${index}`} aria-controls={`driver-${index}`} role="tab" data-toggle="tab">Driver</a></li>
                               <li role="presentation"><a href={`#truck-${index}`} aria-controls={`truck-${index}`} role="tab" data-toggle="tab">Truck</a></li>
                           </ul>
                           <div className="tab-content">
                               <div role="tabpanel" className="tab-pane active" id={`job-request-${index}`}>
                                   <JobRequestTab JobRequest={jobRequest} />
                               </div>
                               <div role="tabpanel" className="tab-pane" id={`driver-${index}`}>
                                   <DriverTab Driver={driver} DriverProfilePhoto={driverProfilePhoto} Documents={documents} /> 
                               </div>
                               <div role="tabpanel" className="tab-pane" id={`truck-${index}`}>
                                   <TruckTab Truck={truck} Trailers={trailers} />
                               </div>
                           </div>
                           <div class="row" style={{ backgroundColor: "#EFEFEF" }}>
                               <div class="col-md-18 col-md-offset-2"></div>
                               <div class="col-md-4 text-right">
                                   <button class="btn btn-primary">Accept</button>
                               </div>
                           </div>
                       </div>
                   </li>;
               })}               
           </ol>
           {this.state.Preloader}
       </section>;
        }
       
    }
};

export default JobRequestsList;