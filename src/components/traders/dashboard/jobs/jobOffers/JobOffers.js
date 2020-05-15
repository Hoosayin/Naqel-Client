import React, { Component } from "react";
import JobOffersList from "./JobOffersList.js";

class JobOffers extends Component {
    render() {
        return <section>
            <JobOffersList Refresh={this.props.Refresh} />
        </section>;
    }
};

export default JobOffers;