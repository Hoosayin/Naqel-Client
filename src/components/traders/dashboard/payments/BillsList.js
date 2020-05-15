import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import BillListItem from "./BillListItem";
import { getData } from "../../TraderFunctions";

class BillsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Bills: [],
            Searching: false
        }

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "Bills"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Bills found.") {
                    this.setState({
                        Bills: response.Bills,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        Bills: [],
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const bills = this.state.Bills;

        return <section>
            <PageHeading Heading="PAYMENTS" />
            <div class="page-header" style={{
                backgroundImage: "url(/images/teal.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }}>
                <div class="container" style={{ paddingBottom: "10px", marginBottom: "12px" }}>
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-money-bill-wave m-r-xs"></span>Payments</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Your Bills</div>

            {(bills.length === 0) ?
                <SearchingContainer Searching={this.state.Searching}
                    SearchingFor="bills" /> :
                <ol className="list-items m-n">
                    {bills.map((bill, index) => {
                        return <BillListItem key={index}
                            Index={index} Bill={bill} />;
                    })}
                </ol>}
        </section>;
    }
};

export default BillsList;