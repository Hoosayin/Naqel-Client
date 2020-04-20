import React, { Component } from "react";
import { getData } from "../../../DriverFunctions";
import ProgressBar from "../../../../../controls/ProgressBar";
import TraderTab from "./TraderTab";
import MapTab from "./MapTab";
import ObjectionsTab from "./objectionsTab/ObjectionsTab";
import JobContainer from "./../../../../../containers/onGoingJob/JobContainer";

class OnGoingJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            OnGoingJobPackage: null,
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
                Get: "OnGoingJobPackage"
            };

            this.setState({
                Loading: true
            });

            await getData(request).then(response => {
                if (response.Message === "On-going job package found.") {
                    console.log(response);
                    this.setState({
                        OnGoingJobPackage: response.OnGoingJobPackage,
                        Loading: false
                    });
                }
                else {
                    this.setState({
                        OnGoingJobPackage: null,
                        Loading: false
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Loading || !this.state.OnGoingJobPackage) {
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
            const onGoingJobPackage = this.state.OnGoingJobPackage;
            const documents = {
                IdentityCard: onGoingJobPackage.IdentityCard,
                CommercialRegisterCertificate: onGoingJobPackage.CommercialRegisterCertificate
            };

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
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="job-tab">
                        <JobContainer OnGoingJob={onGoingJobPackage.OnGoingJob} View="Driver" />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="trader-tab">
                        <TraderTab Trader={onGoingJobPackage.Trader}
                            ProfilePhoto={onGoingJobPackage.ProfilePhoto}
                            Documents={documents} />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="map-tab">
                        <MapTab />
                    </div>
                    <div role="tabpanel" className="tab-pane" id="objections-tab">
                        <ObjectionsTab OnGoingJobID={onGoingJobPackage.OnGoingJob.OnGoingJobID} />
                    </div>
                </div>
            </section>;
        }
    }
};

export default OnGoingJob;