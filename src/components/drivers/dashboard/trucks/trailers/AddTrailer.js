import React, { Component } from "react";
import AddTrailerDialog from "./AddTrailerDialog";

class AddTrailer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddTrailerDialog: null
        };
    }

    render() {
        return (
            <div className="jumbotron theme-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-24 text-center">
                            <img src="./images/trailer.png" alt="trailer.png" height="50" />
                            <h3 style={{paddingTop:"5px"}}>Trailers</h3>
                            <div className="type-sh3">Your Truck is All Set Up</div>
                            <div className="col-md-12 col-md-offset-6">
                                <div className="type-p3">
                                    RECOMMENDED: Since your truck is all set up, you're good to go for adding up to TWO trailers to it.
                                </div>
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ minWidth: "152px" }}
                                        data-toggle="modal"
                                        data-target="#add-trailer-dialog"
                                        onMouseDown={() => {
                                            this.setState({
                                                AddTrailerDialog: <AddTrailerDialog
                                                    OnCancel={() => {
                                                        this.setState({
                                                            AddTrailerDialog: null
                                                        });
                                                    }}
                                                    OnOK={cancelButton => {
                                                        cancelButton.click();
                                                        this.props.OnTrailerAdded();
                                                    }} />
                                            });
                                        }}>
                                        <span className="fas fa-plus" aria-hidden="true"></span>Add Trailer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.AddTrailerDialog}
            </div>           
        );
    }
};

export default AddTrailer;