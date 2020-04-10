import React, { Component } from "react";
import { getData } from "../../../TraderFunctions";
import JobOfferPackageItem from "./JobOfferPackageItem";
import AddJobOfferDialog from "./AddJobOfferDialog";
import ProgressBar from "../../../../../controls/ProgressBar";

class JobOffersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllJobOfferPackages: [],
            JobOfferPackages: [],
            SearchString: "",
            Searching: null,
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobOfferPackages"
            };

            this.setState({
                Searching: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer packages found.") {
                    this.setState({
                        AllJobOfferPackages: response.JobOfferPackages,
                        JobOfferPackages: response.JobOfferPackages,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllJobOfferPackages: [],
                        JobOfferPackages: [],
                        Searching: false
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
                JobOfferPackages: this.state.AllJobOfferPackages
            });

            return;
        }

        const allJobOfferPackages = this.state.AllJobOfferPackages;
        let filteredJobOfferPackages = [];
        let count = 0;

        for (let jobOfferPackage of allJobOfferPackages) {
            let jobOffer = jobOfferPackage.JobOffer;

            if (jobOffer.LoadingPlace.includes(this.state.SearchString) ||
                jobOffer.UnloadingPlace.includes(this.state.SearchString)) {
                filteredJobOfferPackages[count++] = jobOfferPackage;
            }
        }

        this.setState({
            JobOfferPackages: filteredJobOfferPackages
        });
    }

    render() {
        const jobOfferPackages = this.state.JobOfferPackages;
        return <section>
            <div className="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-push-12 text-center">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="job_offers.png" src="./images/job_offers.png" data-source-index="2" />
                        </div>
                        <div className="col-md-12 col-md-pull-12">
                            <div className="type-h3">Job Offers</div>
                            <div className="type-sh3">Manage Your Job Offers</div>
                            <p>Hi There! Want to transport your freight somewhere? Why not create a new job offer now!!</p>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#add-job-offer-dialog">New Job Offer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddJobOfferDialog
                OnOK={() => {
                    this.onComponentUpdated();
                }} />
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Your Job Offers</div>
            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder="Search by Places"
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={this.state.SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            {(jobOfferPackages.length === 0) ?
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            {this.state.Searching ? <div className="col-md-24 text-center">
                                <div>
                                    <div className="type-h3" style={{ color: "#008575" }}>Searching</div>
                                    <ProgressBar />
                                </div>
                            </div> : <div className="col-md-24 text-center">
                                    <h3><span className="fas fa-exclamation-triangle" style={{ color: "#FFBF15" }}></span> No job offers found.</h3>
                                </div>}
                        </div>
                    </div>
                </div> : <ol className="list-items" style={{ margin: "0px" }}>
                    {jobOfferPackages.map((jobOfferPackage, index) => {
                        return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                            <JobOfferPackageItem Index={index}
                                JobOfferPackage={jobOfferPackage}
                                OnJobOfferUpdated={this.onComponentUpdated} />
                        </li>;
                    })}
                </ol>}
            
        </section>;
    }
};

export default JobOffersList;