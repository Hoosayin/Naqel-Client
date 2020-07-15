import React, { Component } from "react";
import DriverRequestsTable from "./DriverRequestsTable";
import EditJobOfferDialog from "./EditJobOfferDialog";
import Preloader from "../../../../../controls/Preloader";
import { deleteJobOffer } from "../../../TraderFunctions";
import JobOfferContainer from "../../../../../containers/jobOffer/JobOfferContainer";

class JobOfferPackageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Preloader: null,
            NumberOfRequests: 0
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async jobOfferID => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedJobOffer = {
            Token: sessionStorage.Token,
            JobOfferID: jobOfferID
        };

        console.log(`Going to delete Job offer...`);

        await deleteJobOffer(discardedJobOffer).then(response => {
            if (response.Message === "Job offer is deleted.") {
                this.props.OnJobOfferUpdated();
            }
        });
    }

    render() {
        const index = this.props.Index;
        const jobOffer = this.props.JobOfferPackage.JobOffer;
        const hasDriverRequests = this.props.JobOfferPackage.HasDriverRequests;

        return <section>
            <JobOfferContainer Index={index} JobOffer={jobOffer} />

            <div className="text-right p-xxs back-color-gray">
                <button type="button" className="btn btn-default"
                    data-toggle="modal"
                    disabled={hasDriverRequests}
                    data-target={`#edit-job-offer-dialog-${index}`}>{Dictionary.Edit}</button>
                <button className="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete-job-offer-dialog-${index}`}>{Dictionary.Delete}</button>
            </div>

            <EditJobOfferDialog
                DialogID={index}
                JobOffer={jobOffer}
                CanEdit={() => { return (this.state.NumberOfRequests === 0) ? true : false }}
                OnOK={() => { this.props.OnJobOfferUpdated(); }} />

            <div className="back-color-gray" data-toggle="collapse" aria-expanded="false"
                data-target={`#job-offer-package-${index}`}
                onMouseDown={async () => { await this.RefreshDriverRequestsTable(); }}>

                <div className="type-h4 text-right color-default p-xxxs">
                    <span class="badge back-color-danger m-r-xxxs">{this.state.NumberOfRequests}</span>
                    {(jobOffer.JobOfferType === "Fixed-Price") ? Dictionary.DriverRequests : Dictionary.DriverBids}
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>

            </div>

            <div className="collapse" id={`job-offer-package-${index}`}>

                <DriverRequestsTable
                    Refresh={refresh => { this.RefreshDriverRequestsTable = refresh; }}
                    OnRequestsFound={number => {
                        this.setState({
                            NumberOfRequests: number
                        });
                    }}
                    JobOfferID={jobOffer.JobOfferID}
                    JobOfferType={jobOffer.JobOfferType}
                    Price={jobOffer.Price}
                    TraderOnJob={this.props.TraderOnJob}
                    OnJobAssigned={this.props.OnJobOfferUpdated} />

                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            </div>

            <div className="modal modal-center-vertical" id={`delete-job-offer-dialog-${index}`}
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
                                                    await this.onDelete(jobOffer.JobOfferID);
                                                }}>{Dictionary.Delete}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {this.state.Preloader}
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
        DriverRequests: "طلبات السائق",
        DriverBids: "عطاءات السائق",
        DeleteMessage: "هل أنت متأكد أنك تريد حذف عرض العمل هذا؟",
    };
}
else {
    Dictionary = {
        Edit: "Edit",
        Delete: "Delete",
        DriverRequests: "Driver Requests",
        DriverBids: "Driver Bids",
        DeleteMessage: "Are you sure you want to delete this job offer?",
    };
}

export default JobOfferPackageItem;