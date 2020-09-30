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
                            <th>{Dictionary.Number}</th>
                            <th>{Dictionary.JobNumber}</th>
                            <th>{Dictionary.Source}</th>
                            <th>{Dictionary.Destination}</th>
                            <th>{Dictionary.Price}</th>
                            <th>{Dictionary.TruckNumber}</th>
                            <th>{Dictionary.Date}</th>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Number: "رقم",
        JobNumber: "رقم الوظيفة",
        Source: "مصدر",
        Destination: "المكان المقصود",
        Price: "السعر",
        TruckNumber: "رقم الشاحنة",
        Date: "تاريخ",
    };
}
else {
    Dictionary = {
        Number: "NUMBER",
        JobNumber: "JOB NUMBER",
        Source: "SOURCE",
        Destination: "DESTINATION",
        Price: "PRICE",
        TruckNumber: "TRUCK NUMBER",
        Date: "DATE",
    };
}

export default TruckJobsTable;