import React, { Component } from "react";
import FirebaseApp from "../../../../../res/FirebaseApp";
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

        this.Database = null;

        this.state = {
            OnGoingJob: null,
            HasObjections: false,
            DriverLocation: null,
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
                    if (!this.Database) {
                        this.Database = FirebaseApp.database().ref().child(`${response.OnGoingJob.DriverID}`);
                    }

                    this.Database.on("value", snapshot => {
                        let driverLocation = null;
                        const value = snapshot.val();

                        if (value) {
                            const locationCoordinates = value["latlong"].split(",");

                            driverLocation = {
                                Lat: parseFloat(locationCoordinates[0]),
                                Lng: parseFloat(locationCoordinates[1])
                            };
                        }

                        this.setState({
                            DriverLocation: driverLocation,
                            OnGoingJob: response.OnGoingJob,
                            HasObjections: response.HasObjections,
                            Loading: false
                        });
                    });
                }
                else {
                    this.setState({
                        OnGoingJob: null,
                        DriverLocation: null,
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
                    if (!this.Database) {
                        this.Database = FirebaseApp.database().ref().child(`${response.OnGoingJob.DriverID}`);
                    }

                    this.Database.on("value", snapshot => {
                        let driverLocation = null;
                        const value = snapshot.val();

                        if (value) {
                            const locationCoordinates = value["latlong"].split(",");

                            driverLocation = {
                                Lat: parseFloat(locationCoordinates[0]),
                                Lng: parseFloat(locationCoordinates[1])
                            };
                        }

                        this.setState({
                            DriverLocation: driverLocation,
                            OnGoingJob: response.OnGoingJob,
                            HasObjections: response.HasObjections
                        });
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
            return <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333", width: "100%", height: "100vh" }} dir={GetDirection()}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-push-12 text-center">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="on_going_jobs.png" src="./images/on_going_jobs.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                        </div>
                        <div className="col-md-12 col-md-pull-12">
                            <div className="type-h3">{Dictionary.OnGoingJob}</div>
                            {this.state.Loading ?
                                <div>
                                    <div class="type-sh3" style={{ color: "#008575" }}>{Dictionary.Searching}</div>
                                    <ProgressBar />
                                </div> :
                                <div className="type-sh3">{Dictionary.JobNotFound}...</div>}
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
                    <div class="alert alert-danger m-n" dir={GetDirection()}>
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-24">
                                    <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>{Dictionary.ObjectionsMessage}.</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    null}
                <ul className="nav nav-tabs tabs-light" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#job-tab" aria-controls="job-tab" role="tab" data-toggle="tab"
                            onClick={this.refresh}>{Dictionary.Job}</a>
                    </li>
                    <li role="presentation">
                        <a href="#driver-tab" aria-controls="driver-tab" role="tab" data-toggle="tab"
                            onClick={async () => { await this.RefreshDriverContainer(); }}>{Dictionary.Driver}</a>
                    </li>
                    <li role="presentation">
                        <a href="#truck-tab" aria-controls="truck-tab" role="tab" data-toggle="tab"
                            onClick={async () => { await this.RefreshTruckContainer(); }}>{Dictionary.Truck}</a>
                    </li>
                    <li role="presentation">
                        <a href="#map-tab" aria-controls="map-tab" role="tab" data-toggle="tab">{Dictionary.Map}</a>
                    </li>
                    {onGoingJob.CompletedByDriver ?
                        null :
                        <li role="presentation">
                            <a href="#objections-tab" aria-controls="objections-tab" role="tab" data-toggle="tab"
                                onClick={async () => { await this.RefreshObjections(); }}>{Dictionary.Objections}</a>
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
                        <OnGoingJobMap OnGoingJob={onGoingJob}
                            DriverLocation={this.state.DriverLocation} />
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        OnGoingJob: "العمل المستمر",
        Searching: "يبحث",
        JobNotFound: "تعذر العثور على وظيفتك",
        ObjectionsMessage: "هذه الوظيفة لها اعتراضات ، ولا يمكن إنهاؤها الآن. الإجراءات معلقة عن طريق النقل. لمزيد من المعلومات ، يرجى النقر على علامة التبويب اعتراض",
        Job: "مهنة",
        Driver: "سائق",
        Truck: "شاحنة",
        Map: "خريطة",
        Objections: "اعتراضات",
    };
}
else {
    Dictionary = {
        OnGoingJob: "On-Going Job",
        Searching: "Searhcing",
        JobNotFound: "Couldn't Find Your Job",
        ObjectionsMessage: "This job has objections, and it cannot be finished now. Actions are pending by Naqel. For more information, please tap on Objectiona tab",
        Job: "Job",
        Driver: "Driver",
        Truck: "Truck",
        Map: "Map",
        Objections: "Objections",
    };
}

export default OnGoingJob;