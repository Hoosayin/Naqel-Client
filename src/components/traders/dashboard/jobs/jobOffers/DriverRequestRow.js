import React, { Component } from "react";
import UUID from "uuid-v4";
import ProfileDialog from "./ProfileDialog";
import TruckDialog from "./TruckDialog";
import AssignJobDialog from "./AssignJobDialog";

class DriverRequestRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const price = this.props.Price;
        const driverRequestPackage = this.props.DriverRequestPackage;
        const driverRequest = driverRequestPackage.DriverRequest;
        const driver = driverRequestPackage.Driver;
        const driverOnJob = driverRequestPackage.DriverOnJob;
        const traderOnJob = driverRequestPackage.TraderOnJob;
        const canAssign = !(driverOnJob || traderOnJob);

        const profileIndex = UUID();
        const truckIndex = UUID();
        const assignJobIndex = UUID();

        return <tr>
            <td>
                <strong>{index + 1}</strong>
            </td>

            <td>
                {`${driver.FirstName} ${driver.LastName}`}
                {index === 0 ? <span class="badge back-color-golden m-l-xxxs">NEW</span> : null}
                {driverOnJob ? <span class="badge back-color-danger m-l-xxxs">ON JOB</span> : null}
            </td>

            <td>{new Date(driverRequest.Created).toDateString()}</td>

            {driverRequest.Price ? <td>{`$${driverRequest.Price}`}</td> : null}

            <td class="text-right">
                <div>
                    <button className="btn btn-secondary m-xxxs"
                        data-toggle="modal"
                        data-target={`#profile-dialog-${profileIndex}`}
                        onClick={async () => {
                            await this.RefreshDriverContainer();
                            await this.RefreshDocumentsContainer();
                        }}>Profile</button>

                    <button className="btn btn-secondary m-xxxs"
                        data-toggle="modal"
                        data-target={`#truck-dialog-${truckIndex}`}
                        onClick={async () => {
                            await this.RefreshTruckContainer();
                        }}>Truck</button>

                    <button className="btn btn-primary m-xxxs"
                        disabled={!canAssign}
                        data-toggle="modal"
                        data-target={`#assign-dialog-${assignJobIndex}`}>Assign Job</button>

                    <ProfileDialog Index={profileIndex}
                        DriverID={driverRequest.DriverID}
                        RefreshDriver={refresh => { this.RefreshDriverContainer = refresh; }}
                        RefreshDocuments={refresh => { this.RefreshDocumentsContainer = refresh; }} />

                    <TruckDialog Index={truckIndex}
                        DriverID={driverRequest.DriverID}
                        Refresh={refresh => { this.RefreshTruckContainer = refresh; }} />

                    <AssignJobDialog Index={assignJobIndex}
                        DriverRequestID={driverRequest.DriverRequestID}
                        Driver={driver}
                        Price={driverRequest.Price ? driverRequest.Price : price}
                        CanAssign={() => { return canAssign; }}
                        OnOK={this.props.OnJobAssigned} />
                </div>
            </td>
        </tr>;
    }
};

export default DriverRequestRow;