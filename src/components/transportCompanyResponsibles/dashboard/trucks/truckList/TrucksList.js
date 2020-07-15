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
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
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
            }} dir={GetDirection()}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-truck-moving m-r-xxs m-l-xxs"></span>{Dictionary.Trucks}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }} dir={GetDirection()}>{Dictionary.YourTrucks}
                    {Refreshing ? <span className="m-l-xxs m-r-xxs"><ProgressRing /></span> : null}
            </div>

            {(Trucks.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor={Dictionary.Trucks} /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Number}</th>
                                <th>{Dictionary.TruckNumber}</th>
                                <th>{Dictionary.Brand}</th>
                                <th>{Dictionary.Model}</th>
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

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = sessionStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Trucks: "الشاحنات",
        YourTrucks: "الشاحنات الخاصة بك",
        Number: "رقم",
        TruckNumber: "رقم الشاحنة",
        Brand: "العلامة التجارية",
        Model: "نموذج",
    };
}
else {
    Dictionary = {
        Trucks: "Trucks",
        YourTrucks: "Your Trucks",
        Number: "NUMBER",
        TruckNumber: "TRUCK NUMBER",
        Brand: "BRAND",
        Model: "MODEL",
    };
}

export default TrucksList;