import React, { Component } from "react";
import CompletedJobContainer from "../../../../../../../containers/completedJob/CompletedJobContainer";
import DriverReviewContainer from "./DriverReviewContainer";
import UserDetailsContainer from "./UserDetailsContainer";

class TruckJobDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            JobDetails
        } = this.props;

        return <section>
            <CompletedJobContainer CompletedJob={JobDetails} />
            <DriverReviewContainer DriverReview={JobDetails.DriverReview} />
            <UserDetailsContainer Driver={JobDetails.Driver} Trader={JobDetails.Trader} />
        </section>;
    }
};

export default TruckJobDetails;