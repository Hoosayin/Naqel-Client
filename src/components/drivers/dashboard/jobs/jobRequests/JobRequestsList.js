import React, { Component } from "react";
import { getData, deleteJobRequest } from "../../../DriverFunctions.js";
import EditJobRequestDialog from "./EditJobRequestDialog.js";
import Preloader from "../../../../../controls/Preloader.js";

class JobRequestsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllJobRequests: [],
            JobRequests: [],
            EditJobRequestDialogs: [],
            SearchString: "",
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    onDelete = async index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobRequest = {
            Token: localStorage.Token,
            JobRequestID: this.state.JobRequests[index].JobRequestID 
        };

        console.log(`Going to delete JobRequests[${index}]`);

        await deleteJobRequest(discardedJobRequest).then(response => {
            if (response.Message === "Job request is deleted.") {
                this.onComponentUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobRequests"
            };

            getData(request).then(response => {
                if (response.Message === "Job requests found.") {
                    this.setState({
                        AllJobRequests: response.JobRequests,
                        JobRequests: response.JobRequests
                    });
                }
                else {
                    this.setState({
                        AllJobRequests: [],
                        JobRequests: []
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        if (this.state.SearchString === "") {
            this.setState({
                JobRequests: this.state.AllJobRequests
            });
        }

        const allJobRequests = this.state.AllJobRequests;
        let filteredJobRequests = [];

        for (var i = 0; i < allJobRequests.length; i++) {
            if (allJobRequests[i].LoadingPlace.includes(this.state.SearchString) ||
                allJobRequests[i].UnloadingPlace.includes(this.state.SearchString)) {
                filteredJobRequests[i] = allJobRequests[i];
            }
        }

        this.setState({
            JobRequests: filteredJobRequests
        });
    }

    render() {
        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Your Job Requests</div>
            <nav className="navbar navbar-default">
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder="Search by Places"
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={this.state.SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            <ol className="list-items" style={{ margin: "0px" }}>
                {this.state.JobRequests.map((value, index) => {
                    return <li key={index} className="list-items-row">
                        <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.JobRequestID}`}>
                            <div className="row">
                                <div className="col-md-2">
                                    <i className="glyph glyph-add"></i>
                                    <i className="glyph glyph-remove"></i>
                                    <strong>{index + 1}</strong>
                                </div>
                                <div className="col-md-2">
                                    <img src="./images/job_requests.png" alt="job_requests.png" height="50" />
                                </div>
                                <div className="col-md-6">
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-map-marker-alt" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Loading Place:</span> {value.LoadingPlace}
                                    </div>
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-map-marker-alt" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Unloading Place:</span> {value.UnloadingPlace}
                                    </div>
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-map-signs" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Trip Type:</span> {value.TripType}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-tag" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Price:</span> {`$${value.Price}`}
                                    </div>
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-plug" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Available:</span> {((Math.abs(new Date() - new Date(value.TimeCreated)) / 36e5) < value.WaitingTime) ?
                                            <span className="fa fa-check-circle" style={{ fontWeight: "bold", color: "#25AE88" }}></span> :
                                            <span className="fa fa-times-circle" style={{ fontWeight: "bold", color: "#D75A4A" }}></span>}
                                    </div>
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-clock" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Created:</span> {`${(Math.floor((new Date().getTime() - new Date(value.TimeCreated)) / 36e5))} Hour(s) Ago`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="collapse" id={value.JobRequestID}>
                            <div className="row">
                                <div className="col-md-18 col-md-offset-2">
                                </div>
                                <div className="col-md-4 text-right">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target={`#edit-job-request-dialog-${index}`}
                                        onMouseDown={() => {
                                            let editJobRequestDialogs = this.state.EditJobRequestDialogs;

                                            editJobRequestDialogs[index] = <EditJobRequestDialog
                                                DialogID={index}
                                                JobRequest={value}
                                                OnCancel={() => {
                                                    let editJobRequestDialogs = this.state.EditJobRequestDialogs;
                                                    editJobRequestDialogs[index] = null;

                                                    this.setState({
                                                        EditJobRequestDialogs: editJobRequestDialogs,
                                                    });

                                                }}
                                                OnOK={cancelButton => {
                                                    cancelButton.click();
                                                    this.onComponentUpdated();
                                                }} />;

                                            this.setState({
                                                EditJobRequestDialogs: editJobRequestDialogs,
                                            });
                                        }}>
                                        Edit
                                            </button>
                                    <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
                                </div>
                            </div>
                        </div>
                        {this.state.EditJobRequestDialogs[index]}
                    </li>
                })}
            </ol>
            {this.state.Preloader}
        </section>;
    }
};

export default JobRequestsList;