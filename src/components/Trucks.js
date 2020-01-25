import React, { Component } from "react";

class Trucks extends Component {
    render() {
        return (
            <div>
                <div style={{ padding: "20px", backgroundColor: "#175D76", }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <img src="./images/trucks.png" height="60" />
                                <div class="type-h3" style={{ paddingTop: "10px", color: "white", }}>
                                    Truck
                                    </div>
                                <div class="type-sh3" style={{ color: "white", }}>
                                    Manage Your Truck
                                    </div>
                                <div class="btn-group">
                                    <a class="btn btn-primary">Add New</a>
                                    <a class="btn btn-primary">Edit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Trucks;