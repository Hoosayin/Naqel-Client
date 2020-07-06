import React, { Component } from "react";
import UUID from "uuid-v4";
import ProfileDialog from "./ProfileDialog";
import TruckDialog from "./TruckDialog";
import AssignJobDialog from "./AssignJobDialog";
import Strings from "../../../../../res/strings";

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
                {index === 0 ? <span class="badge back-color-golden m-l-xxxs">{Dictionary.New}</span> : null}
                {driverOnJob ? <span class="badge back-color-danger m-l-xxxs">{Dictionary.OnJob}</span> : null}
            </td>

            <td>{new Date(driverRequest.Created).toDateString()}</td>

            {driverRequest.Price ? <td>{`${driverRequest.Price} ${Strings.SAUDI_RIYAL}`}</td> : null}

            <td class="text-right">
                <div>
                    <button className="btn btn-secondary m-xxxs"
                        data-toggle="modal"
                        data-target={`#profile-dialog-${profileIndex}`}
                        onClick={async () => {
                            await this.RefreshDriverContainer();
                            await this.RefreshDocumentsContainer();
                        }}>{Dictionary.Profile}</button>

                    <button className="btn btn-secondary m-xxxs"
                        data-toggle="modal"
                        data-target={`#truck-dialog-${truckIndex}`}
                        onClick={async () => {
                            await this.RefreshTruckContainer();
                        }}>{Dictionary.Truck}</button>

                    <button className="btn btn-primary m-xxxs"
                        disabled={!canAssign}
                        data-toggle="modal"
                        data-target={`#assign-dialog-${assignJobIndex}`}>{Dictionary.AssignJob}</button>

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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        New: "جديد",
        OnJob: "على الوظيفة",
        Profile: "الملف الشخصي",
        Truck: "شاحنة",
        AssignJob: "تعيين الوظيفة",
    };
}
else {
    Dictionary = {
        New: "NEW",
        OnJob: "ON JOB",
        Profile: "Profile",
        Truck: "Truck",
        AssignJob: "Assign Job",
    };
}

export default DriverRequestRow;