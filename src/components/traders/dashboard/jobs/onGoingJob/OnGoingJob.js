import React, { Component } from "react";
import { getData } from "../../../TraderFunctions";
import ProgressBar from "../../../../../controls/ProgressBar";
import Job from "./Job";
import DriverContainer from "../../../../../containers/driver/DriverContainer";
import TruckContainer from "../../../../../containers/truck/TruckContainer";
import MapTab from "./MapTab";
import Objections from "./objections/Objections";
import Alert from "../../../../../controls/Alert";
import OnGoingJobOptions from "./OnGoingJobOptions";

class OnGoingJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            OnGoingJob: null,
            HasObjections: false,
            Loading: false
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();

        this.interval = setInterval(async () => {
            if (localStorage.Token) {
                let request = {
                    Token: localStorage.Token,
                    Get: "OnGoingJob"
                };

                await getData(request).then(response => {
                    if (response.Message === "On-going job found.") {
                        console.log(response);
                        this.setState({
                            OnGoingJob: response.OnGoingJob,
                            HasObjections: response.HasObjection,
                            Loading: false,
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
        }, 15000);
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
                    clearInterval(this.interval);

                    this.setState({
                        OnGoingJob: null,
                        HasObjections: false,
                        Loading: false
                    });
                }
            });
        }
    };

    UNSAFE_componentWillMount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.state.Loading || !this.state.OnGoingJob) {
            return <div className="jumbotron theme-alt" style={{ backgroundColor: "#202020" }}>
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
                <ul className="nav nav-tabs tabs-light" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#job-tab" aria-controls="job-tab" role="tab" data-toggle="tab">Job</a>
                    </li>
                    <li role="presentation">
                        <a href="#driver-tab" aria-controls="driver-tab" role="tab" data-toggle="tab">Driver</a>
                    </li>
                    <li role="presentation">
                        <a href="#truck-tab" aria-controls="truck-tab" role="tab" data-toggle="tab">Truck</a>
                    </li>
                    <li role="presentation">
                        <a href="#map-tab" aria-controls="map-tab" role="tab" data-toggle="tab">Map</a>
                    </li>
                    {onGoingJob.CompletedByDriver ?
                        null :
                        <li role="presentation">
                            <a href="#objections-tab" aria-controls="objections-tab" role="tab" data-toggle="tab">Objections</a>
                        </li>}
                </ul>

                {hasObjections ?
                    <Alert Type="danger"
                        Message="This job has objections, and it cannot be completed now. For more information, please tap on Objections tab." /> :
                    null}
                <div className="tab-content">

                    <div role="tabpanel" className="tab-pane active" id="job-tab">
                        <Job OnGoingJob={onGoingJob} HasObjections={hasObjections} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="driver-tab">
                        <DriverContainer DriverID={onGoingJob.DriverID} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="truck-tab">
                        <TruckContainer DriverID={onGoingJob.DriverID} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="map-tab">
                        <MapTab />
                    </div>
                    {onGoingJob.CompletedByDriver ? 
                        null :
                        <div role="tabpanel" className="tab-pane" id="objections-tab">
                            <Objections OnGoingJobID={onGoingJob.OnGoingJobID} />
                        </div>}
                </div>
                <OnGoingJobOptions HasObjections={hasObjections}
                    CompletedByDriver={onGoingJob.CompletedByDriver}
                    CompletedByTrader={onGoingJob.CompletedByTrader}
                    OnJobApproved={this.onComponentUpdated} />
            </section>;
        }
    }
};

export default OnGoingJob;