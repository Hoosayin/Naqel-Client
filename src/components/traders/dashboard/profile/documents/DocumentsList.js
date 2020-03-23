import React, { Component } from "react";
import AddIdentityCardButton from "./identityCard/AddIdentityCardButton.js";
import IdentityCardListItem from "./identityCard/IdentityCardListItem.js";
import { getData } from "../../../TraderFunctions";

class DocumentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddIdentityCardButton: null, 
            IdentityCardListItem: null,
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

        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "IdentityCard"
            };

            getData(request).then(response =>
            {
                if (response.Message === "Identity card found.") {
                    identityCard = response.IdentityCard;
                }
                else {
                    identityCard = undefined;
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
                            {this.state.AddIdentityCardButton}
                        </div>
                    </div>
                </div>
                <ol className="list-items" style={{ margin: "0px" }}>
                    {this.state.IdentityCardListItem}
                </ol>
            </section>         
        );
    }
};

export default DocumentsList;