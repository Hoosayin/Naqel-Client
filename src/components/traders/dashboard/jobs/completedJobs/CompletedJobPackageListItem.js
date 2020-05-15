import React, { Component } from "react";
import CompletedJobContainer from "../../../../../containers/completedJob/CompletedJobContainer";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import ReviewDialog from "./ReviewDialog";
import Rating from "../../../../../controls/Rating";

class CompletedJobPackageListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const completedJob = this.props.CompletedJobPackage.CompletedJob;
        const billPaid = this.props.CompletedJobPackage.BillPaid;
        const driverReview = this.props.CompletedJobPackage.DriverReview;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            {!billPaid ?
                <div class="alert alert-danger m-n p-n">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>Please pay the bill for this job from <span className="color-default">Payments</span> section.</p>
                            </div>
                        </div>
                    </div>
                </div> :
                null}

            <CompletedJobContainer Index={index} CompletedJob={completedJob} />

            {driverReview ?
                <div class="alert alert-info m-n p-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                    <div class="row">
                        <div class="col-md-24">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-star"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Rating</div>
                                        <div className="content-text-secondary"><Rating Rating={driverReview.Rating} Color="" Size="rating-small" /></div>
                                        <div className="content-text-primary">Review</div>
                                        <div className="content-text-secondary">{driverReview.Review}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div class="alert alert-info m-n p-n" style={{ backgroundColor: "#E5E5E5", borderTop: "2px solid #CCCCCC" }}>
                    <div class="row">
                        <div class="col-md-20">
                            <div className="entity-list">
                                <div className="entity-list-item">
                                    <div className="item-icon">
                                        <span className="fas fa-star"></span>
                                    </div>
                                    <div className="item-content-primary">
                                        <div className="content-text-primary">Rate and Review the Driver</div>
                                        <div className="content-text-secondary">Your reviews means a lot to us and the driver too.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-right">
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#review-dialog-${index}`}>Write a Review</button>
                        </div>
                    </div>
                </div>}

            <ReviewDialog DialogID={index}
                CompletedJobID={completedJob.CompletedJobID}
                OnOK={this.props.OnReviewAdded}/>

            <div data-toggle="collapse" aria-expanded="false" data-target={`#completed-job-${index}`}
                onClick={async () => { await this.RefreshDriverContainer(); }}>
                <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>Driver Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`completed-job-${index}`}>
                <DriverContainer Refresh={refresh => { this.RefreshDriverContainer = refresh; }} DriverID={completedJob.DriverID} />
            </div>
        </li>;
    }
};

export default CompletedJobPackageListItem;