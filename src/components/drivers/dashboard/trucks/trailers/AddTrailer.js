import React, { Component } from "react";
import AddTrailerDialog from "./AddTrailerDialog";

class AddTrailer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AddTrailerDialog: null
        };

        this.onAddTrailerDialogCreate = this.onAddTrailerDialogCreate.bind(this);
        this.onAddTrailerDialogRemove = this.onAddTrailerDialogRemove.bind(this);
        this.onTrailerAdded = this.onTrailerAdded.bind(this);
    }

    onAddTrailerDialogCreate = () => {
        this.setState({
            AddTrailerDialog: (<AddTrailerDialog OnAddTrailerDialogRemove={this.onAddTruckDialogRemove} OnTrailerAdded={this.onTrailerAdded} />),
        });
    }

    onAddTrailerDialogRemove = () => {
        this.setState({
            AddTrailerDialog: null,
        });
    }

    onTrailerAdded = cancelButton => {
        cancelButton.click();
        this.props.OnTruckUpdated();
    }

    render() {
        return (
            <div class="jumbotron theme-dark">
                <div class="container">
                    <div class="row">
                        <div class="col-md-24 text-center">
                            <img src="./images/trailer.png" alt="trailer.png" height="50" />
                            <h3 style={{paddingTop:"5px"}}>Trailers</h3>
                            <div class="type-sh3">Your Truck is All Set Up</div>
                            <div class="col-md-12 col-md-offset-6">
                                <div class="type-p3">
                                    RECOMMENDED: Since your truck is all set up, you're good to go for adding up to TWO trailers to it.
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#add-trailer-dialog"
                                        onMouseDown={this.onAddTrailerDialogCreate}>Add Trailer</button>
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