import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import EditEntryExitCardDialog from "./EditEntryExitCardDialog.js";
import { deleteEntryExitCard } from "../../../../DriverFunctions.js";
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
    }

    onDelete = async () => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedEntryExitCard = {
            Token: localStorage.getItem("userToken")
        };

        console.log(`Going to delete Exit/Entry card.`);

        await deleteEntryExitCard(discardedEntryExitCard)
            .then(response => {
                if (response.Message === "Entry/Exit card is deleted.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnDocumentsUpdated();
                }

                this.setState({
                    Preloader: null
                });
            });
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const entryExitCard = jwt_decode(localStorage.userToken).EntryExitCard;

            if (entryExitCard) {
                this.setState({
                    EntryExitCardID: entryExitCard.EntryExitCardID,
                    EntryExitNumber: entryExitCard.EntryExitNumber,
                    Type: entryExitCard.Type,
                    ReleaseDate: entryExitCard.ReleaseDate,
                    NumberOfMonths: entryExitCard.NumberOfMonths,
                });

                return;
            }
        }

        this.setState({
            EntryExitCardID: "",
            EntryExitNumber: "",
            Type: "Simple",
            ReleaseDate: "",
            NumberOfMonths: "",
        });
    }

    render() {
        return (
            <li class="list-items-row">
                <div data-toggle="collapse" aria-expanded="false" data-target={`#entry-exit-card-${this.state.EntryExitCardID}`}>
                    <div class="row">
                        <div class="col-md-2">
                            <i class="glyph glyph-add"></i>
                            <i class="glyph glyph-remove"></i>
                            <strong>{this.props.Index}</strong>
                        </div>
                        <div class="col-md-4">
                            <img class="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src="./images/default_image.png" alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div class="col-md-6">
                            <div>
                                <span style={{ fontWeight: "bold", color: "#008575" }}>ENTRY/EXIT CARD</span>
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Entry/Exit Number:</span> {this.state.EntryExitNumber}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Licence Type:</span> {this.state.Type}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Release Date:</span> {this.state.ReleaseDate}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", color: "#404040" }}>Number of Months:</span> {this.state.NumberOfMonths}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="collapse" id={`entry-exit-card-${this.state.EntryExitCardID}`}>
                    <div class="row">
                        <div class="col-md-18 col-md-offset-2">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                src="./images/default_image.png" alt="trailer.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                        <div class="col-md-4 text-right">
                            <button
                                type="button"
                                class="btn btn-primary"
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
                                                this.props.OnDocumentsUpdated();
                                            }} />
                                    });
                                }}>
                                Edit
                                </button>
                            <button type="button" class="btn btn-danger" onClick={event => { this.onDelete(); }}>Delete</button>
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