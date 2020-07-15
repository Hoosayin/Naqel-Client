import React, { Component } from "react";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import CompletedJobPackageListItem from "./CompletedJobPackageListItem";
import ProgressRing from "../../../../../controls/ProgressRing";
import { getData } from "../../../DriverFunctions";

class CompletedJobsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllCompletedJobPackages: [],
            CompletedJobPackages: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        }

        this.refresh = this.refresh.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "CompletedJobPackages"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Completed job packages found.") {
                    this.setState({
                        AllCompletedJobPackages: response.CompletedJobPackages,
                        CompletedJobPackages: response.CompletedJobPackages,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllCompletedJobPackages: [],
                        CompletedJobPackages: [],
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "CompletedJobPackages"
            };

            this.setState({
                Refreshing: true
            });

            await getData(request).then(response => {
                if (response.Message === "Completed job packages found.") {
                    this.setState({
                        AllCompletedJobPackages: response.CompletedJobPackages,
                        CompletedJobPackages: response.CompletedJobPackages,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        AllCompletedJobPackages: [],
                        CompletedJobPackages: [],
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

        if (this.state.SearchDate === "") {
            this.setState({
                CompletedJobPackages: this.state.AllCompletedJobPackages
            });

            return;
        }

        const allCompletedJobPackages = this.state.AllCompletedJobPackages;
        let filteredCompletedJobPackages = [];
        let count = 0;
        let searchString = this.state.SearchString;

        for (let completedJobPackage of allCompletedJobPackages) {
            let completedJob = completedJobPackage.CompletedJob;

            if (completedJob.JobNumber.includes(searchString)) {
                filteredCompletedJobPackages[count++] = completedJobPackage;
            }
        }

        this.setState({
            CompletedJobPackages: filteredCompletedJobPackages
        });
    };

    render() {
        const completedJobPackages = this.state.CompletedJobPackages;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
        <div className="type-h3 color-light"><span className="fas fa-check m-r-xxs"></span>{Dictionary.CompletedJobs}</div>
                            <p className="color-light">{`${Dictionary.CompletedJobsSubtitle} ${this.state.AllCompletedJobPackages.length}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
        <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.YourCompletedJobs}
                    {this.state.Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>
            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="text" name="SearchString" className="form-control" placeholder={Dictionary.SearchJobs}
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={this.state.SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div> 
                        </form>
                    </div>
                </div>
            </nav>
            {(completedJobPackages.length === 0) ?
                <SearchingContainer Searching={this.state.Searching}
                    SearchingFor="completed jobs" /> :
                <ol className="list-items" style={{ margin: "0px" }}>
                    {completedJobPackages.map((completedJobPackage, index) => {
                        return <CompletedJobPackageListItem key={index}
                            Index={index}
                            CompletedJobPackage={completedJobPackage}
                            OnPayProofApproved={completedJobPackage => {
                                let completedJobPackages = this.state.CompletedJobPackages;

                                for (let completedJobPackageItem of completedJobPackages) {
                                    if (completedJobPackageItem === completedJobPackage) {
                                        completedJobPackageItem.BillPaid = true;
                                        break;
                                    }
                                }

                                this.setState({
                                    CompletedJobPackages: completedJobPackages
                                });
                            }} />;
                    })}
                </ol>}
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
        CompletedJobs: "الوظائف المكتملة",
        CompletedJobsSubtitle: "الوظائف التي أكملتها:",
        YourCompletedJobs: "وظائفك المكتملة",
        SearchJobs: "بحث وظائف",
    };
}
else {
    Dictionary = {
        CompletedJobs: "Completed Jobs",
        CompletedJobsSubtitle: "Jobs that you have completed:",
        YourCompletedJobs: "Your Completed Jobs",
        SearchJobs: "Search Jobs",
    };
}

export default CompletedJobsList;