import React, { Component } from "react";
import AddDrivingLicenceButton from "./drivingLicence/AddDrivingLicenceButton.js";
import AddEntryExitCardButton from "./entryExitCard/AddEntryExitCardButton.js";
import AddIdentityCardButton from "./identityCard/AddIdentityCardButton.js";
import DrivingLicenceListItem from "./drivingLicence/DrivingLicenceListItem.js"; 
import EntryExitCardListItem from "./entryExitCard/EntryExitCardListItem.js";
import IdentityCardListItem from "./identityCard/IdentityCardListItem.js";
import { getData } from "../../../DriverFunctions";

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
        let index = 0;
        let drivingLicence;
        let entryExitCard;
        let identityCard;

        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "DrivingLicence"
            };

            getData(request).then(response => {
                if (response.Message === "Driving licence found.") {
                    drivingLicence = response.DrivingLicence;
                }
                else {
                    drivingLicence = undefined;
                }

                request = {
                    Token: localStorage.Token,
                    Get: "EntryExitCard"
                };

                getData(request).then(response => {
                    if (response.Message === "Entry/exit card found.") {
                        entryExitCard = response.EntryExitCard;
                    }
                    else {
                        entryExitCard = undefined;
                    }

                    request = {
                        Token: localStorage.Token,
                        Get: "IdentityCard"
                    };

                    getData(request).then(response => {
                        if (response.Message === "Identity card found.") {
                            identityCard = response.IdentityCard;
                        }
                        else {
                            identityCard = undefined;
                        }

                        (drivingLicence) ? this.setState({
                            AddDrivingLicenceButton: null,
                            DrivingLicenceListItem: <DrivingLicenceListItem
                                Index={++index}
                                OnDocumentsUpdated={this.onDocumentsUpdated} />
                        }) : this.setState({
                            AddDrivingLicenceButton: <AddDrivingLicenceButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
                            DrivingLicenceListItem: null
                        });

                        (entryExitCard) ? this.setState({
                            AddEntryExitCardButton: null,
                            EntryExitCardListItem: <EntryExitCardListItem
                                Index={++index}
                                OnDocumentsUpdated={this.onDocumentsUpdated} />
                        }) : this.setState({
                            AddEntryExitCardButton: <AddEntryExitCardButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
                            EntryExitCardListItem: null
                        });

                        (identityCard) ? this.setState({
                            AddIdentityCardButton: null,
                            IdentityCardListItem: <IdentityCardListItem
                                Index={++index}
                                OnDocumentsUpdated={this.onDocumentsUpdated} />
                        }) : this.setState({
                            AddIdentityCardButton: <AddIdentityCardButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
                            IdentityCardListItem: null
                        });
                    });
                });
            });
        }
    }

    render() {
        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Documents</div>
                <div style={{ padding: "10px", backgroundColor: "#E5E5E5" }}>
                    <div className="row">
                        <div className="col-md-18 col-md-offset-2"></div>
                        <div className="col-md-4 text-right">
                            {this.state.AddDrivingLicenceButton}
                            {this.state.AddEntryExitCardButton}
                            {this.state.AddIdentityCardButton}
                        </div>
                    </div>
                </div>
                <ol className="list-items" style={{ marginTop: "0px" }}>
                    {this.state.DrivingLicenceListItem}
                    {this.state.EntryExitCardListItem}
                    {this.state.IdentityCardListItem}
                </ol>
            </section>         
        );
    }
};

export default DocumentsList;