import React, { Component } from "react";
import TraderRequestsTable from "./TraderRequestsTable.js";
import EditJobRequestDialog from "./EditJobRequestDialog";
import Preloader from "../../../../../controls/Preloader";
import { deleteJobRequest } from "../../../DriverFunctions";
import JobRequestContainer from "../../../../../containers/jobReqeust/JobRequestContainer";

class JobRequestPackageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NumberOfRequests: 0,
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async jobRequestID => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobRequest = {
            Token: localStorage.Token,
            JobRequestID: jobRequestID
        };

        console.log(`Going to delete Job request...`);

        await deleteJobRequest(discardedJobRequest).then(response => {
            if (response.Message === "Job request is deleted.") {
                this.props.OnJobRequestUpdated();
            }
        });
    }

    render() {
        const jobRequest = this.props.JobRequestPackage;
        const index = this.props.Index;

        return <section>
            <JobRequestContainer Index={index} JobRequest={jobRequest} />

            <div style={{ backgroundColor: "#E5E5E5", textAlign: "right", padding: "10px" }}>
                <button type="button" className="btn btn-default"
                    data-toggle="modal"
                    disabled={(this.state.NumberOfRequests !== 0)}
                    data-target={`#edit-job-request-dialog-${index}`}>Edit</button>
                <button className="btn btn-danger" onClick={async () => { await this.onDelete(jobRequest.JobRequestID); }}>Delete</button>
            </div>

            <EditJobRequestDialog
                DialogID={index}
                JobRequest={jobRequest}
                CanEdit={() => { return this.state.NumberOfRequests === 0 ? true : false }}
                OnOK={() => { this.props.OnJobRequestUpdated(); }} />

            <div data-toggle="collapse" aria-expanded="false" data-target={`#job-request-package-${index}`}
                onMouseDown={async () => { await this.RefreshTraderRequestsTable(); }}>
                <div className="type-h4 text-right color-default p-xxxs">
                    <span class="badge back-color-danger m-r-xxs">{this.state.NumberOfRequests}</span>Trader Requests
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`job-request-package-${index}`}>

                <TraderRequestsTable
                    Refresh={refresh => { this.RefreshTraderRequestsTable = refresh; }}
                    OnRequestsFound={number => {
                        this.setState({
                            NumberOfRequests: number
                        });
                    }}
                    JobRequestID={jobRequest.JobRequestID} />

                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            </div>

            {this.state.Preloader}
       </section>;
    }
};

export default JobRequestPackageItem;