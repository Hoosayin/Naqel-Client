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
            Token: sessionStorage.Token,
            JobRequestID: jobRequestID
        };

        console.log(`Going to delete Job request...`);

        await deleteJobRequest(discardedJobRequest).then(response => {
            this.setState({
                Preloader: null
            });

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
                    data-target={`#edit-job-request-dialog-${index}`}>{Dictionary.Edit}</button>
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-job-request-${index}`}>{Dictionary.Delete}</button>
            </div>

            <EditJobRequestDialog
                DialogID={index}
                JobRequest={jobRequest}
                CanEdit={() => { return this.state.NumberOfRequests === 0 ? true : false }}
                OnOK={() => { this.props.OnJobRequestUpdated(); }} />

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#job-request-package-${index}`}
                onMouseDown={async () => { await this.RefreshTraderRequestsTable(); }}>
                <div className="type-h4 text-right color-default p-xxxs">
                    <span class="badge back-color-danger m-r-xxs">{this.state.NumberOfRequests}</span>{Dictionary.TraderRequests}
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

            <div className="modal modal-center-vertical" id={`delete-job-request-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "auto", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="jumbotron theme-default" dir={GetDirection()}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-24">
                                            <div className="type-sh3 m-b-xxs">{Dictionary.DeleteMessage}</div>
                                        </div>
                                        <div className="text-right">
                                            <button className="btn btn-danger"
                                                onClick={async () => {
                                                    this.cancelButton.click();
                                                    await this.onDelete(jobRequest.JobRequestID);
                                                }}>{Dictionary.Delete}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

       </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Edit: "تعديل",
        Delete: "حذف",
        TraderRequests: "طلبات التجار",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف طلب الوظيفة هذا؟",
    };
}
else {
    Dictionary = {
        Edit: "Edit",
        Delete: "Delete",
        TraderRequests: "Trader Requests",
        DeleteMessage: "Are you sure you want to delete this job request?",
    };
}

export default JobRequestPackageItem;