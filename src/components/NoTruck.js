import React, { Component } from "react";
import AddTruck from "./AddTruck";

class NoTruck extends Component {
    constructor() {
        super();

        this.state = {
            AddTruck: null,
        };

        this.onAddTruckDialogCreate = this.onAddTruckDialogCreate.bind(this);
        this.onAddTruckDialogRemove = this.onAddTruckDialogRemove.bind(this);
    }

    onAddTruckDialogRemove = () => {
        this.setState({
            AddTruck: null,
        });
    }

    onAddTruckDialogCreate = () => {
        this.setState({
            AddTruck: (<AddTruck Show={true} OnAddTruckDialogRemove={this.onAddTruckDialogRemove} />),
        });
    }

    render() {
        return (
            <div>
                <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block" alt="add_truck.png" src="./images/add_truck.png"
                                    data-source-index="2" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3">Truck Management</div>
                                <div class="type-sh3">You have not added any truck yet.</div>
                                <p>Adding your truck will let the Traders or Brokers see details about your truck. Valid and complete details of your truck make more chances for you to receive job requests.</p>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#add-truck-dialog"
                                        onMouseDown={this.onAddTruckDialogCreate}>Add Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.AddTruck}
            </div>
        );
    }
};

export default NoTruck;