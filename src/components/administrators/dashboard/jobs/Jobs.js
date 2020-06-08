import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import ObjectionReasons from "./objectionReasons/ObjectionReasons";
import ObjectionableJobs from "./objectionableJobs/ObjectionableJobs";

class Jobs extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="JOBS" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#objection-reasons" aria-controls="objection-reasons" role="tab" data-toggle="tab">Objection Reasons</a>
                </li>
                <li role="presentation">
                    <a href="#objectionable-jobs" aria-controls="objectionable-jobs" role="tab" data-toggle="tab">Objectionable Jobs</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="objection-reasons">
                    <ObjectionReasons />
                </div>
                <div role="tabpanel" class="tab-pane" id="objectionable-jobs">
                    <ObjectionableJobs />
                </div>
            </div>
        </section>;
    }
};

export default Jobs;