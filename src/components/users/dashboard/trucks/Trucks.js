import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Truck from "./Truck";
import NoTruck from "./NoTruck";

class Trucks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Truck: <NoTruck OnTruckUpdated={this.onTruckUpdated} />
        };

        this.onTruckUpdated = this.onTruckUpdated.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const driver = jwt_decode(localStorage.userToken);

            if (driver.Truck) {
                this.setState({
                    Truck: <Truck OnTruckUpdated={this.onTruckUpdated} />
                });
            }
        }
    }

    onTruckUpdated = () => {
        const driver = jwt_decode(localStorage.userToken);

        if (driver.Truck) {
            this.setState({
                Truck: null
            });
            this.setState({
                Truck: <Truck OnTruckUpdated={this.onTruckUpdated} />
            });
        }
        else {
            this.setState({
                Truck: null
            });
            this.setState({
                Truck: <NoTruck OnTruckUpdated={this.onTruckUpdated} />
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.Truck}
            </div>
        );
    }
};

export default Trucks;