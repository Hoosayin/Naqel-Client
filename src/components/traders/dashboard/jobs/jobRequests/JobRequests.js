import React, { Component } from "react";
import List from "./list/List";
import Map from "./map/Map";

class JobRequests extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#job-requests-list" aria-controls="job-requests-list" role="tab" data-toggle="tab">List</a>
                </li>
                <li role="presentation">
                    <a href="#job-requests-map" aria-controls="job-requests-map" role="tab" data-toggle="tab">Map</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="job-requests-list">
                    <List Refresh={this.props.Refresh} />
                </div>
                <div role="tabpanel" className="tab-pane" id="job-requests-map">
                    <Map Refresh={refresh => { this.RefreshMap = refresh; }} />
                </div>
            </div>
        </section>;
    }
};

export default JobRequests;