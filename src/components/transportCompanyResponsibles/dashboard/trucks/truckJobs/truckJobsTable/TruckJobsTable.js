import React, { Component } from "react";
import TruckJobsRow from "./TruckJobsRow";

class TruckJobsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            TruckJobs
        } = this.props;

        return <section>
            <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>NUMBER</th>
                            <th>JOB NUMBER</th>
                            <th>SOURCE</th>
                            <th>DESTINATION</th>
                            <th>PRICE</th>
                            <th>TRUCK NUMBER</th>
                            <th>DATE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {TruckJobs.map((truckJob, index) => {
                            return <TruckJobsRow key={index}
                                Index={index}
                                TruckJob={truckJob} />;
                        })}
                    </tbody>
                </table>
            </div>
        </section>;
    }
};

export default TruckJobsTable;