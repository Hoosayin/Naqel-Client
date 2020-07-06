import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import TruckJobDetailsContainer from "./truckJobDetails/TruckJobDetails";
import { getData } from "../../../../TransportCompanyResponsiblesFunctions";

class TruckJobDetailsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TruckJobDetails: null,
            Searching: false
        };

        this.searchTruckJobDetails = this.searchTruckJobDetails.bind(this);
    }

    async componentDidMount() {
        this.props.SearchTruckJobDetails(this.searchTruckJobDetails);
    }

    searchTruckJobDetails = async completedJobID => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TruckJobDetails",
                Params: {
                    CompletedJobID: completedJobID
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Truck job details found.") {
                    this.setState({
                        TruckJobDetails: response.TruckJobDetails,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        TruckJobDetails: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            TruckJobDetails,
            Searching
        } = this.state;

        const {
            Index
        } = this.props;

        return <section>
            <div className="modal modal-center-vertical" id={`truck-job-details-dialog-${Index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }} data-dismiss="modal">
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {Searching || !TruckJobDetails ?
                                <SearchingContainer Searching={Searching}
                                    SearchingFor={Dictionary.JobDetails} /> :
                                <section>
                                    <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                                        <ReactToPrint
                                            trigger={() => <button className="btn btn-primary m-t-n">{Dictionary.Print}</button>}
                                            content={() => this.JobDetails} />
                                    </div>
                                    <TruckJobDetailsContainer JobDetails={TruckJobDetails}
                                        ref={jobDetails => (this.JobDetails = jobDetails)}/>
                                </section>}
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

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobDetails: "تفاصيل الوظيفة",
        Print: "طباعة",
    };
}
else {
    Dictionary = {
        JobDetails: "Job Details",
        Print: "Print",
    };
}

export default TruckJobDetailsDialog;