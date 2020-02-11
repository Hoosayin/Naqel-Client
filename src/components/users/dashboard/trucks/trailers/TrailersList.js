import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { deleteTrailer } from "../../../DriverFunctions.js";
import EditTrailerDialog from "./EditTrailerDialog.js";
import Preloader from "../../../../../controls/Preloader.js";

class TrailersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Trailers: [],
            EditTrailerDialogs: [],
            Preloader: null,
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedTrailer = {
            Token: localStorage.getItem("userToken"),
            TrailerID: this.state.Trailers[index].TrailerID 
        };

        console.log(`Going to delete Trailers[${index}]`);

        await deleteTrailer(discardedTrailer)
            .then(response => {
                if (response.Message === "Trailer is deleted.") {
                    localStorage.setItem("userToken", response.Token);
                    this.props.OnTrailersUpdated();
                }

                this.setState({
                    Preloader: null
                });
            });
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const trailers = jwt_decode(localStorage.userToken).Truck.Trailers;
            console.log(trailers);

            this.setState({
                Trailers: trailers
            });
        }
        else {
            this.setState({
                Trailers: []
            });
        }
    }

    render() {
        return (
            <section>
                <div class="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Trailers</div>
                <ol class="list-items" style={{ margin: "0px" }}>
                    {this.state.Trailers.map((value, index) => {
                        return <li class="list-items-row">
                            <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.TrailerID}`}>
                                <div class="row">
                                    <div class="col-md-2">
                                        <i class="glyph glyph-add"></i>
                                        <i class="glyph glyph-remove"></i>
                                        <strong>{index + 1}</strong>
                                    </div>
                                    <div class="col-md-4">
                                        <img class="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                            src={value.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                                overflow: "hidden",
                                                border: "5px solid #3A3A3C",
                                                margin: "5px"
                                            }} />
                                    </div>
                                    <div class="col-md-6">
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Maximum Weight (GVM):</span> {value.MaximumWeight}
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: "bold", color: "#404040" }}>Trailer Type:</span> {value.Type}
                                        </div>                                      
                                    </div>
                                    <div class="col-md-6">
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="collapse" id={value.TrailerID}>
                                <div class="row">
                                    <div class="col-md-18 col-md-offset-2">
                                        <img class="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                            src={value.PhotoURL} alt="trailer.png" data-source-index="2" style={{
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
                                            data-target={`#edit-trailer-dialog${index}`}
                                            onMouseDown={() => {
                                                let editTrailerDialogs = this.state.EditTrailerDialogs;

                                                editTrailerDialogs[index] = (<EditTrailerDialog dialogID={index}
                                                    Trailer={value} OnEditTrailerDialogRemove={() => {
                                                        let editTrailerDialogs = this.state.EditTrailerDialogs
                                                        editTrailerDialogs[index] = null;

                                                        this.setState({
                                                            EditTrailerDialogs: editTrailerDialogs,
                                                        });

                                                    }} OnTrailerUpdated={cancelButton => {
                                                        cancelButton.click();
                                                        this.props.OnTrailersUpdated();
                                                    }} />);

                                                this.setState({
                                                    EditTrailerDialogs: editTrailerDialogs,
                                                });
                                            }}>
                                            Edit
                                            </button>
                                        <button type="button" class="btn btn-danger" onClick={event => { this.onDelete(index); }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            {this.state.EditTrailerDialogs[index]}
                        </li>
                    })}
                </ol>
                {this.state.Preloader}
            </section>         
        );
    }
};

export default TrailersList;