import React, { Component } from "react";
import { getData } from "../../../TraderFunctions";
import ProgressBar from "../../../../../controls/ProgressBar";
import Job from "./Job";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import TruckContainer from "../../../../../containers/truck/TruckContainer";
import OnGoingJobMap from "./OnGoingJobMap";
import Objections from "./objections/Objections";
import OnGoingJobOptions from "./OnGoingJobOptions";

class OnGoingJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            OnGoingJob: null,
            HasObjections: false,
            Loading: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "OnGoingJob"
            };

            this.setState({
                Loading: true
            });

            await getData(request).then(response => {
                if (response.Message === "On-going job found.") {
                    this.setState({
                        OnGoingJob: response.OnGoingJob,
                        HasObjections: response.HasObjections,
                        Loading: false
                    });
                }
                else {
                    this.setState({
                        OnGoingJob: null,
                        HasObjections: false,
                        Loading: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "OnGoingJob"
            };

            await getData(request).then(response => {
                if (response.Message === "On-going job found.") {
                    console.log("ON-GOING JOB");
                    console.log(response.OnGoingJob);

                    this.setState({
                        OnGoingJob: response.OnGoingJob,
                        HasObjections: response.HasObjections
                    });
                }
                else {
                    this.setState({
                        OnGoingJob: null,
                        HasObjections: false
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Loading || !this.state.OnGoingJob) {
            return <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333", width: "100%", height: "100vh" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-push-12 text-center">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="on_going_jobs.png" src="./images/on_going_jobs.png" data-source-index="2" />
                        </div>
                        <div className="col-md-12 col-md-pull-12">
                            <div className="type-h3">On-Going Job</div>
                            {this.state.Loading ?
                                <div>
                                    <div class="type-sh3" style={{ color: "#008575" }}>Searhcing</div>
                                    <ProgressBar />
                                </div> :
                                <div className="type-sh3">Couldn't Find Your Job...</div>}
                        </div>
                    </div>
                </div>
            </div>;
        }
        else {
            const onGoingJob = this.state.OnGoingJob;
            const hasObjections = this.state.HasObjections;

            return <section>
                {hasObjections ?
                    <div class="alert alert-danger m-n">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-24">
                                    <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>This job has objections, and it cannot be finished now. Actions are pending by Naqel. For more information, please tap on <span className="color-default">Objections</span> tab.</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    null}
                <ul className="nav nav-tabs tabs-light" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#job-tab" aria-controls="job-tab" role="tab" data-toggle="tab"
                            onClick={this.refresh}>Job</a>
                    </li>
                    <li role="presentation">
                        <a href="#driver-tab" aria-controls="driver-tab" role="tab" data-toggle="tab"
                            onClick={async () => { await this.RefreshDriverContainer(); }}>Driver</a>
                    </li>
                    <li role="presentation">
                        <a href="#truck-tab" aria-controls="truck-tab" role="tab" data-toggle="tab"
                            onClick={async () => { await this.RefreshTruckContainer(); }}>Truck</a>
                    </li>
                    <li role="presentation">
                        <a href="#map-tab" aria-controls="map-tab" role="tab" data-toggle="tab">Map</a>
                    </li>
                    {onGoingJob.CompletedByDriver ?
                        null :
                        <li role="presentation">
                            <a href="#objections-tab" aria-controls="objections-tab" role="tab" data-toggle="tab"
                                onClick={async () => { await this.RefreshObjections(); }}>Objections</a>
                        </li>}
                </ul>

                <div className="tab-content">

                    <div role="tabpanel" className="tab-pane active" id="job-tab">
                        <Job OnGoingJob={onGoingJob} HasObjections={hasObjections} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="driver-tab">
                        <DriverContainer Refresh={refresh => { this.RefreshDriverContainer = refresh; }} DriverID={onGoingJob.DriverID} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="truck-tab">
                        <TruckContainer Refresh={refresh => { this.RefreshTruckContainer = refresh; }} DriverID={onGoingJob.DriverID} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="map-tab">
                        <OnGoingJobMap OnGoingJob={onGoingJob} />
                    </div>
                    {onGoingJob.CompletedByDriver ? 
                        null :
                        <div role="tabpanel" className="tab-pane" id="objections-tab">
                            <Objections Refresh={refresh => { this.RefreshObjections = refresh; }} OnGoingJobID={onGoingJob.OnGoingJobID} />
                        </div>}
                </div>

                <OnGoingJobOptions HasObjections={hasObjections}
                    CompletedByDriver={onGoingJob.CompletedByDriver}
                    CompletedByTrader={onGoingJob.CompletedByTrader}
                    OnGoingJobID={onGoingJob.OnGoingJobID}
                    DriverRated={onGoingJob.DriverRated}
                    OnJobRemoved={this.onComponentUpdated} />
            </section>;
        }
    }
};

export default OnGoingJob;