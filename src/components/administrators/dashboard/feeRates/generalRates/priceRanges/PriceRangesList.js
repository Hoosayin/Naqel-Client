import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import PriceRangeListItem from "./PriceRangeListItem";
import AddPriceRangeDialog from "./AddPriceRangeDialog";
import { getData } from "../../../../AdministratorFunctions";

class PriceRangesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PriceRanges: [],
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
                Get: "PriceRanges"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Price ranges found.") {
                    this.setState({
                        PriceRanges: response.PriceRanges,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        PriceRanges: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            PriceRanges,
            Searching,
            Refreshing
        } = this.state;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Price Ranges
                    {Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>

            <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                <button className="btn btn-primary"
                    data-toggle="modal"
                    data-target={`#add-price-range-dialog`}>Add New Range</button>
            </div>

            <AddPriceRangeDialog OnOK={priceRange => {
                let priceRanges = PriceRanges;
                priceRanges.push(priceRange);

                this.setState({
                    PriceRanges: priceRanges
                });
            }} />

            {(PriceRanges.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor="price ranges" /> :
                <div class="table-responsive back-color-gray">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>NUMBER</th>
                                <th>STARTING PRICE</th>
                                <th>ENDING PRICE</th>
                                <th>FEE RATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {PriceRanges.map((priceRange, index) => {
                                return <PriceRangeListItem key={index}
                                    Index={index}
                                    PriceRange={priceRange}
                                    OnPriceRangeUpdated={feeRate => {
                                        let priceRanges = PriceRanges;

                                        for (let priceRangeItem of priceRanges) {
                                            if (priceRangeItem === priceRange) {
                                                priceRange.FeeRate = feeRate;
                                                break;
                                            }
                                        }

                                        this.setState({
                                            PriceRanges: priceRanges
                                        });
                                    }}
                                    OnPriceRangeDeleted={priceRange => {
                                        let priceRanges = [];

                                        for (let priceRangeItem of PriceRanges) {
                                            if (priceRangeItem !== priceRange) {
                                                priceRanges.push(priceRangeItem);
                                            }
                                        }

                                        this.setState({
                                            PriceRanges: priceRanges
                                        });
                                    }} />;
                            })}
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

export default PriceRangesList;