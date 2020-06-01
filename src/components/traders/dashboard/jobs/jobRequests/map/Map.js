import React, { Component } from "react";
import JobRequestsMap from "./JobRequestsMap";

class Map extends Component {
    render() {
        return <section>
            <JobRequestsMap Refresh={this.props.Refresh} />
        </section>;
    }
};

export default Map;