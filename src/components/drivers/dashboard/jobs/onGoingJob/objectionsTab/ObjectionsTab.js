import React, { Component } from "react";
import AddObjectionDialog from "./AddObjectionDialog";
import { getData } from "../../../../DriverFunctions";
import ProgressBar from "../../../../../../controls/ProgressBar";
import JobObjectionPackageItem from "./JobObjectionPackageItem";

class ObjectionsTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobObjectionPackages: [],
            Searching: false,
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
                Get: "JobObjectionPackages",
                Params: {
                    OnGoingJobID: this.props.OnGoingJobID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Job objection packages found.") {
                    this.setState({
                        JobObjectionPackages: response.JobObjectionPackages,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobObjectionPackages: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const jobObjectionPackages = this.state.JobObjectionPackages;

        return <section>
            <div class="page-header back-color-gradient">
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-thumbs-down"></span>   Job Objections</div>
                            <p className="color-light">Objections on this job, either by you or your customer, will terminate the job.</p>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#add-objection-dialog">Add Objection</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddObjectionDialog OnGoingJobID={this.props.OnGoingJobID}
                OnOK={async () => { await this.onComponentUpdated() }} />
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Job Objections</div>
            {(jobObjectionPackages.length === 0) ?
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            {this.state.Searching ? <div className="col-md-24 text-center">
                                <div>
                                    <div className="type-h3" style={{ color: "#008575" }}>Searching</div>
                                    <ProgressBar />
                                </div>
                            </div> : <div className="col-md-24 text-center">
                                    <h3><span className="fas fa-exclamation-triangle" style={{ color: "#FFBF15" }}></span> No job objections found.</h3>
                                </div>}
                        </div>
                    </div>
                </div> : <ol className="list-items" style={{ margin: "0px" }}>
                    {jobObjectionPackages.map((jobObjectionPackage, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <JobObjectionPackageItem Index={index}
                                JobObjectionPackage={jobObjectionPackage} />
                        </li>;
                    })}
                </ol>}
       </section>;
    }
};

export default ObjectionsTab;