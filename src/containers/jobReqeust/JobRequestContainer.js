import React, { Component } from "react";

class JobRequestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const jobRequest = this.props.JobRequest;
        const createdHoursAgo = Math.abs(new Date() - new Date(jobRequest.TimeCreated)) / 36e5;

       return <section>
           <div className="jumbotron theme-default">
               <div className="container">
                   <div className="col-md-24">
                       <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{index ? `${index + 1}.` : "Job Request"}</div>
                       <div className="type-sh3">
                           <span className="fas fa-tag" style={{ color: "#606060" }}></span>   {`$${jobRequest.Price}`}
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-12">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Loading Place</div>
                                       <div class="content-text-secondary">{jobRequest.LoadingPlace}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Unloading Place</div>
                                       <div class="content-text-secondary">{jobRequest.UnloadingPlace}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-signs"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Trip Type</div>
                                       <div class="content-text-secondary">{jobRequest.TripType}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-12">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-plug"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Available</div>
                                       <div class="content-text-secondary">{(createdHoursAgo < jobRequest.WaitingTime) ? 
                                           <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                           <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-calendar"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Posted on</div>
                                       <div class="content-text-secondary">{new Date(jobRequest.TimeCreated).toDateString()}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-clock"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Posted at</div>
                                       <div class="content-text-secondary">{new Date(jobRequest.TimeCreated).toTimeString()}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>;
    }
};

export default JobRequestContainer;