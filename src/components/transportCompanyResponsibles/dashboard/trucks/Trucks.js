import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import TruckList from "./truckList/TruckList";

class Trucks extends Component {
    render() {
        return <section>
            <PageHeading Heading="TRUCKS" />
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#truck-list" aria-controls="truck-list" role="tab" data-toggle="tab">Truck List</a>
                </li>
                <li role="presentation">
                    <a href="#truck-operations" aria-controls="truck-operations" role="tab" data-toggle="tab">Truck Operations</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="truck-list">
                    <TruckList />
                </div>
                <div role="tabpanel" class="tab-pane" id="truck-operations">
                    TRUCK OPERATIONS HERE
                </div>
            </div>
        </section>;
    }
};

export default Trucks;