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
                    return <li key={index} className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                        <div className="jumbotron theme-default">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                            src={value.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                                overflow: "hidden",
                                                border: "5px solid #3A3A3C",
                                                margin: "5px"
                                            }} />
                                    </div>
                                    <div className="col-md-18">
                                        <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>{`Trailer # ${index + 1}.`}</div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="entity-list">
                                                    <div className="entity-list-item">
                                                        <div className="item-icon">
                                                            <span className="fas fa-weight"></span>
                                                        </div>
                                                        <div className="item-content-primary">
                                                            <div className="content-text-primary">Maximum Weight</div>
                                                            <div className="content-text-secondary">{`${value.MaximumWeight} GVM`}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="entity-list">
                                                    <div className="entity-list-item">
                                                        <div className="item-icon">
                                                            <span className="fas fa-star-of-life"></span>
                                                        </div>
                                                        <div className="item-content-primary">
                                                            <div className="content-text-primary">Trailer Type</div>
                                                            <div className="content-text-secondary">{value.Type}</div>
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
                                }}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={() => { this.onDelete(index); }}>Delete</button>
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