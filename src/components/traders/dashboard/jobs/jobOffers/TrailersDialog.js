import React, { Component } from "react";

class TrailersDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const trailers = this.props.Trailers;
        let Trailers = (trailers.length > 0) ? <section>
            {trailers.map((trailer, index) => {
                return <div key={index} className="row">
                    <div className="col-md-8">
                        <div className="form-group" style={{ marginBottom: "5px", }}>
                            <img className="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={trailer.PhotoURL} alt="profile_photo.png" data-source-index="2" style={{
                                    overflow: "hidden",
                                    border: "5px solid #3A3A3C",
                                    margin: "5px"
                                }} />
                        </div>
                    </div>
                    <div className="col-md-16">
                        <div className="row">
                            <div className="col-md-24">
                                <div class="entity-list">
                                    <div class="entity-list-item">
                                        <div class="item-icon">
                                            <span class="fas fa-weight"></span>
                                        </div>
                                        <div class="item-content-primary">
                                            <div class="content-text-primary">Maximum Weight</div>
                                            <div class="content-text-secondary">{`${trailer.MaximumWeight} GVM`}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="entity-list">
                                    <div class="entity-list-item">
                                        <div class="item-icon">
                                            <span class="fas fa-cog"></span>
                                        </div>
                                        <div class="item-content-primary">
                                            <div class="content-text-primary">Trailer Type</div>
                                            <div class="content-text-secondary">{trailer.Type}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
            })}
        </section> : null;

        return <section>
            <div className="modal" id={`driver-request-trailers-dialog-${this.props.DialogID}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ padding: "0px", backgroundColor: "#FFFFFF" }}>
                        <div className="jumbotron theme-default">
                            <div className="container">
                                <div className="modal-header">
                                    <div className="type-h4" style={{ color: "#008575", paddingTop: "0px" }}>Trailers</div>
                                </div>
                                <div className="modal-body">
                                    {Trailers}
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default TrailersDialog;