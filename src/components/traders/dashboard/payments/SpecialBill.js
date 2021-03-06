import React, { Component } from "react";
import SearchingContainer from "../../../../containers/searching/SearchingContainer";
import Strings from "../../../../res/strings";
import { getData } from "../../TraderFunctions";

class SpecialBill extends Component {
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
                            <div className="type-t9">{new Date(bill.SpecialTraderBill.Created).toDateString()}</div>
                            <div className="type-t9 p-t-xxxs">INVOICE TOTAL</div>
                            <div className="type-t3 color-default">{`${bill.SpecialTraderBill.Amount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</div>
                        </div>
                    </div>
                </div>
            </section>;
        }
    }
};

export default SpecialBill;