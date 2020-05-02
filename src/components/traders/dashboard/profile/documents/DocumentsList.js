import React, { Component } from "react";
import AddIdentityCardButton from "./identityCard/AddIdentityCardButton.js";
import AddCommercialRegisterCertificateButton from "./commercialRegisterCertificate/AddCommercialRegisterCertificateButton.js";
import IdentityCardListItem from "./identityCard/IdentityCardListItem.js";
import CommercialRegisterCertificateListItem from "./commercialRegisterCertificate/CommercialRegisterCertificateListItem.js";
import { getData } from "../../../TraderFunctions";

class DocumentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddIdentityCardButton: null, 
            AddCommercialRegisterCertificateButton: null,
            IdentityCardListItem: null,
            CommercialRegisterCertificateListItem: null
        };

        this.onDocumentsUpdated = this.onDocumentsUpdated.bind(this);
    }

    componentDidMount() {
        console.log("I'm Here.. Going to update documents...");
        this.onDocumentsUpdated();
    }

    onDocumentsUpdated = () => {
        let index = 0;
        let identityCard;
        let commercialRegisterCertificate;

        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "IdentityCard"
            };

            getData(request).then(response =>
            {
                console.log(response);
                if (response.Message === "Identity card found.") {
                    identityCard = response.IdentityCard;
                }
                else {
                    identityCard = undefined;
                }

                request = {
                    Token: localStorage.Token,
                    Get: "CommercialRegisterCertificate"
                };

                getData(request).then(response => {
                    if (response.Message === "Commercial register certificate found.") {
                        commercialRegisterCertificate = response.CommercialRegisterCertificate;
                    }
                    else {
                        commercialRegisterCertificate = undefined;
                    }

                    (identityCard) ? this.setState({
                        AddIdentityCardButton: null,
                        IdentityCardListItem: <IdentityCardListItem
                            Index={++index}
                            OnDocumentsUpdated={this.onDocumentsUpdated} />
                    }) : this.setState({
                        AddIdentityCardButton: <AddIdentityCardButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
                        IdentityCardListItem: null
                    });

                    (commercialRegisterCertificate) ? this.setState({
                        AddCommercialRegisterCertificateButton: null,
                        CommercialRegisterCertificateListItem: <CommercialRegisterCertificateListItem
                            Index={++index}
                            OnDocumentsUpdated={this.onDocumentsUpdated} />
                    }) : this.setState({
                        AddCommercialRegisterCertificateButton: <AddCommercialRegisterCertificateButton OnDocumentsUpdated={this.onDocumentsUpdated} />,
                        CommercialRegisterCertificateListItem: null
                    });
                });
            });         
        }      
    }

    render() {
        return (
            <section>
                <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
                <div className="h3 back-color-gray m-n p-xxs">Documents</div>
                <div className= "text-right back-color-gray p-xxs">
                    {this.state.AddIdentityCardButton}
                    {this.state.AddCommercialRegisterCertificateButton}
                </div>
                <ol className="list-items" style={{ margin: "0px" }}>
                    {this.state.IdentityCardListItem}
                    {this.state.CommercialRegisterCertificateListItem}
                </ol>
            </section>         
        );
    }
};

export default DocumentsList;