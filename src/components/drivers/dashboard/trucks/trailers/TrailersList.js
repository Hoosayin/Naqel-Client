import React, { Component } from "react";
import { deleteTrailer } from "../../../DriverFunctions.js";
import EditTrailerDialog from "./EditTrailerDialog.js";
import Preloader from "../../../../../controls/Preloader.js";

class TrailersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Trailers: this.props.Trailers,
            EditTrailerDialogs: [],
            Preloader: null
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async index => {
        this.setState({
            Preloader: <Preloader />
        });

        const discardedTrailer = {
            Token: localStorage.Token,
            TrailerID: this.state.Trailers[index].TrailerID 
        };

        console.log(`Going to delete Trailers[${index}]...`);

        await deleteTrailer(discardedTrailer).then(response => {
            if (response.Message === "Trailer is deleted.") {
                this.props.OnTrailersUpdated();
            }

            this.setState({
                Preloader: null
            });
        });
    }

    render() {
        return <section>
            <div className="h3" style={{ margin: "0px", padding: "10px", backgroundColor: "#EFEFEF", }}>Trailers</div>
            <ol className="list-items" style={{ margin: "0px" }}>
                {this.state.Trailers.map((value, index) => {
                    return <li key={index} className="list-items-row">
                        <div data-toggle="collapse" aria-expanded="false" data-target={`#${value.TrailerID}`}>
                            <div className="row">
                                <div className="col-md-2">
                                    <i className="glyph glyph-add"></i>
                                    <i className="glyph glyph-remove"></i>
                                    <strong>{index + 1}</strong>
                                </div>
                                <div className="col-md-4">
                                    <img className="img-responsive visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                        src={value.PhotoURL} alt="trailer.png" data-source-index="2" style={{
                                            overflow: "hidden",
                                            border: "5px solid #3A3A3C",
                                            margin: "5px"
                                        }} />
                                </div>
                                <div className="col-md-6">
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-weight" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Maximum Weight (GVM):</span> {value.MaximumWeight}
                                    </div>
                                    <div style={{ padding: "3px 0px 3px 0px" }}>
                                        <span className="fas fa-star-of-life" style={{ color: "#606060" }}></span>
                                        <span style={{ fontWeight: "bold", color: "#606060" }}>Trailer Type:</span> {value.Type}
                                    </div>
                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                        </div>

                        <div className="collapse" id={value.TrailerID}>
                            <div className="row">
                                <div className="col-md-18 col-md-offset-2">
                                    <img className="img-responsive visible-xs-inline-block visible-sm-inline-block"
                                        src={value.PhotoURL} alt="trailer.png" data-source-index="2" style={{
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
                                        data-target={`#edit-trailer-dialog${index}`}
                                        onMouseDown={() => {
                                            let editTrailerDialogs = this.state.EditTrailerDialogs;

                                            editTrailerDialogs[index] = <EditTrailerDialog
                                                dialogID={index}
                                                Trailer={value}
                                                OnCancel={() => {
                                                    let editTrailerDialogs = this.state.EditTrailerDialogs
                                                    editTrailerDialogs[index] = null;

                                                    this.setState({
                                                        EditTrailerDialogs: editTrailerDialogs,
                                                    });

                                                }}
                                                OnOK={cancelButton => {
                                                    cancelButton.click();
                                                    this.props.OnTrailersUpdated();
                                                }} />;

                                            this.setState({
                                                EditTrailerDialogs: editTrailerDialogs,
                                            });
                                        }}>
                                        Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
                                </div>
                            </div>
                        </div>
                        {this.state.EditTrailerDialogs[index]}
                    </li>
                })}
            </ol>
            {this.state.Preloader}
        </section>;
    }
};

export default TrailersList;