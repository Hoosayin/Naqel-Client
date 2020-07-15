import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import BillListItem from "./BillListItem";
import { getData } from "../../DriverFunctions";

class BillsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Bills: [],
            NumberOfPaidBills: 0,
            NumberOfUnpaidBills: 0, 
            Searching: false
        }

        this.onComponentUpdated = this.onComponentUpdated.bind(this);
    }

    async componentDidMount() {
        await this.onComponentUpdated();
    }

    onComponentUpdated = async () => {
        if (sessionStorage.Token) {
            let request = {
                Token: sessionStorage.Token,
                Get: "Bills"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Bills found.") {
                    this.setState({
                        Bills: response.Bills,
                        NumberOfPaidBills: response.NumberOfPaidBills,
                        NumberOfUnpaidBills: response.NumberOfUnpaidBills,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        Bills: [],
                        NumberOfPaidBills: 0,
                        NumberOfUnpaidBills: 0,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const bills = this.state.Bills;
        const numberOfPaidBills = this.state.NumberOfPaidBills;
        const numberOfUnpaidBills = this.state.NumberOfUnpaidBills;

        return <section>
            {/* <PageHeading Heading="PAYMENTS" /> */}
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
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

            <div class="alert alert-info m-n" style={{ backgroundColor: "#333333" }}>
                <div class="row">
                    <div class="col-md-6">
                        <div className="entity-list theme-alt">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#333333", color: "#008575" }}>
                                    <span className="fas fa-thumbs-up"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Paid Bills</div>
                                    <div className="content-text-secondary">{numberOfPaidBills}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div className="entity-list theme-alt">
                            <div className="entity-list-item">
                                <div className="item-icon" style={{ backgroundColor: "#333333", color: "#008575" }}>
                                    <span className="fas fa-thumbs-down"></span>
                                </div>
                                <div className="item-content-primary">
                                    <div className="content-text-primary">Unpaid Bills</div>
                                    <div className="content-text-secondary">{numberOfUnpaidBills}</div>
                                </div>
                            </div>
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
                            Index={index} Bill={bill}
                            OnPayProofUpdated={(bill, hasPayProof) => {
                                let bills = this.state.Bills;

                                for (let billItem of bills) {
                                    if (billItem === bill) {
                                        billItem.HasPayProof = hasPayProof;
                                        break;
                                    }
                                }

                                this.setState({
                                    Bills: bills
                                });
                            }}
                            OnPayDetailsAdded={bill => {
                                let bills = this.state.Bills;
                                let numberOfPaidBills = this.state.NumberOfPaidBills;
                                let numberOfUnpaidBills = this.state.NumberOfUnpaidBills;

                                for (let billItem of bills) {
                                    if (billItem === bill) {
                                        billItem.Paid = true;
                                        billItem.HasPayDetails = true;
                                        numberOfPaidBills++;
                                        numberOfUnpaidBills--;
                                        break;
                                    }
                                }

                                this.setState({
                                    Bills: bills,
                                    NumberOfPaidBills: numberOfPaidBills,
                                    NumberOfUnpaidBills: numberOfUnpaidBills
                                });
                            }}/>;
                    })}
                </ol>}
        </section>;
    }
};

export default BillsList;