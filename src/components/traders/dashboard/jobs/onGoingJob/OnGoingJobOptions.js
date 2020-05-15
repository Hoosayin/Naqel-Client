/// <reference path=".js" />
import React, { Component } from "react";
import ApproveJobDialog from "./ApproveJobDialog";
import ReviewDialog from "./ReviewDialog";
import Preloader from "../../../../../controls/Preloader";
import { deleteOnGoingJob } from "../../../TraderFunctions";

class OnGoingJobOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverRated: this.props.DriverRated,
            ShowPreloader: false
        };

        this.onDiscard = this.onDiscard.bind(this);
    }

    onDiscard = async () => {
        this.setState({
            ShowPreloader: true
        });

        const discardedOnGoingJob = {
            Token: localStorage.Token,
            OnGoingJobID: this.props.OnGoingJobID
        }

        console.log("Going to discard the job...");

        await deleteOnGoingJob(discardedOnGoingJob).then(async response => {
            if (response.Message === "On-going job deleted.") {
                this.setState({
                    ShowPreloader: false
                });

                await this.props.OnJobRemoved();
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    };

    render() {
        const hasObjections = this.props.HasObjections;
        const completedByDriver = this.props.CompletedByDriver;
        const completedByTrader = this.props.CompletedByTrader;
        const onGoingJobID = this.props.OnGoingJobID;
        const driverRated = this.state.DriverRated;
        const showPreloader = this.state.ShowPreloader;

        console.log(`DRIVER RATED: ${driverRated}`);

        return hasObjections ?
            <section>
                {showPreloader ? <Preloader /> : null}
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Discard the Job?
                                {driverRated ? <span class="badge back-color-danger m-l-xxs">DRIVER IS RATED</span> : null}</div>
                            <div className="type-sh4">{driverRated ?
                                "This cannot be undone! All job details will be removed. Are you sure you want to discard the job?" :
                                "This cannot be undone! All job details will be removed. If you have found the driver to be problematic, you can leave a review. Are you sure you want to discard the job?"}</div>
                        </div>
                        <div className="text-right">
                            {driverRated ? 
                                null :
                                <button className="btn btn-secondary"
                                    data-toggle="modal"
                                    data-target="#review-dialog-from-on-going-job">Rate Driver</button>}
                            <button className="btn btn-danger" onClick={this.onDiscard}>Discard</button>
                        </div>
                    </div>
                </div>
                {driverRated ?
                    null :
                    <ReviewDialog OnGoingJobID={onGoingJobID}
                        OnOK={() => {
                            this.setState({
                                DriverRated: true
                            });
                        }} />}
            </section> :
            <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333" }}>
                    <div className="container">
                        <div className="col-md-24">
                            <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Job Completion Status</div>
                            <div className="type-sh4">You'll be able to approve this job after your driver completes the job.</div>
                        </div>
                        <div className="row">
                            <div className="col-md-24">
                                <div className="entity-list theme-alt">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-certificate"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Completed By Driver?</div>
                                            <div className="content-text-secondary">{completedByDriver ?
                                                <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-certificate"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">Approved By You?</div>
                                            <div className="content-text-secondary">{completedByTrader ?
                                                <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                                                <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            {completedByDriver ? <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#approve-job-dialog">Approve</button> : null}
                        </div>
                    </div>
                </div>
                <ApproveJobDialog OnOK={this.props.OnJobRemoved} />
            </section>;
             
    }
};

export default OnGoingJobOptions;