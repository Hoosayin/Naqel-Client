import React, { Component } from "react";
import ProgressRing from "../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../containers/searching/SearchingContainer";
import TraderRateListItem from "./TraderRateListItem";
import AddTraderRateDialog from "./AddTraderRateDialog";
import { getData } from "../../../AdministratorFunctions";

class TraderRatesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllTraderRates: [],
            TraderRates: [],
            SearchString: "",
            Searching: false,
            Refreshing: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TraderRates"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Trader rates found.") {
                    this.setState({
                        AllTraderRates: response.TraderRates,
                        TraderRates: response.TraderRates,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllTraderRates: [],
                        TraderRates: [],
                        Searching: false
                    });
                }
            });
        }
    };

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSearch = event => {
        event.preventDefault();

        const searchString = this.state.SearchString;

        if (searchString === "") {
            this.setState({
                TraderRates: this.state.AllTraderRates
            });

            return;
        }

        const allTraderRates = this.state.AllTraderRates;
        let filteredTraderRates = [];
        let count = 0;

        for (let traderRate of allTraderRates) {
            if (traderRate.Username.includes(searchString)) {
                filteredTraderRates[count++] = traderRate;
            }
        }

        this.setState({
            TraderRates: filteredTraderRates
        });
    }

    render() {
        const {
            TraderRates,
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
                            <div className="type-h3 color-light"><span className="fas fa-tag m-r-xxs"></span>Trader Fee Rates</div>
                            <button className="btn btn-primary"
                                data-toggle="modal"
                                data-target={`#add-trader-rate-dialog`}>Add New</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddTraderRateDialog OnOK={traderRate => {
                let traderRates = TraderRates;
                traderRates.push(traderRate);

                this.setState({
                    TraderRates: traderRates
                });
            }} />

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Fee Rates
                    {Refreshing ? <span className="m-l-xxs"><ProgressRing /></span> : null}
            </div>

            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder="Search"
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {(TraderRates.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor="fee rates" /> :
                <div class="table-responsive back-color-gray">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>NUMBER</th>
                                <th>TRADER OR BROKER</th>
                                <th>FEE RATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {TraderRates.map((traderRate, index) => {
                                return <TraderRateListItem key={index}
                                    Index={index}
                                    TraderRate={traderRate}
                                    OnTraderRateUpdated={feeRate => {
                                        let traderRates = TraderRates;

                                        for (let traderRateItem of traderRates) {
                                            if (traderRateItem === traderRate) {
                                                traderRateItem.FeeRate = feeRate;
                                                break;
                                            }
                                        }

                                        this.setState({
                                            TraderRates: traderRates
                                        });
                                    }}
                                    OnTraderRateDeleted={traderRate => {
                                        let traderRates = [];

                                        for (let traderRateItem of TraderRates) {
                                            if (traderRateItem !== traderRate) {
                                                traderRates.push(traderRateItem);
                                            }
                                        }

                                        this.setState({
                                            TraderRates: traderRates
                                        });
                                    }}/>;
                            })}
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

export default TraderRatesList;