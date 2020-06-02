import React, { Component } from "react";
import ProgressRing from "../../../../../../controls/ProgressRing";
import SearchingContainer from "../../../../../../containers/searching/SearchingContainer";
import DriversBillListItem from "./DriversBillListItem";
import { getData } from "../../../../AdministratorFunctions";

class DriversBillsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AllBills: [],
            Bills: [],
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
                Get: "DriversBills"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Bills found.") {
                    this.setState({
                        AllBills: response.Bills,
                        Bills: response.Bills,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AllBills: [],
                        Bills: [],
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
                Bills: this.state.AllBills
            });

            return;
        }

        const allBills = this.state.AllBills;
        let filteredBills = [];
        let count = 0;

        for (let bill of allBills) {
            if (bill.BillNumber.includes(searchString)) {
                filteredBills[count++] = bill;
            }
        }

        this.setState({
            Bills: filteredBills
        });
    }

    render() {
        const {
            Bills,
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
                            <div className="type-h3 color-light"><span className="fas fa-money-bill-wave m-r-xxs"></span>Drivers' Bills</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            <div className="h3 m-n p-xxs" style={{ backgroundColor: "#EFEFEF", }}>Bills
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

            {(Bills.length === 0) ?
                <SearchingContainer Searching={Searching} SearchingFor="bills" /> :
                <div class="table-responsive back-color-gray" style={{ height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>BILL NUMBER</th>
                                <th>PAID?</th>
                                <th>PAYEE</th>
                                <th>AMOUNT</th>
                                <th>GENERATED ON</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Bills.map((bill, index) => {
                                return <DriversBillListItem key={index}
                                    Index={index}
                                    Bill={bill}
                                    OnPayProofApproved={bill => {
                                        let bills = Bills;

                                        for (let billItem of bills) {
                                            if (billItem === bill) {
                                                billItem.Paid = true;
                                                billItem.DriverPayProof.Approved = true;
                                                break;
                                            }
                                        }

                                        this.setState({
                                            Bills: bills
                                        });
                                    }} />;
                            })}
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

export default DriversBillsList;