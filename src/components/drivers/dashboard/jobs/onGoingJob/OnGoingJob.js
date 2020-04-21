import React, { Component } from "react";
import { getData } from "../../../DriverFunctions";
import ProgressBar from "../../../../../controls/ProgressBar";
import TraderContainer from "../../../../../containers/trader/TraderContainer";
import MapTab from "./MapTab";
import Objections from "./objectionsTab/Objections";
import JobContainer from "./../../../../../containers/onGoingJob/JobContainer";
import OnGoingJobOptions from "./OnGoingJobOptions";
import Alert from "../../../../../controls/Alert";

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
                    console.log(response);
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
                        <a href="#trader-tab" aria-controls="trader-tab" role="tab" data-toggle="tab">Trader</a>
                    </li>
                    <li role="presentation">
                        <a href="#map-tab" aria-controls="map-tab" role="tab" data-toggle="tab">Map</a>
                    </li>
                    <li role="presentation">
                        <a href="#objections-tab" aria-controls="objections-tab" role="tab" data-toggle="tab">Objections</a>
                    </li>
                </ul>

                {hasObjections ?
                    <Alert Type="danger"
                        Message="This job has objections, and it cannot be completed now. For more information, please tap on Objections tab." /> :
                    null}

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="job-tab">
                        <JobContainer OnGoingJob={onGoingJob} HasObjections={hasObjections} View="Driver" />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="trader-tab">
                        <TraderContainer TraderID={onGoingJob.TraderID} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="map-tab">
                        <MapTab />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="objections-tab">
                        <Objections OnGoingJobID={onGoingJob.OnGoingJobID} OnObjectionAdded={this.onComponentUpdated} />
                    </div>
                </div>
                <OnGoingJobOptions CompletedByDriver={onGoingJob.CompletedByDriver}
                    CompletedByTrader={onGoingJob.CompletedByTrader} />
            </section>;
        }
    }
};

export default OnGoingJob;