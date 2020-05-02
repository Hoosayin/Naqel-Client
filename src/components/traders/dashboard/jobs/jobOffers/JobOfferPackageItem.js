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
            Token: localStorage.Token,
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
                    data-target={`#edit-job-offer-dialog-${index}`}>Edit</button>
                <button className="btn btn-danger" onClick={async () => { await this.onDelete(jobOffer.JobOfferID); }}>Delete</button>
            </div>

            <EditJobOfferDialog
                DialogID={index}
                JobOffer={jobOffer}
                CanEdit={() => { return (this.state.NumberOfRequests === 0) ? true : false }}
                OnOK={() => { this.props.OnJobOfferUpdated(); }} />

            <div data-toggle="collapse" aria-expanded="false"
                data-target={`#job-offer-package-${index}`}
                onMouseDown={async () => { await this.RefreshDriverRequestsTable(); }}>

                <div className="type-h4 text-right color-default p-xxs">
                    <span class="badge back-color-danger m-r-xxxs">{this.state.NumberOfRequests}</span>
                    {(jobOffer.JobOfferType === "Fixed-Price") ? "Driver Requests" : "Driver Bids"}
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

            {this.state.Preloader}
       </section>;
    }
};

export default JobOfferPackageItem;