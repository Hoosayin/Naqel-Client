import React, { Component } from "react";
import JobOffersMap from "./JobOffersMap";

class Map extends Component {
    render() {
        return <section>
            <JobOffersMap Refresh={this.props.Refresh} />
        </section>;
    }
};

export default Map;