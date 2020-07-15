import React, { Component } from "react";

class SearchTruckJobsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobNumber: "",
            StartDate: "",
            EndDate: "",
            StartPrice: 0.00,
            EndPrice: 0.00
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSubmit = async event => {
        event.preventDefault();

        const {
            JobNumber,
            StartDate,
            EndDate,
            StartPrice,
            EndPrice
        } = this.state;

        console.log(JobNumber);
        console.log(StartDate);
        console.log(EndDate);
        console.log(StartPrice);
        console.log(EndPrice);

        const {
            TruckJobs
        } = this.props;

        let filteredTruckJobs;
        let count;

        if (JobNumber !== "") {
            filteredTruckJobs = [];
            count = 0;

            for (let truckJob of TruckJobs) {
                if (truckJob.JobNumber.includes(JobNumber)) {
                    filteredTruckJobs[count++] = truckJob;
                }
            }

            this.cancelButton.click();
            this.props.OnOK(filteredTruckJobs);
            return;
        }
        else {
            filteredTruckJobs = TruckJobs.slice();
            let indicesToRemove;

            if (StartDate !== "") {
                console.log("Hllo");
                indicesToRemove = []
                count = 0;

                for (let truckJob of filteredTruckJobs) {
                    const created = new Date(truckJob.Created).getTime();
                    const startDate = new Date(StartDate).getTime();

                    if (created < startDate) {
                        indicesToRemove.push(count);
                    }

                    count++;
                }

                for (let index of indicesToRemove) {
                    filteredTruckJobs.splice(index, 1);
                }
            }

            if (EndDate !== "") {
                indicesToRemove = [];
                count = 0;

                for (let truckJob of filteredTruckJobs) {
                    const created = new Date(truckJob.Created).getTime();
                    const endDate = new Date(EndDate).getTime();

                    if (created > endDate) {
                        indicesToRemove.push(count);
                    }

                    count++;
                }

                for (let index of indicesToRemove) {
                    filteredTruckJobs.splice(index, 1);
                }
            }

            if (StartPrice !== "" ||
                StartPrice !== 0) {
                indicesToRemove = [];
                count = 0;

                for (let truckJob of filteredTruckJobs) {
                    if (parseFloat(truckJob.Price) < parseFloat(StartPrice)) {
                        indicesToRemove.push(count);
                    }

                    count++;
                }

                for (let index of indicesToRemove) {
                    filteredTruckJobs.splice(index, 1);
                }
            }

            if (EndPrice !== "" ||
                parseFloat(EndPrice) !== 0) {
                indicesToRemove = [];
                count = 0;

                for (let truckJob of filteredTruckJobs) {
                    if (parseFloat(truckJob.Price) > parseFloat(EndPrice)) {
                        indicesToRemove.push(count);
                    }

                    count++;
                }

                for (let index of indicesToRemove) {
                    filteredTruckJobs.splice(index, 1);
                }
            }

            this.cancelButton.click();
            this.props.OnOK(filteredTruckJobs);
        }
    }

    render() {
        let {
            JobNumber,
            StartDate,
            EndDate,
            StartPrice,
            EndPrice
        } = this.state;

        return <section>
            <div className="modal modal-center-vertical" id="search-truck-jobs-dialog"
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
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
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="jumbotron theme-default">
                                    <div className="container">
                                        <div className="type-h3 color-default p-t-xxs">{Dictionary.SearchTruckJobs}</div>
                                        <div className="row p-t-xxs">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.JobNumber}</label>
                                                    <input type="text" name="JobNumber"
                                                        className="form-control" autoComplete="off" value={JobNumber} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.StartingDate}</label>
                                                    <input type="date" name="StartDate"
                                                        className="form-control" autoComplete="off" value={StartDate} onChange={this.onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.EndingAmount}</label>
                                                    <input type="date" name="EndDate"
                                                        className="form-control" autoComplete="off" value={EndDate} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.StaringAmount}</label>
                                                    <input type="number" min="0" name="StartPrice"
                                                        className="form-control" autoComplete="off" value={StartPrice} onChange={this.onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">{Dictionary.EndingAmount}</label>
                                                    <input type="number" min="0" name="EndPrice"
                                                        className="form-control" autoComplete="off" value={EndPrice} onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <input type="submit" value={Dictionary.SearchNow} className="btn btn-primary" />
                                        </div>
                                    </div>
                                </div>
                            </form>
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
        SearchTruckJobs: "وظائف شاحنة البحث",
        JobNumber: "رقم الوظيفة",
        StartingDate: "تاريخ البدء",
        EndingDate: "تاريخ الانتهاء",
        StaringAmount: "(السعر المبدئي (ريال",
        EndingAmount: "(السعر النهائي (ريال",
        SearchNow: "ابحث الآن",
    };
}
else {
    Dictionary = {
        SearchTruckJobs: "Search Truck Jobs",
        JobNumber: "Job Number",
        StartingDate: "Starting Date",
        EndingDate: "Ending Date",
        StaringAmount: "Starting Price (SR)",
        EndingAmount: "Ending Price (SR)",
        SearchNow: "Search Now",
    };
}

export default SearchTruckJobsDialog;