import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import AddDrivingLicenceButton from "./drivingLicence/AddDrivingLicenceButton.js";
import AddEntryExitCardButton from "./entryExitCard/AddEntryExitCardButton.js";
import AddIdentityCardButton from "./identityCard/AddIdentityCardButton.js";
import DrivingLicenceListItem from "./drivingLicence/DrivingLicenceListItem.js"; 
import EntryExitCardListItem from "./entryExitCard/EntryExitCardListItem.js";
import IdentityCardListItem from "./identityCard/IdentityCardListItem.js";

class DocumentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddDrivingLicenceButton: null,
            AddEntryExitCardButton: null,
            AddIdentityCardButton: null, 
            DrivingLicenceListItem: null,
            EntryExitCardListItem: null,
            IdentityCardListItem: null,
        };

        this.onDocumentsUpdated = this.onDocumentsUpdated.bind(this);
    }

    componentDidMount() {
        this.onDocumentsUpdated();
    }

    onDocumentsUpdated = () => {
        const driver = jwt_decode(localStorage.userToken);
        let index = 0;

        (driver.DrivingLicence) ? this.setState({
            AddDrivingLicenceButton: null,
            DrivingLicenceListItem: <DrivingLicenceListItem
                Index={++index}
                OnDocumentsUpdated={this.onDocumentsUpdated} />
        }) : this.setState({
            AddDrivingLicenceButton: <AddDrivingLicenceButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
            DrivingLicenceListItem: null
        });

        (driver.EntryExitCard) ? this.setState({
            AddEntryExitCardButton: null,
            EntryExitCardListItem: <EntryExitCardListItem
                Index={++index}
                OnDocumentsUpdated={this.onDocumentsUpdated} />
        }) : this.setState({
            AddEntryExitCardButton: <AddEntryExitCardButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
            EntryExitCardListItem: null
        });

        (driver.IdentityCard) ? this.setState({
            AddIdentityCardButton: null,
            IdentityCardListItem: <IdentityCardListItem
                Index={++index}
                OnDocumentsUpdated={this.onDocumentsUpdated} />
        }) : this.setState({
            AddIdentityCardButton: <AddIdentityCardButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
            IdentityCardListItem: null
        });
    }

    render() {
        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Documents</div>
                <div style={{ padding: "10px", backgroundColor: "#E5E5E5" }}>
                    <div class="row">
                        <div class="col-md-18 col-md-offset-2"></div>
                        <div class="col-md-4 text-right">
                            {this.state.AddDrivingLicenceButton}
                            {this.state.AddEntryExitCardButton}
                            {this.state.AddIdentityCardButton}
                        </div>
                    </div>
                </div>
                <ol class="list-items" style={{ margin: "0px" }}>
                    {this.state.DrivingLicenceListItem}
                    {this.state.EntryExitCardListItem}
                    {this.state.IdentityCardListItem}
                </ol>
            </section>         
        );
    }
};

export default DocumentsList;