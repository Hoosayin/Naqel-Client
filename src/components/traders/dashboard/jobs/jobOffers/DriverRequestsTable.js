import React, { Component } from "react";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import DriverRequestRow from "./DriverRequestRow";
import { getData } from "../../../TraderFunctions";

class DriverRequestsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverRequestPackages: [],
            Searching: false
        };

        this.refresh = this.refresh.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        this.props.Refresh(this.refresh);
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {

            this.setState({
                Searching: true
            });

            let request = {
                Token: localStorage.Token,
                Get: "DriverRequestPackages",
                Params: {
                    JobOfferID: this.props.JobOfferID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Driver request packages found.") {
                    this.props.OnRequestsFound(response.DriverRequestPackages.length);
                    this.setState({
                        DriverRequestPackages: response.DriverRequestPackages,
                        Searching: false
                    });
                }
                else {
                    this.props.OnRequestsFound(0);
                    this.setState({
                        DriverRequestPackages: [],
                        Searching: false
                    });
                }
            });
        }
    };

    refresh = async () => {
        if (localStorage.Token) {

            let request = {
                Token: localStorage.Token,
                Get: "DriverRequests",
                Params: {
                    JobOfferID: this.props.JobOfferID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Driver requests found.") {
                    this.setState({
                        DriverRequests: response.DriverRequests
                    });
                }
                else {
                    this.setState({
                        DriverRequests: []
                    });
                }
            });
        }
    };

    render() {
        const jobOfferType = this.props.JobOfferType;

        if (this.state.Searching || this.state.DriverRequestPackages.length === 0) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor={jobOfferType === "Fixed-Price" ? Dictionary.Requests : Dictionary.Bids} />;
        }
        else {
            const driverRequestPackages = this.state.DriverRequestPackages;

            return <section>
                <div class="table-responsive back-color-gray">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.Driver}</th>
                                <th>{Dictionary.RequestedOn}</th>
                                {jobOfferType === "Auctionable" ? <th>{Dictionary.BidPrice}</th> : null}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {driverRequestPackages.map((driverRequestPackage, index) => {
                                return <DriverRequestRow key={index}
                                    Index={index}
                                    Price={this.props.Price}
                                    TraderOnJob={this.props.TraderOnJob}
                                    DriverRequestPackage={driverRequestPackage}
                                    OnJobAssigned={this.props.OnJobAssigned} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </section>;
        }
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Requests: "الطلبات",
        Bids: "العروضات",
        Number: "رقم",
        Driver: "سائق",
        RequestedOn: "مطلوب على",
        BidPrice: "سعر العرض",
    };
}
else {
    Dictionary = {
        Requests: "Requests",
        Bids: "Bids",
        Number: "NUMBER",
        Driver: "DRIVER",
        RequestedOn: "REQUESTED ON",
        BidPrice: "BID PRICE",
    };
}

export default DriverRequestsTable;