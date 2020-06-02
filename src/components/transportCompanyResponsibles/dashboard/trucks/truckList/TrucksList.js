import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import TruckListItem from "./TruckListItem";
import { getData } from "../../../TransportCompanyResponsiblesFunctions";

class TrucksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Trucks: [],
            Searching: false,
            Refreshing: false
        };

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Trucks"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Trucks found.") {
                    this.setState({
                        Trucks: response.Trucks,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        Trucks: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            Trucks,
            SearchString,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-truck-moving m-r-xxs"></span>Trucks</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Your Trucks
                    {Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>

            {(Trucks.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor="trucks" /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>NUMBER</th>
                                <th>TRUCK NUMBER</th>
                                <th>BRAND</th>
                                <th>MODEL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Trucks.map((truck, index) => {
                                return <TruckListItem key={index}
                                    Index={index}
                                    Truck={truck} />;
                            })}
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

export default TrucksList;