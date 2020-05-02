import React, { Component } from "react";
import { getData } from "../../../components/traders/TraderFunctions";
import SearchingContainer from "../../searching/SearchingContainer"; 
import DrivingLicenceContainer from "./DrivingLicenceContainer";
import EntryExitCardContianer from "./EntryExitCardContainer";
import IdentityCardContainer from "./IdentityCardContainer";

class DocumentsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DriverDocuments: null,
            Searching: false,
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
                Get: "DriverDocuments",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Driver documents found.") {
                    this.setState({
                        DriverDocuments: response.DriverDocuments,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        DriverDocuments: null,
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
                Get: "DriverDocuments",
                Params: {
                    DriverID: this.props.DriverID
                }
            };

            await getData(request).then(response => {
                if (response.Message === "Driver documents found.") {
                    this.setState({
                        DriverDocuments: response.DriverDocuments
                    });
                }
                else {
                    this.setState({
                        DriverDocuments: null
                    });
                }
            });
        }
    };

    render() {
        const driverDocuments = this.state.DriverDocuments;

        return (this.state.Searching || !driverDocuments) ?
            <SearchingContainer Searching={this.state.Searching}
                SearchingFor="documents" /> :
            <section>
                <ol className="list-items m-n">
                    <IdentityCardContainer IdentityCard={driverDocuments.IdentityCard} />
                    <DrivingLicenceContainer DrivingLicence={driverDocuments.DrivingLicence} />
                    <EntryExitCardContianer EntryExitCard={driverDocuments.EntryExitCard} />
                </ol>
            </section>;
    }
};

export default DocumentsContainer;