import React, { Component } from "react";
import Strings from "../../../../../../res/strings";
import TruckJobDetailsDialog from "./TruckJobDetailsDialog";

class TruckJobsRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            Index,
            TruckJob
        } = this.props;

        return <tr>
            <td>
                <strong>{`${Index + 1}.`}</strong>
            </td>

            <td>{TruckJob.JobNumber}</td>

            <td>{TruckJob.LoadingPlace}</td>

            <td>{TruckJob.UnloadingPlace}</td>

            <td>{`${TruckJob.Price.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>

            <td>{TruckJob.TruckNumber}</td>

            <td>{new Date(TruckJob.Created).toDateString()}</td>

            <td className="text-right">
                <button className="btn btn-primary m-t-n"
                    data-toggle="modal"
                    data-target={`#truck-job-details-dialog-${Index}`}
                    onClick={async () => { await this.SearchTruckJobDetails(TruckJob.CompletedJobID); }}>Details</button>

                <TruckJobDetailsDialog Index={Index}
                    SearchTruckJobDetails={searchTruckJobDetails => { this.SearchTruckJobDetails = searchTruckJobDetails }} />
            </td>
        </tr>;
    }
};

export default TruckJobsRow;