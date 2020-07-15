import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import TruckList from "./truckList/TruckList";
import TruckJobs from "./truckJobs/TruckJobs";

class Trucks extends Component {
    render() {
        return <section>
            {/* <PageHeading Heading="TRUCKS" /> */}
            <ul className="nav nav-tabs theme-alt" role="tablist" style={{
                padding: "10px",
                backgroundColor: "#3A3A3C",
                width: "100%",
                margin: "0px",
            }}>
                <li role="presentation" className="active">
                    <a href="#truck-list" aria-controls="truck-list" role="tab" data-toggle="tab">{Dictionary.TruckList}</a>
                </li>
                <li role="presentation">
                    <a href="#truck-jobs" aria-controls="truck-jobs" role="tab" data-toggle="tab">{Dictionary.TruckJobs}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="truck-list">
                    <TruckList />
                </div>
                <div role="tabpanel" class="tab-pane" id="truck-jobs">
                    <TruckJobs />
                </div>
            </div>
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        TruckList: "قائمة الشاحنات",
        TruckJobs: "وظائف الشاحنات",
    };
}
else {
    Dictionary = {
        TruckList: "Truck List",
        TruckJobs: "Truck Jobs",
    };
}

export default Trucks;