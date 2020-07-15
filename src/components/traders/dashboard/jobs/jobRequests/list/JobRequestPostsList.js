import React, { Component } from "react";
import ProgressBar from "../../../../../../controls/ProgressBar";
import ProgressRing from "../../../../../../controls/ProgressRing";
import { getData } from "../../../../TraderFunctions";
import JobRequestPostListItem from "./JobRequestPostListItem";

class JobRequestPostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobRequestPosts: [],
            TraderOnJob: false,
            Searching: true,
            Refreshing: false,
            Preloader: null,
            Message: null,
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        this.props.Refresh(this.refresh);
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "JobRequestPosts"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job request posts found.") {
                    this.setState({
                        JobRequestPosts: response.JobRequestPosts,
                        TraderOnJob: response.TraderOnJob,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobRequestPosts: [],
                        TraderOnJob: false,
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (sessionStorage.Token) {

            this.setState({
                Refreshing: true
            });

            let request = {
                Token: sessionStorage.Token,
                Get: "JobRequestPosts"
            };

            await getData(request).then(response => {
                if (response.Message === "Job request posts found.") {
                    this.setState({
                        JobRequestPosts: response.JobRequestPosts,
                        TraderOnJob: response.TraderOnJob,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        JobRequestPosts: [],
                        TraderOnJob: false,
                        Refreshing: false
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching) {
            return <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333", width: "100%", height: "100vh" }} dir={GetDirection()}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">{Dictionary.JobRequests}</div>
                                <p>{Dictionary.JobRequestsSubtitle}</p>
                                <div class="type-sh3" style={{ color: "#008575" }}>{Dictionary.Searching}</div>
                                <ProgressBar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else if (this.state.JobRequestPosts.length === 0) {
            return <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#333333", width: "100%", height: "100vh" }} dir={GetDirection()}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">{Dictionary.JobRequests}</div>
                                <div className="type-sh3">{Dictionary.NoRequestsFound}</div>
                                <p>{Dictionary.JobRequestsSubtitle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else {
            return <section>
                {this.state.TraderOnJob ?
                    <div class="alert alert-danger m-n" dir={GetDirection()}>
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-24">
                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>{Dictionary.OnJobMessage} <span className="color-default">{Dictionary.OnGoingJob}</span> {Dictionary.Tab}.</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    null}
           <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.JobRequests}
                    {this.state.Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
                </div>
                <ol className="list-items" style={{ marginTop: "0px" }}>
                    {this.state.JobRequestPosts.map((jobRequestPost, index) => {
                        return <JobRequestPostListItem key={index} Index={index}
                            JobRequestPost={jobRequestPost}
                            OnRequestUpdated={(jobRequest, traderRequest) => {
                                let jobRequestPosts = this.state.JobRequestPosts;

                                for (let jobRequestPost of jobRequestPosts) {
                                    if (jobRequestPost.JobRequest.JobRequestID === jobRequest.JobRequestID) {
                                        jobRequestPost.TraderRequest = traderRequest;
                                        break;
                                    }
                                }

                                this.setState({
                                    JobRequestPosts: jobRequestPosts
                                });
                            }}
                            TraderOnJob={this.state.TraderOnJob}
                            OnJobAssigned={this.refresh} />;
                    })} 
                </ol>
       </section>;
        }      
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        JobRequests: "طلبات العمل",
        JobRequestsSubtitle: ".يتم طلب طلبات العمل من السائقين هنا",
        Searching: "يبحث",
        NoRequestsFound: "...لم يتم العثور على طلبات عمل",
        OnJobMessage: "أثناء مشاركتك في وظيفة مستمرة ، لا يمكنك تعيين المزيد من الوظائف للسائقين. عرض التفاصيل في",
        OnGoingJob: "العمل المستمر",
        Tab: "التبويب",
    };
}
else {
    Dictionary = {
        JobRequests: "Job Requests",
        JobRequestsSubtitle: "Job requests from Drivers are dispalyed here.",
        Searching: "Searching",
        NoRequestsFound: "No Job Requests Found...",
        OnJobMessage: "While you are engaged in an On-Going Job, you cannot assign more jobs to drivers. View details in",
        OnGoingJob: "On-Going Job",
        Tab: "tab",
    };
}

export default JobRequestPostsList;