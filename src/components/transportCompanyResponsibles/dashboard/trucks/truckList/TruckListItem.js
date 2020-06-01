import React, { Component } from "react";
import TruckDialog from "./TruckDialog";
import DriverDialog from "./DriverDialog";

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

            <td>{Truck.TruckID}</td>

            <td>{Truck.Brand}</td>

            <td>{Truck.Model}</td>

            <td className="text-right">
                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#truck-dialog-${Index}`}>Details</button>

                <button className="btn btn-secondary m-t-n"
                    data-toggle="modal"
                    data-target={`#driver-dialog-${Index}`}
                    onClick={async () => {
                        await this.RefreshDriverContainer();
                        await this.RefreshDocumentsContainer();
                    }}>Driver</button>

                <button className="btn btn-primary m-t-n">Locate</button>

                <TruckDialog Index={Index}
                    DriverID={Truck.DriverID}
                    Refresh={refresh => { this.RefreshTruckContainer = refresh; }} />

                <DriverDialog Index={Index}
                    DriverID={Truck.DriverID}
                    RefreshDriver={refresh => { this.RefreshDriverContainer = refresh; }}
                    RefreshDocuments={refresh => { this.RefreshDocumentsContainer = refresh; }} />
            </td>
        </tr>;
    }
};

export default TruckListItem;