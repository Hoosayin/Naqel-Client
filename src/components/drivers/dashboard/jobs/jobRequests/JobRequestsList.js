import React, { Component } from "react";
import { getData } from "../../../DriverFunctions";
import JobRequestPackageItem from "./JobRequestPackageItem";
import AddJobRequestDialog from "./AddJobRequestDialog";
import ProgressBar from "../../../../../controls/ProgressBar";
import ProgressRing from "../../../../../controls/ProgressRing";

class JobRequestsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllJobRequestPackages: [],
            JobRequestPackages: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
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
                Get: "JobRequestPackages"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job request packages found.") {
                    this.setState({
                        AllJobRequestPackages: response.JobRequests,
                        JobRequestPackages: response.JobRequests,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllJobRequestPackages: [],
                        JobRequestPackages: [],
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
                Get: "JobRequestPackages"
            };

            this.setState({
                Refreshing: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job request packages found.") {
                    this.setState({
                        AllJobRequestPackages: response.JobRequests,
                        JobRequestPackages: response.JobRequests,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        AllJobRequestPackages: [],
                        JobRequestPackages: [],
                        Refreshing: false
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
                JobRequestPackages: this.state.AllJobRequestPackages
            });

            return;
        }

        const allJobRequestPackages = this.state.AllJobRequestPackages;
        let filteredJobRequestPackages = [];
        let count = 0;

        for (let jobRequestPackage of allJobRequestPackages) {
            let jobRequest = jobRequestPackage.JobRequest;

            if (jobRequest.LoadingPlace.includes(this.state.SearchString) ||
                jobRequest.UnloadingPlace.includes(this.state.SearchString)) {
                filteredJobRequestPackages[count++] = jobRequestPackage;
            }
        }

        this.setState({
            JobRequestPackages: filteredJobRequestPackages
        });
    }

    render() {
        const jobRequestPackages = this.state.JobRequestPackages;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-briefcase m-r-xxs"></span>{Dictionary.JobRequests}</div>
                            <p className="color-light">{Dictionary.JobRequestsSubtitle}</p>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#add-job-request-dialog">{Dictionary.NewJobRequest}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddJobRequestDialog
                OnOK={() => {
                    this.onComponentUpdated();
                }} />
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.YourJobRequests}
                    {this.state.Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>
            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder={Dictionary.SearchByPlaces}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={this.state.SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            {(jobRequestPackages.length === 0) ?
                <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                    <div className="container">
                        <div className="row">
                            {this.state.Searching ? <div className="col-md-24 text-center">
                                <div>
                                    <div className="type-h3" style={{ color: "#008575" }}>{Dictionary.Searching}</div>
                                    <ProgressBar />
                                </div>
                            </div> : <div className="col-md-24 text-center">
                                    <h3><span className="fas fa-exclamation-triangle m-r-xxs" style={{ color: "#FFBF15" }}></span>{Dictionary.JobRequestsNotFound}</h3>
                                </div>}
                        </div>
                    </div>
                </div> : <ol className="list-items" style={{ margin: "0px" }}>
                    {this.state.JobRequestPackages.map((jobRequestPackage, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <JobRequestPackageItem Index={index}
                                JobRequestPackage={jobRequestPackage}
                                OnJobRequestUpdated={this.refresh} />
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
        JobRequests: "طلبات العمل",
        JobRequestsSubtitle: ".أنشئ طلبات عمل جديدة لمواقعك الحالية و / أو القريبة منك للحصول على فرصة لزيادة أرباحك",
        NewJobRequest: "طلب وظيفة جديدة",
        YourJobRequests: "طلبات عملك",
        SearchByPlaces: "البحث عن طريق الأماكن",
        Searching: "يبحث",
        JobRequestsNotFound: ".لم يتم العثور على طلبات العمل"
    };
}
else {
    Dictionary = {
        JobRequests: "Job Requests",
        JobRequestsSubtitle: "Create new job requests for your current and/or near-by locations to get a chance to increase your revenue.",
        NewJobRequest: "New Job Request",
        YourJobRequests: "Your Job Requests",
        SearchByPlaces: "Search by Places",
        Searching: "Searching",
        JobRequestsNotFound: "Job Requests not Found."
    };
}

export default JobRequestsList;