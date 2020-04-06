import React, { Component } from "react";
import UUID from "uuid-v4";
import TrailersDialog from "./TrailersDialog";

class TruckTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const truck = this.props.Truck;
        const dialogID = UUID().substring(0, 7).toUpperCase();

       return <section>
           <div className="jumbotron theme-default">
               <div className="container">
                   <div className="row">
                       <div className="col-md-6">
                           <div className="form-group" style={{ marginBottom: "5px", }}>
                               <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                   src={truck.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                       overflow: "hidden",
                                       border: "5px solid #3A3A3C",
                                       margin: "5px"
                                   }} />
                           </div>
                       </div>
                       <div className="col-md-18">
                           <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>
                               {truck.Brand + " " + truck.Model}
                           </div>
                           <div className="type-sh3">
                               <span className="fas fa-truck" style={{ color: "#606060" }}></span>   {truck.Type}
                           </div>
                           <div className="row">
                               <div className="col-md-12">
                                   <div class="entity-list">
                                       <div class="entity-list-item">
                                           <div class="item-icon">
                                               <span class="fas fa-list-ol"></span>
                                           </div>
                                           <div class="item-content-primary">
                                               <div class="content-text-primary">Plate Number</div>
                                               <div class="content-text-secondary">{truck.PlateNumber}</div>
                                           </div>
                                       </div>
                                   </div>
                                   <div class="entity-list">
                                       <div class="entity-list-item">
                                           <div class="item-icon">
                                               <span class="fas fa-user"></span>
                                           </div>
                                           <div class="item-content-primary">
                                               <div class="content-text-primary">Owner</div>
                                               <div class="content-text-secondary">{truck.Owner}</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-md-12">
                                   <div class="entity-list">
                                       <div class="entity-list-item">
                                           <div class="item-icon">
                                               <span class="fas fa-calendar-day"></span>
                                           </div>
                                           <div class="item-content-primary">
                                               <div class="content-text-primary">Production Year</div>
                                               <div class="content-text-secondary">{truck.ProductionYear}</div>
                                           </div>
                                       </div>
                                   </div>
                                   <div class="entity-list">
                                       <div class="entity-list-item">
                                           <div class="item-icon">
                                               <span class="fas fa-weight"></span>
                                           </div>
                                           <div class="item-content-primary">
                                               <div class="content-text-primary">Maximum Weight</div>
                                               <div class="content-text-secondary">{`${truck.MaximumWeight} GVW`}</div>
                                           </div>
                                       </div>
                                   </div>
                                   <div class="entity-list">
                                       <div class="entity-list-item">
                                           <button type="button" className="btn btn-default"
                                               style={{ minWidth: "152px" }} data-toggle="modal"
                                               disabled={!this.props.Trailers}
                                               data-target={`#trailers-dialog-${dialogID}`}>Trailers</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <TrailersDialog Trailers={this.props.Trailers} DialogID={dialogID} />
       </section>;
    }
};

export default TruckTab;