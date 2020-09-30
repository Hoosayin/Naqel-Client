import React, { Component } from "react";
import AddObjectionDialog from "./AddObjectionDialog";
import { getData } from "../../../../DriverFunctions";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import JobObjectionContainer from "../../../../../../containers/onGoingJob/JobObjectionContainer";

class Objections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobObjections: [],
            Searching: false,
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
                Get: "JobObjections",
                Params: {
                    OnGoingJobID: this.props.OnGoingJobID
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job objections found.") {
                    this.setState({
                        JobObjections: response.JobObjections,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobObjections: [],
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobObjections",
                Params: {
                    OnGoingJobID: this.props.OnGoingJobID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Job objections found.") {
                    this.setState({
                        JobObjections: response.JobObjections
                    });
                }
                else {
                    this.setState({
                        JobObjections: []
                    });
                }
            });
        }
    };

    render() {
        const jobObjections = this.state.JobObjections;

        return <section>
            <div class="page-header back-color-gradient" dir={GetDirection()}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-thumbs-down m-r-xxs m-l-xxs"></span>{Dictionary.JobObjections}</div>
                            <p className="color-light">{Dictionary.JobObjectionsSubtitle}</p>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#add-objection-dialog">{Dictionary.AddObjection}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddObjectionDialog OnGoingJobID={this.props.OnGoingJobID}
                OnOK={this.onComponentUpdated} />
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.JobObjections}</div>
            {(jobObjections.length === 0) ?
                <SearchingContainer Searching={this.state.Searching}
                    SearchingFor={Dictionary.JobObjections}/> : <ol className="list-items" style={{ margin: "0px" }}>
                    {jobObjections.map((jobObjection, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <JobObjectionContainer Index={index}
                                JobObjection={jobObjection} />
                        </li>;
                    })}
                </ol>}
       </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobObjections: "اعتراضات على أوامر العمل",
        JobObjectionsSubtitle: ".الاعتراضات على هذه الوظيفة ، سواء من جانبك أو من قبل عميلك ، ستنهي الوظيفة",
        AddObjection: "إضافة اعتراض",
        JobObjections: "اعتراضات على اوامر العمل",
    };
}
else {
    Dictionary = {
        JobObjections: "Job Objections",
        JobObjectionsSubtitle: "Objections on this job, either by you or your customer, will terminate the job.",
        AddObjection: "Add Objection",
        JobObjections: "Job Objections",
    };
}

export default Objections;