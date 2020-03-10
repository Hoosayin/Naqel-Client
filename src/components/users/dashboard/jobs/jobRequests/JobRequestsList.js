import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { deleteJobRequest } from "../../../DriverFunctions.js";
import EditJobRequestDialog from "./EditJobRequestDialog.js";
import Preloader from "../../../../../controls/Preloader.js";

class JobRequestsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobRequests: [],
            EditJobRequestDialogs: [],
            SearchString: "",
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getJobRequests = this.getJobRequests.bind(this);
    }

    onDelete = async index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobRequest = {
            Token: localStorage.getItem("userToken"),
            JobRequestID: this.state.JobRequests[index].JobRequestID 
        };

        console.log(`Going to delete JobRequests[${index}]`);

        await deleteJobRequest(discardedJobRequest)
            .then(response => {
                if (response.Message === "Job request is deleted.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnJobRequestsUpdated();
                }

                this.setState({
                    Preloader: null
                });
            });
    }

    componentDidMount() {
        this.getJobRequests();
    }

    getJobRequests = () => {
        if (localStorage.userToken) {
            const jobRequests = jwt_decode(localStorage.userToken).JobRequests;

            this.setState({
                JobRequests: jobRequests
            });
        }
        else {
            this.setState({
                PermitLicences: []
            });
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();
        this.getJobRequests();

        if (this.state.SearchString === "") {         
            return;
        }

        const filteredJobRequests = [];

        for (var i = 0; i < this.state.JobRequests.length; i++) {
            if (this.state.JobRequests[i].LoadingPlace.includes(this.state.SearchString) ||
                this.state.JobRequests[i].UnloadingPlace.includes(this.state.SearchString)) {
                filteredJobRequests[i] = this.state.JobRequests[i];
            }
        }

        this.setState({
            JobRequests: filteredJobRequests
        });
    }

    render() {
        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Your Job Requests</div>
                <nav class="navbar navbar-default">
                    <div class="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                            <form noValidate onSubmit={this.onSearch} class="navbar-form navbar-right" role="search">
                                <div class="putbox" style={{ margin: "0px" }}>
                                    <div class="form-group">
                                        <input type="search" name="SearchString" class="form-control" placeholder="Search by Places"
                                            style={{ maxWidth: "500px", width: "100%" }}
                                            value={this.state.SearchString} onChange={this.onChange} />
                                    </div>
                                    <button type="submit" class="btn btn-default form-control" style={{ width: "34px" }}></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
                <ol class="list-items" style={{ margin: "0px" }}>
                    {this.state.JobRequests.map((value, index) => {
                        return <li class="list-items-row">
                            <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.JobRequestID}`}>
                                <div class="row">
                                    <div class="col-md-2">
                                        <i class="glyph glyph-add"></i>
                                        <i class="glyph glyph-remove"></i>
                                        <strong>{index + 1}</strong>
                                    </div>
                                    <div class="col-md-2">
                                        <img src="./images/job_requests.png" alt="job_requests.png" height="50" />
                                    </div>
                                    <div class="col-md-6">
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Loading Place:</span> {value.LoadingPlace}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Unloading Place:</span> {value.UnloadingPlace}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Trip Type:</span> {value.TripType}
                                        </div>
                                        </div>
                                    <div class="col-md-6">
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Price:</span> {`$${value.Price}`}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Status:</span> {((Math.abs(new Date() - new Date(value.TimeCreated)) / 36e5) < value.WaitingTime) ?
                                                <span class="fa fa-check-circle" style={{ fontWeight: "bold", color: "#25AE88" }}></span> :
                                                <span class="fa fa-times-circle" style={{ fontWeight: "bold", color: "#D75A4A" }}></span>}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Created:</span> {`${(Math.floor((new Date().getTime() - new Date(value.TimeCreated)) / 36e5))} Hour(s) Ago`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="collapse" id={value.JobRequestID}>
                                <div class="row">
                                    <div class="col-md-18 col-md-offset-2">
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <button
                                            type="button"
                                            class="btn btn-primary"
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
                                                        this.props.OnJobRequestsUpdated();
                                                    }} />;

                                                this.setState({
                                                    EditJobRequestDialogs: editJobRequestDialogs,
                                                });
                                            }}>
                                            Edit
                                            </button>
                                        <button type="button" class="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            {this.state.EditJobRequestDialogs[index]}
                        </li>
                    })}
                </ol>
                {this.state.Preloader}
            </section>         
        );
    }
};

export default JobRequestsList;