import React, { Component } from "react";
import UUID from "uuid-v4";
import Preloader from "../../../../../../controls/Preloader";
import DriverContainer from "../../../../../../containers/driver/DriverContainer";
import TruckContainer from "../../../../../../containers/truck/TruckContainer";
import JobRequestContainer from "../../../../../../containers/jobReqeust/JobRequestContainer";
import SendTraderRequestDialog from "./SendTraderRequestDialog";
import TraderRequestDialog from "./TraderRequestDialog";
import AssignJobDialog from "./AssignJobDialog";
import Strings from "../../../../../../res/strings";
import { deleteTraderRequest } from "../../../../TraderFunctions";

class JobRequestPostListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null
        };

        this.onCancelRequest = this.onCancelRequest.bind(this);
    }

    onCancelRequest = async jobRequest => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedTraderRequest = {
            Token: localStorage.Token,
            JobRequestID: jobRequest.JobRequestID
        };

        console.log(`Going to delete Trader request...`);

        await deleteTraderRequest(discardedTraderRequest).then(response => {
            if (response.Message === "Trader request is deleted.") {
                this.props.OnRequestUpdated(jobRequest, null);
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        const index = this.props.Index;
        const jobRequest = this.props.JobRequestPost.JobRequest;
        const driver = this.props.JobRequestPost.Driver;
        const driverOnJob = this.props.JobRequestPost.DriverOnJob;
        const traderOnJob = this.props.TraderOnJob;
        const traderRequest = this.props.JobRequestPost.TraderRequest;
        const canAssign = !driverOnJob && !traderOnJob;

        const assignJobIndex = UUID();

        let Badge;

        if (traderRequest) {
            Badge = traderRequest.Selected ?
                <span class="badge back-color-golden m-l-xxs">{Dictionary.RequestAccepted}</span> :
                <span class="badge back-color-default m-l-xxs">{Dictionary.RequestSent}</span>;
        }
        else {
            Badge = null;
        }

        return <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron p-xxxs back-color-gray">
                    <div className="container">
                        <div className="row">
                            <div className="type-h5 color-default p-t-n">
                                {`${index + 1}.`}
                                {Badge}
                            </div>
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-user"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">{Dictionary.PostedBy}</div>
                                            <div className="content-text-secondary">{`${driver.FirstName} ${driver.LastName}`}
                                                {driverOnJob ?
                                                    <span class="badge back-color-danger m-l-xxs">{Dictionary.OnJob}</span> :
                                                    null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-clock"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">{Dictionary.PostedOn}</div>
                                            <div className="content-text-secondary">{new Date(jobRequest.TimeCreated).toDateString()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="entity-list">
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas fa-tag"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">{Dictionary.Price}</div>
                                            <div className="content-text-secondary">{`${jobRequest.Price} ${Strings.SAUDI_RIYAL}`}</div>
                                        </div>
                                    </div>
                                    <div className="entity-list-item">
                                        <div className="item-icon">
                                            <span className="fas  fa-map-marker-alt"></span>
                                        </div>
                                        <div className="item-content-primary">
                                            <div className="content-text-primary">{Dictionary.Route}</div>
                                            <div className="content-text-secondary">{`${Dictionary.Source}: ${jobRequest.LoadingPlace}`}</div>
                                            <div className="content-text-secondary">{`${Dictionary.Destination}: ${jobRequest.UnloadingPlace}`}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                {traderRequest ?
                                    <section>
                                        <button className="btn btn-secondary"
                                            data-toggle="modal"
                                            data-target={`#cancel-trader-request-dialog-${index}`}>{Dictionary.CancelRequest}</button>
                                        <button className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target={`#trader-request-dialog-${index}`}>{Dictionary.ViewRequest}</button>
                                        {traderRequest && traderRequest.Selected ?
                                            <button className="btn btn-primary"
                                                disabled={!canAssign}
                                                data-toggle="modal"
                                                data-target={`#assign-from-request-dialog-${assignJobIndex}`}>{Dictionary.AssignJob}</button> :
                                            null}
                                    </section> :
                                    <button className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target={`#send-trader-reqeust-dialog-${index}`}>{Dictionary.SendRequest}</button>}
                            </div>
                        </div>
                    </div>
                </div>

                {traderRequest ? 
                    <TraderRequestDialog Index={index} TraderRequest={traderRequest} /> : 
                    null}

                {traderRequest && traderRequest.Selected ? 
                    <AssignJobDialog Index={assignJobIndex}
                        TraderRequestID={traderRequest.TraderRequestID}
                        Driver={driver}
                        Price={jobRequest.Price}
                        CanAssign={() => { return canAssign; }}
                        OnOK={this.props.OnJobAssigned} /> : 
                    null}

                <div className="back-color-gray" data-toggle="collapse" aria-expanded="false" data-target={`#job-request-post-${index}`}>
                    <div className="type-h4 color-default text-right p-xxxs m-r-xxs">{Dictionary.MoreDetails}
                        <i className="fas fa-ellipsis-v"></i>
                        <i class="glyph glyph-add"></i>
                        <i class="glyph glyph-remove"></i>
                    </div>
                </div>
                <div className="collapse" id={`job-request-post-${index}`}>
                    <ul className="nav nav-tabs" role="tablist"
                        style={{
                            padding: "10px",
                            backgroundColor: "#EFEFEF",
                            width: "100%",
                            margin: "0px"
                        }}>
                        <li role="presentation" className="active"><a href={`#job-request-${index}`} aria-controls={`job-request-${index}`} role="tab" data-toggle="tab">{Dictionary.JobRequest}</a></li>
                        <li role="presentation">
                            <a href={`#driver-${index}`} aria-controls={`driver-${index}`} role="tab" data-toggle="tab"
                                onClick={async () => { await this.RefreshDriverContainer(); }}>{Dictionary.Driver}</a>
                        </li>
                        <li role="presentation">
                            <a href={`#truck-${index}`} aria-controls={`truck-${index}`} role="tab" data-toggle="tab"
                                onClick={async () => { await this.RefreshTruckContainer(); }}>{Dictionary.Truck}</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id={`job-request-${index}`}>
                            <JobRequestContainer JobRequest={jobRequest} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`driver-${index}`}>
                            <DriverContainer Refresh={refresh => { this.RefreshDriverContainer = refresh; }} DriverID={jobRequest.DriverID} />
                        </div>
                        <div role="tabpanel" className="tab-pane" id={`truck-${index}`}>
                            <TruckContainer Refresh={refresh => { this.RefreshTruckContainer = refresh; }} DriverID={jobRequest.DriverID} />
                        </div>
                    </div>
                </div>
                <SendTraderRequestDialog
                    DialogID={index}
                    JobRequest={jobRequest}
                    IsRequestSent={() => { return traderRequest ? true : false; }}
                    OnOK={traderRequest => { this.props.OnRequestUpdated(jobRequest, traderRequest); }} />
            </li>

            {traderRequest ? 
                <div className="modal modal-center-vertical" id={`cancel-trader-request-dialog-${index}`}
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
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-24">
                                                <div className="type-sh3 m-b-xxs">{Dictionary.CancelMessage}</div>
                                            </div>
                                            <div className="text-right">
                                                <button className="btn btn-danger"
                                                    onClick={async () => {
                                                        this.cancelButton.click();
                                                        await this.onCancelRequest(jobRequest);
                                                    }}>{Dictionary.Cancel}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}

            {this.state.Preloader}
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
        RequestAccepted: "طلب مقبول",
        RequestSent: "تم ارسال الطلب",
        PostedBy: "منشور من طرف",
        OnJob: "امر عمل قائم",
        PostedOn: "نشر على",
        Price: "السعر",
        Route: "طريق",
        Source: "مصدر",
        Destination: "المكان المقصود",
        CancelRequest: "إلغاء الطلب",
        ViewRequest: "عرض الطلب",
        AssignJob: "تعيين امر العمل",
        SendRequest: "ارسل طلب",
        MoreDetails: "المزيد من التفاصيل",
        JobRequest: "طلب امر عمل",
        Driver: "سائق",
        Truck: "شاحنة",
        CancelMessage: "هل أنت متأكد أنك تريد إلغاء هذا الطلب؟",
        Cancel: "إلغاء",
    };
}
else {
    Dictionary = {
        RequestAccepted: "REQUEST ACCEPTED",
        RequestSent: "REQUEST SENT",
        PostedBy: "Posted By",
        OnJob: "ON JOB",
        PostedOn: "Posted On",
        Price: "Price",
        Route: "Route",
        Source: "SOURCE",
        Destination: "DESTINATION",
        CancelRequest: "Cancel Request",
        ViewRequest: "View Request",
        AssignJob: "Assign Job",
        SendRequest: "Send Request",
        MoreDetails: "More Details",
        JobRequest: "Job Request",   
        Driver: "Driver",
        Truck: "Truck",
        CancelMessage: "Are you sure you want to cancel this request?",
        Cancel: "Cancel",
    };
}

export default JobRequestPostListItem;