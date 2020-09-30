import React, { Component } from "react";
import PageHeading from "../../../../controls/PageHeading";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import BillListItem from "./BillListItem";
import { getData } from "../../TraderFunctions";

class BillsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllBills: [],
            Bills: [],
            NumberOfPaidBills: 0,
            NumberOfUnpaidBills: 0,
            CanRequestSpecialBills: false,
            Searching: false,
            ShowingPaidBills: false,
        }

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
                Get: "Bills"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Bills found.") {
                    this.setState({
                        AllBills: response.Bills,
                        Bills: response.Bills,
                        NumberOfPaidBills: response.NumberOfPaidBills,
                        NumberOfUnpaidBills: response.NumberOfUnpaidBills,
                        CanRequestSpecialBills: response.CanRequestSpecialBills,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllBills: [],
                        Bills: [],
                        NumberOfPaidBills: 0,
                        NumberOfUnpaidBills: 0,
                        CanRequestSpecialBills: false,
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

        this.setState({
            ShowingPaidBills: false,
        });

        if (this.state.SearchString === "") {
            this.setState({
                Bills: this.state.AllBills
            });

            return;
        }

        const allBills = this.state.AllBills;
        let filteredBills = [];
        let count = 0;

        for (let bill of allBills) {
            if (bill.BillNumber.includes(this.state.SearchString)) {
                filteredBills[count++] = bill;
            }
        }

        this.setState({
            Bills: filteredBills
        });
    }

    render() {
        const bills = this.state.Bills;
        const numberOfPaidBills = this.state.NumberOfPaidBills;
        const numberOfUnpaidBills = this.state.NumberOfUnpaidBills;
        const canRequestSpecialBills = this.state.CanRequestSpecialBills;

        return <section>
            {/* <PageHeading Heading="PAYMENTS" /> */}
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

            <nav className="navbar navbar-default" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="navbar-global theme-default" style={{ backgroundColor: "#E5E5E5;" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>

                        <button className={this.state.ShowingPaidBills ? "btn btn-secondary" : "btn btn-primary"}
                        onClick={() => {
                            if (this.state.ShowingPaidBills) {
                                this.setState({
                                    Bills: this.state.AllBills,
                                    ShowingPaidBills: false,
                                });
                            } else {
                                let allBills = this.state.AllBills;
                                let filteredBills = [];
                                let count = 0;
                            
                                for (let bill of allBills) {
                                    if (bill.Paid) {
                                        filteredBills[count++] = bill;
                                    }
                                }

                                this.setState({
                                    Bills: filteredBills,
                                    ShowingPaidBills: true,
                                });
                            }
                        }}>{this.state.ShowingPaidBills ? "Show All Bills" : "Filter Paid Bills"}</button>

                        <form noValidate onSubmit={this.onSearch} className="navbar-form navbar-right" role="search">
                            <div className="putbox" style={{ margin: "0px" }}>
                                <div className="form-group">
                                    <input type="search" name="SearchString" className="form-control" placeholder="Search by Bill Number"
                                        style={{ maxWidth: "500px", width: "100%" }}
                                        value={this.state.SearchString} onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-default form-control" style={{ width: "34px" }}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            {(bills.length === 0) ?
                <SearchingContainer Searching={this.state.Searching}
                    SearchingFor="bills" /> :
                <ol className="list-items m-n">
                    {bills.map((bill, index) => {
                        return <BillListItem key={index}
                            Index={index} Bill={bill}
                            CanRequestSpecialBills={canRequestSpecialBills}
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
                            }}
                            OnSpecialBillRequested={(bill, specialBill) => {
                                let bills = this.state.Bills;

                                for (let billItem of bills) {
                                    if (billItem === bill) {
                                        billItem.SpecialTraderBill = specialBill;
                                        break;
                                    }
                                }

                                this.setState({
                                    Bills: bills
                                });
                            }} />;
                    })}
                </ol>}
        </section>;
    }
};

export default BillsList;