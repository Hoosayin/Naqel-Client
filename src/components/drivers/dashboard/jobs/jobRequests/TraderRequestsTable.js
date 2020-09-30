import React, { Component } from "react";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import TraderRequestRow from "./TraderRequestRow";
import { getData } from "../../../DriverFunctions";

class TraderRequestsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            TraderRequestPackages: [],
            RequestSelected: false,
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
                Get: "TraderRequestPackages",
                Params: {
                    JobRequestID: this.props.JobRequestID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Trader request packages found.") {
                    this.props.OnRequestsFound(response.TraderRequestPackages.length);

                    this.setState({
                        TraderRequestPackages: response.TraderRequestPackages,
                        RequestSelected: response.RequestSelected,
                        Searching: false
                    });
                }
                else {
                    this.props.OnRequestsFound(0);
                    this.setState({
                        TraderRequestPackages: [],
                        RequestSelected: false,
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
                Get: "TraderRequestPackages",
                Params: {
                    JobRequestID: this.props.JobRequestID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Trader request packages found.") {
                    this.props.OnRequestsFound(response.TraderRequestPackages.length);

                    this.setState({
                        TraderRequestPackages: response.TraderRequestPackages,
                        RequestSelected: response.RequestSelected
                    });
                }
                else {
                    this.props.OnRequestsFound(0);

                    this.setState({
                        TraderRequestPackages: [],
                        RequestSelected: false,
                    });
                }
            });
        }
    };

    render() {
        if (this.state.Searching || this.state.TraderRequestPackages.length === 0) {
            return <SearchingContainer Searching={this.state.Searching}
                SearchingFor={Dictionary.Requests} />;
        }
        else {
            const traderRequestPackages = this.state.TraderRequestPackages;
            const requestSelected = this.state.RequestSelected;

            return <section>
                <div class="table-responsive back-color-gray">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.Trader}</th>
                                <th>{Dictionary.RequestedOn}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {traderRequestPackages.map((traderRequestPackage, index) => {
                                return <TraderRequestRow key={index}
                                    Index={index}
                                    TraderRequestPackage={traderRequestPackage}
                                    RequestSelected={requestSelected}
                                    OnTraderRequestUpdated={this.onComponentUpdated} />;
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
        Number: "رقم",
        Trader: "تاجر",
        RequestedOn: "مطلوب على",
        Requests: "الطلبات"
    };
}
else {
    Dictionary = {
        Number: "NUMBER",
        Trader: "TRADER",
        RequestedOn: "REQUESTED ON",
        Requests: "Requests"
    };
}

export default TraderRequestsTable;