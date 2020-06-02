import React, { Component } from "react";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import { getData } from "../../TraderFunctions";

class Bill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            BillData: null,
            Searching: false
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
                Get: "BillData"
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Bill data found.") {
                    this.setState({
                        BillData: response.BillData,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        BillData: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const billData = this.state.BillData;
        const searching = this.state.Searching;
        

        if (searching || !billData) {
            return <SearchingContainer Searching={searching}
                SearchingFor="bill data" />;
        }
        else {
            const bill = this.props.Bill;

            return <section>
                <div className="jumbotron theme-default back-color-light">
                    <div className="container">
                        <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs"></span>NAQEL</div>

                        <div className="p-t-xxs">
                            <div className="type-t9">123 Naqel Street</div>
                            <div className="type-t9">Wah, Punjab, Pakistan.</div>
                            <div className="type-t9">ZIP 47000</div>
                        </div>

                        <div className="p-t-xxs">
                            <div className="type-t9">+92 318 5037972</div>
                            <div className="type-t9">naqel-transport-jobs.firebaseapp.com</div>
                            <div className="type-t9">Naqel Transport Jobs</div>
                        </div>

                        <div className="type-t7 p-t-xxs">BILLED TO</div>
                        <div className="p-t-xxs">
                            <div className="type-t9">{`${billData.FirstName} ${billData.LastName}`}</div>
                            <div className="type-t9">{billData.Address}</div>
                        </div>

                        <div className="type-t7 p-t-xxs">INVOICE</div>
                        <div className="p-t-xxs">
                            <div className="type-t9">INVOICE #</div>
                            <div className="type-t9">{bill.BillNumber}</div>
                            <div className="type-t9 p-t-xxxs">DATE OF ISSUE</div>
                            <div className="type-t9">{new Date(bill.Created).toDateString()}</div>
                            <div className="type-t9 p-t-xxxs">INVOICE TOTAL</div>
                            <div className="type-t3 color-default">{`$${bill.Amount.toFixed(2)}`}</div>
                        </div>
                    </div>
                </div>
            </section>;
        }
    }
};

export default Bill;