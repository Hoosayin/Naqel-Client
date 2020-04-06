import React, { Component } from "react";

class JobRequestTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const jobOffer = this.props.JobOffer;
        const createdHoursAgo = Math.abs(new Date() - new Date(jobOffer.TimeCreated)) / 36e5;

       return <section>
           <div className="jumbotron theme-default">
               <div className="container">
                   <div className="col-md-24">
                       <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`${jobOffer.JobOfferType} Job Offer`}</div>
                       <div className="type-sh3">
                           <span className="fas fa-tag" style={{ color: "#606060" }}></span>   {`$${jobOffer.Price}`}
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-8">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-map-marker-alt"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Loading Place</div>
                                       <div class="content-text-secondary">{jobOffer.LoadingPlace}</div>
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
                                       <div class="content-text-secondary">{jobOffer.UnloadingPlace}</div>
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
                                       <div class="content-text-secondary">{jobOffer.TripType}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-clock"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Accpeted Delay</div>
                                       <div class="content-text-secondary">{`${jobOffer.AcceptedDelay} Hour(s)`}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-8">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-box"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Cargo Type</div>
                                       <div class="content-text-secondary">{jobOffer.CargoType}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-weight"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Cargo Weight</div>
                                       <div class="content-text-secondary">{`${jobOffer.CargoWeight} lbs.`}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-calendar"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Loading Date</div>
                                       <div class="content-text-secondary">{new Date(jobOffer.LoadingDate).toDateString()}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-clock"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Loading Time</div>
                                       <div class="content-text-secondary">{jobOffer.LoadingTime}</div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-8">
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-id-badge"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Entry/Exit</div>
                                       <div class="content-text-secondary">{(jobOffer.EntryExit === 1) ?
                                           <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                           <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                   </div>
                               </div>
                           </div>
                           <div class="entity-list">
                               <div class="entity-list-item">
                                   <div class="item-icon">
                                       <span class="fas fa-plug"></span>
                                   </div>
                                   <div class="item-content-primary">
                                       <div class="content-text-primary">Availabe</div>
                                       <div class="content-text-secondary">{(createdHoursAgo < jobOffer.WaitingTime) ? 
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
                                       <div class="content-text-secondary">{new Date(jobOffer.TimeCreated).toDateString()}</div>
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
                                       <div class="content-text-secondary">{new Date(jobOffer.TimeCreated).toTimeString()}</div>
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

export default JobRequestTab;