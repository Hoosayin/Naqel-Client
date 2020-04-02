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
        return (
            <li className="list-items-row">
                <div data-toggle="collapse" aria-expanded="false" data-target={`#entry-exit-card-${this.state.EntryExitCardID}`}>
                    <div className="row">
                        <div className="col-md-2">
                            <i className="glyph glyph-add"></i>
                            <i className="glyph glyph-remove"></i>
                            <strong>{this.props.Index}</strong>
                        </div>
                        <div className="col-md-4">
                            <img className="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src="./images/default_image.png" alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div className="col-md-6">
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span style={{ fontWeight: "bold", color: "#008575" }}>ENTRY/EXIT CARD</span>
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-hashtag" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Entry/Exit Number:</span> {this.state.EntryExitNumber}
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-star-of-life" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Licence Type:</span> {this.state.Type}
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-calendar" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Release Date:</span> {this.state.ReleaseDate}
                            </div>
                            <div style={{ padding: "3px 0px 3px 0px" }}>
                                <span className="fas fa-calendar" style={{ color: "#606060" }}></span>
                                <span style={{ fontWeight: "bold", color: "#606060" }}>Number of Months:</span> {this.state.NumberOfMonths}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="collapse" id={`entry-exit-card-${this.state.EntryExitCardID}`}>
                    <div className="row">
                        <div className="col-md-18 col-md-offset-2">
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                src="./images/default_image.png" alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div className="col-md-4 text-right">
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
                                }}>
                                Edit
                                </button>
                            <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(); }}>Delete</button>
                        </div>
                    </div>
                </div>               
                {this.state.Preloader}
                {this.state.EditEntryExitCardDialog}
            </li>        
        );
    }
};

export default EntryExitCardListItem;