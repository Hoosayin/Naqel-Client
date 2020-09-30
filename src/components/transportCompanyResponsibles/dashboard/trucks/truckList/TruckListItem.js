import React, { Component } from "react";
import TruckDialog from "./TruckDialog";
import DriverDialog from "./DriverDialog";
import LocateTruckDialog from "./LocateTruckDialog";

class TruckListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            Truck
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
            </td>

            <td>{Truck.TruckNumber}</td>

            <td>{Truck.Brand}</td>

            <td>{Truck.Model}</td>

            <td className="text-right">
                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#truck-dialog-${Index}`}>{Dictionary.Details}</button>

                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#driver-dialog-${Index}`}
                    onClick={async () => {
                        await this.RefreshDriverContainer();
                        await this.RefreshDocumentsContainer();
                    }}>{Dictionary.Driver}</button>

                <button className="btn btn-primary m-t-n"
                    data-toggle="modal"
                    data-target={`#locate-truck-dialog-${Index}`}
                    onClick={() => { this.LocateTruck(); }}>{Dictionary.Locate}</button>

                <TruckDialog Index={Index}
                    DriverID={Truck.DriverID}
                    Refresh={refresh => { this.RefreshTruckContainer = refresh; }} />

                <DriverDialog Index={Index}
                    DriverID={Truck.DriverID}
                    RefreshDriver={refresh => { this.RefreshDriverContainer = refresh; }}
                    RefreshDocuments={refresh => { this.RefreshDocumentsContainer = refresh; }} />

                <LocateTruckDialog Index={Index}
                    DriverID={Truck.DriverID}
                    LocateTruck={locateTruck => { this.LocateTruck = locateTruck; }}/>
            </td>
        </tr>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Details: "التفاصيل",
        Driver: "السائق",
        Locate: "حدد",
    };
}
else {
    Dictionary = {
        Details: "Details",
        Driver: "Driver",
        Locate: "Locate",
    };
}

export default TruckListItem;