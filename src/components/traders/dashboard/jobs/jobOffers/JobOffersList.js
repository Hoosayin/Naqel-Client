import React, { Component } from "react";
import { getData } from "../../../TraderFunctions";
import JobOfferPackageItem from "./JobOfferPackageItem";
import AddJobOfferDialog from "./AddJobOfferDialog";
import ProgressBar from "../../../../../controls/ProgressBar";
import ProgressRing from "../../../../../controls/ProgressRing";

class JobOffersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllJobOfferPackages: [],
            JobOfferPackages: [],
            TraderOnJob: false,
            SearchString: "",
            Searching: null,
            Refreshing: false,
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
                Get: "JobOfferPackages"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job offer packages found.") {
                    this.setState({
                        AllJobOfferPackages: response.JobOfferPackages,
                        JobOfferPackages: response.JobOfferPackages,
                        TraderOnJob: response.TraderOnJob,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllJobOfferPackages: [],
                        JobOfferPackages: [],
                        TraderOnJob: false,
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
                Get: "JobOfferPackages"
            };

            this.setState({
                Refreshing: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job offer packages found.") {
                    this.setState({
                        AllJobOfferPackages: response.JobOfferPackages,
                        JobOfferPackages: response.JobOfferPackages,
                        TraderOnJob: response.TraderOnJob,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        AllJobOfferPackages: [],
                        JobOfferPackages: [],
                        TraderOnJob: false,
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
            {this.state.TraderOnJob ?
                <div class="alert alert-danger m-n">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>While you are engaged in an On-Going Job, you cannot assign more jobs to drivers. View details in <span className="color-default">On-Going Job</span> tab.</p>
                            </div>
                        </div>
                    </div>
                </div> :
                null}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-hand-holding-usd"></span>   Job Offers</div>
                            <p className="color-light">Hi There! Want to transport your freight somewhere? Why not create a new job offer now!</p>
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
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Your Job Offers
                    {this.state.Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>
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
                                OnJobOfferUpdated={this.onComponentUpdated}
                                TraderOnJob={this.state.TraderOnJob} />
                        </li>;
                    })}
                </ol>}
            
        </section>;
    }
};

export default JobOffersList;