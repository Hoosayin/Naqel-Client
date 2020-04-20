import React, { Component } from "react";
import EditEntryExitCardDialog from "./EditEntryExitCardDialog.js";
import { getData, deleteEntryExitCard } from "../../../../DriverFunctions.js";
import Preloader from "../../../../../../controls/Preloader.js";

class EntryExitCardListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            EntryExitCardID: "",
            EntryExitNumber: "",
            Type: "Simple",
            ReleaseDate: "",
            NumberOfMonths: "",

            EditEntryExitCardDialog: null,
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    onDelete = async () => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedEntryExitCard = {
            Token: localStorage.Token
        };

        console.log(`Going to delete Exit/Entry card.`);

        await deleteEntryExitCard(discardedEntryExitCard).then(response => {
            if (response.Message === "Entry/Exit card is deleted.") {
                this.props.OnDocumentsUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    componentDidMount() {
        this.onComponentUpdated();
    }

    onComponentUpdated = () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "EntryExitCard"
            };

            getData(request).then(response => {
                if (response.Message === "Entry/exit card found.") {
                    let entryExitCard = response.EntryExitCard;

                    this.setState({
                        EntryExitCardID: entryExitCard.EntryExitCardID,
                        EntryExitNumber: entryExitCard.EntryExitNumber,
                        Type: entryExitCard.Type,
                        ReleaseDate: entryExitCard.ReleaseDate,
                        NumberOfMonths: entryExitCard.NumberOfMonths,
                    });
                }
                else {
                    this.setState({
                        EntryExitCardID: "",
                        EntryExitNumber: "",
                        Type: "Simple",
                        ReleaseDate: "",
                        NumberOfMonths: "",
                    });
                }
            });
        }
    };

    render() {
        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            <div data-toggle="collapse" aria-expanded="false" data-target={`#entry-exit-card-${this.state.EntryExitCardID}`}>
                <div className="entity-list">
                    <div className="entity-list-item">
                        <div className="item-icon" style={{ borderRadius: "50%" }}>
                            <span className="glyph glyph-add"></span>
                            <span className="glyph glyph-remove"></span>
                        </div>
                        <div className="item-content-primary">
                            <div className="content-text-primary">
                                <span style={{ fontWeight: "bold", color: "#008575" }}>{`${this.props.Index}.`}</span>
                            </div>
                            <div className="content-text-secondary">
                                <span style={{ fontWeight: "bold", color: "#008575" }}>ENTRY/EXIT CARD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="collapse" id={`entry-exit-card-${this.state.EntryExitCardID}`}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Entry/Exit Card</div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-hashtag"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Entry/Exit Number</div>
                                                    <div className="content-text-secondary">{this.state.EntryExitNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-star-of-life"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Entry/Exit Type</div>
                                                    <div className="content-text-secondary">{this.state.Type}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-calendar"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Release Date</div>
                                                    <div className="content-text-secondary">{this.state.ReleaseDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="entity-list">
                                            <div className="entity-list-item">
                                                <div className="item-icon">
                                                    <span className="fas fa-calendar"></span>
                                                </div>
                                                <div className="item-content-primary">
                                                    <div className="content-text-primary">Number of Months</div>
                                                    <div className="content-text-secondary">{this.state.NumberOfMonths}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#E5E5E5", textAlign: "right", padding: "10px" }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#edit-entry-exit-card-dialog"
                        onMouseDown={() => {
                            this.setState({
                                EditEntryExitCardDialog: <EditEntryExitCardDialog
                                    OnCancel={() => {
                                        this.setState({
                                            EditEntryExitCardDialog: null
                                        });
                                    }}
                                    OnOK={cancelButton => {
                                        cancelButton.click();
                                        this.onComponentUpdated();
                                    }} />
                            });
                        }}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(); }}>Delete</button>
                </div>
            </div>
            {this.state.Preloader}
            {this.state.EditEntryExitCardDialog}
        </li>;
    }
};

export default EntryExitCardListItem;