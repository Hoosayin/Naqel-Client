import React, { Component } from "react";
import UUID from "uuid-v4";
import DriverTab from "./DriverTab";
import TruckTab from "./TruckTab";

class JobRequestTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const driverRequestPackage = this.props.DriverRequestPackage;
        const driver = driverRequestPackage.Driver;
        const driverProfilePhoto = driverRequestPackage.ProfilePhoto; 
        const driverRequest = driverRequestPackage.DriverRequest;
        const truck = driverRequestPackage.Truck;
        const trailers = driverRequestPackage.Trailers;

        const documents = {
            DrivingLicence: driverRequestPackage.DrivingLicence,
            IdentityCard: driverRequestPackage.IdentityCard,
            EntryExitCard: driverRequestPackage.EntryExitCard
        };

        const driverTabID = UUID().substring(0, 7).toUpperCase();
        const truckTabID = UUID().substring(0, 7).toUpperCase();

        return <section>
            <ul className="nav nav-tabs" role="tablist"
                style={{
                    padding: "10px",
                    backgroundColor: "#EFEFEF",
                    width: "100%",
                    margin: "0px"
                }}>
                <li role="presentation" className="active">
                    <a href={`#driver-request-driver-${driverTabID}`} aria-controls={`driver-request-driver-${driverTabID}`} role="tab" data-toggle="tab">Driver</a>
                </li>
                {truck ? <li role="presentation">
                    <a href={`#driver-request-truck-${truckTabID}`} aria-controls={`driver-request-truck-${truckTabID}`} role="tab" data-toggle="tab">Truck</a>
                </li> : null}
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id={`driver-request-driver-${driverTabID}`}>
                    <DriverTab
                        Driver={driver}
                        DriverProfilePhoto={driverProfilePhoto}
                        Documents={documents}
                        DriverRequest={driverRequest}
                        Index={index} />
                </div>
                {truck ? <div role="tabpanel" className="tab-pane" id={`driver-request-truck-${truckTabID}`}>
                    <TruckTab Truck={truck} Trailers={trailers} Index={index} />
                </div> : null}
            </div>
            <div style={{ backgroundColor: "#EFEFEF", textAlign: "right", padding: "10px" }}>
                <button className="btn btn-primary">Assign Job</button>
            </div>
       </section>;
    }
};

export default JobRequestTab;