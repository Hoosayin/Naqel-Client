import React, { Component } from "react";
import PlaceInput from "../../../../../../controls/PlaceInput";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import JobOffersGoogleMap from "./JobOffersGoogleMap";
import { getData } from "../../../../DriverFunctions";

class JobOffersMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            JobOfferPosts: [],
            Place: null,
            Searching: false,
            Refreshing: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    componentDidMount() {
        this.props.Refresh(this.refresh);
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobOfferPosts"
            };

            this.setState({
                Searching: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "JobOfferPosts"
            };

            this.setState({
                Refreshing: true
            });

            getData(request).then(response => {
                if (response.Message === "Job offer posts found.") {
                    this.setState({
                        JobOfferPosts: response.JobOfferPosts,
                        Refreshing: false
                    });
                }
                else {
                    this.setState({
                        JobOfferPosts: [],
                        Refreshing: false
                    });
                }
            });
        }
    };

    render() {
        const {
            JobOfferPosts,
            Place,
            Searching
        } = this.state;

        return <section>

            {JobOfferPosts.length === 0 ?
                <SearchingContainer Searching={Searching} SearchingFor="job offers" /> :
                <section>
                    <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                        <PlaceInput Address=""
                            OnPlaceSelected={place => {
                                this.setState({
                                    Place: place,
                                });
                            }} />
                    </div>
                    <JobOffersGoogleMap Place={Place} JobOfferPosts={JobOfferPosts} />
                </section>}
        </section>;
    }
};

export default JobOffersMap;