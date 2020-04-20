import React, { Component } from "react";
import Alert from "../../../../../controls/Alert";
import ProgressBar from "../../../../../controls/ProgressBar";
import { getData } from "../../../TraderFunctions";
import JobRequestPostListItem from "./JobRequestPostListItem";

class JobRequestPostsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobRequestPosts: [],
            Searching: true,
            Preloader: null,
            Message: null,
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobRequestPosts"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Job request posts found.") {
                    this.setState({
                        JobRequestPosts: response.JobRequestPosts,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobRequestPosts: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching) {
            return <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Job Requests</div>
                                <p>Job requests from Drivers are dispalyed here.</p>
                                <div class="type-sh3" style={{ color: "#008575" }}>Searhcing</div>
                                <ProgressBar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else if (this.state.JobRequestPosts.length === 0) {
            return <section>
                <div className="jumbotron theme-alt" style={{ backgroundColor: "#202020" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-push-12 text-center">
                                <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="job_requests.png" src="./images/job_requests.png" data-source-index="2" />
                            </div>
                            <div className="col-md-12 col-md-pull-12">
                                <div className="type-h3">Job Requests</div>
                                <div className="type-sh3">No Job Requests Found...</div>
                                <p>Job requests from Drivers are dispalyed here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        }
        else {
            return <section>
                <Alert Message={this.state.Message}
                    onClose={() => {
                    this.setState({
                        Message: null
                    });
                }} />
           <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
           <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Job Requests</div>
                <ol className="list-items" style={{ marginTop: "0px" }}>
                    {this.state.JobRequestPosts.map((jobRequestPost, index) => {
                        return <JobRequestPostListItem key={index} Index={index}
                            JobRequestPost={jobRequestPost}
                            OnRequestUpdated={(jobRequest, requestSent) => {
                                let jobRequestPosts = this.state.JobRequestPosts;

                                for (let jobRequestPost of jobRequestPosts) {
                                    if (jobRequestPost.JobRequest.JobRequestID === jobRequest.JobRequestID) {
                                        jobRequestPost.RequestSent = requestSent;
                                        break;
                                    }
                                }

                                this.setState({
                                    JobRequestPosts: jobRequestPosts
                                });
                            }} />;
                    })} 
                </ol>
       </section>;
        }      
    }
};

export default JobRequestPostsList;