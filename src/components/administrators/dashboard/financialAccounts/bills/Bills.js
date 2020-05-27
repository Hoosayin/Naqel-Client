import React, { Component } from "react";
import TradersBills from "./tradersBills/TradersBills";
import DriversBills from "./driversBills/DriversBills";

class Bills extends Component {
    render() {
        return <section>
            <ul className="nav nav-tabs tabs-light" role="tablist">
                <li role="presentation" className="active">
                    <a href="#traders-bills" aria-controls="traders-bills" role="tab" data-toggle="tab">Traders' Bills</a>
                </li>
                <li role="presentation">
                    <a href="#drivers-bills" aria-controls="drivers-bills" role="tab" data-toggle="tab">Drivers' Bills</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="traders-bills">
                    <TradersBills />
                </div>
                <div role="tabpanel" className="tab-pane" id="drivers-bills">
                    <DriversBills />
                </div>
            </div>
        </section>;
    }
};

export default Bills;