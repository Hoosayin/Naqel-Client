import React, { Component } from "react";
import { getData } from "../../../TraderFunctions";
import JobOfferPackageItem from "./JobOfferPackageItem";
import AddJobOfferDialog from "./AddJobOfferDialog";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";

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
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
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
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
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
                <div class="alert alert-danger m-n" dir={GetDirection()}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs m-l-xxxs"></span>{Dictionary.OnJobMessage}</p>
                            </div>
                        </div>
                    </div>
                </div> :
                null}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }} dir={GetDirection()}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-hand-holding-usd m-l-xxs m-r-xxs"></span>{Dictionary.JobOffers}</div>
                            <p className="color-light">{Dictionary.JobOffersSubtitle}</p>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#add-job-offer-dialog">{Dictionary.NewJobOffer}</button>
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
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.YourJobOffers}
                    {this.state.Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
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
            {(jobOfferPackages.length === 0) ?
                <SearchingContainer Searching={this.state.Searching}
                SearchingFor={Dictionary.JobOffers} /> : <ol className="list-items" style={{ margin: "0px" }}>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        OnJobMessage: ".أثناء مشاركتك في وظيفة مستمرة ، لا يمكنك تعيين المزيد من الوظائف للسائقين. عرض التفاصيل في علامة التبويب مهمة مستمرة",
        JobOffers: "عروض العمل",
        JobOffersSubtitle: "!مرحبا! تريد نقل الشحن الخاص بك في مكان ما؟ لماذا لا تنشئ عرض عمل جديد الآن",
        NewJobOffer: "عرض عمل جديد",
        YourJobOffers: "عروض عملك",
        SearchByPlaces: "البحث عن طريق الأماكن",
    };
}
else {
    Dictionary = {
        OnJobMessage: "While you are engaged in an On-Going Job, you cannot assign more jobs to drivers. View details in On-Going Job tab.",
        JobOffers: "Job Offers",
        JobOffersSubtitle: "Hi There! Want to transport your freight somewhere? Why not create a new job offer now!",
        NewJobOffer: "New Job Offer",
        YourJobOffers: "Your Job Offers",
        SearchByPlaces: "Search by Places",
    };
}

export default JobOffersList;