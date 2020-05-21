import React, { Component } from "react";
import TraderObjectionReasons from "./traderObjectionReasons/TraderObjectionReasons";
import DriverObjectionReasons from "./driverObjectionReasons/DriverObjectionReasons";

class ObjectionReasons extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#trader-objection-reasons" aria-controls="job-tab" role="tab" data-toggle="tab">Trader Objection Reasons</a>
                </li>
                <li role="presentation">
                    <a href="#driver-objection-reasons" aria-controls="trader-tab" role="tab" data-toggle="tab">Driver Objection Reasons</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="trader-objection-reasons">
                    <TraderObjectionReasons />
                </div>
                <div role="tabpanel" className="tab-pane" id="driver-objection-reasons">
                    <DriverObjectionReasons />
                </div>
            </div>
        </section>;
    }
};

export default ObjectionReasons;