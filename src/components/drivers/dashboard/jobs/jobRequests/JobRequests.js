import React, { Component } from "react";
import JobRequestsList from "./JobRequestsList.js";

class JobRequests extends Component {
    render() {
        return <section>
            <JobRequestsList Refresh={this.props.Refresh} />
        </section>;
    }
};

export default JobRequests;