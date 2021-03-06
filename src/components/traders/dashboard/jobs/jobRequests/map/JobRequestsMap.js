import React, { Component } from "react";
import PlaceInput from "../../../../../../controls/PlaceInput";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import JobRequestsGoogleMap from "./JobRequestsGoogleMap";
import { getData } from "../../../../TraderFunctions";

class JobRequestsMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobRequestPosts: [],
            Place: null,
            Searching: false,
            Refreshing: false
        };

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

    refresh = async () => {
        if (localStorage.Token) {

            this.setState({
                Refreshing: true
            });

            let request = {
                Token: localStorage.Token,
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
        const {
            JobRequestPosts,
            Place,
            Searching
        } = this.state;

        return <section>

            {JobRequestPosts.length === 0 ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.JobRequests} /> :
                <section>
                    <JobRequestsGoogleMap JobRequestPosts={JobRequestPosts} />
                </section>}
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
        JobRequests: "طلبات العمل"
    };
}
else {
    Dictionary = {
        JobRequests: "Job Requests"
    };
}

export default JobRequestsMap;