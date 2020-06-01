import React, { Component } from "react";
import List from "./list/List";
import Map from "./map/Map";

class JobOffers extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#job-offers-list" aria-controls="job-offers-list" role="tab" data-toggle="tab">List</a>
                </li>
                <li role="presentation">
                    <a href="#job-offers-map" aria-controls="job-offers-map" role="tab" data-toggle="tab">Map</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="job-offers-list">
                    <List Refresh={this.props.Refresh} />
                </div>
                <div role="tabpanel" className="tab-pane" id="job-offers-map">
                    <Map Refresh={refresh => { this.RefreshMap = refresh; }} />
                </div>
            </div>
        </section>;
    }
};

export default JobOffers;