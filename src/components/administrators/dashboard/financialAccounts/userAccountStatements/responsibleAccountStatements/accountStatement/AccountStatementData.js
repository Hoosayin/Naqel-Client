import React, { Component } from "react";
import RowData from "./RowData";

class AccountStatementData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            AccountStatement
        } = this.props;

        const transportCompany = AccountStatement.TransportCompany;

        let netAmount = 0.0;
        let netEarned = 0.0;
        let netCharged = 0.0;

        for (let transaction of AccountStatement.Transactions) {
            netAmount += transaction.Amount;
            netEarned += transaction.Earned;
            netCharged += transaction.Charged;
        }

        return <section>
            <div className="jumbotron theme-default back-color-light">
                <div className="container">
                    <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs"></span>NAQEL</div>

                    <div className="p-t-xxs">
                        <div className="type-t8 m-b-xxs">TRANSPORT COMPANY DETAILS</div>
                        <div className="type-t8">{`Company Name: ${transportCompany.Name}`}</div>
                        <div className="type-t8">{`Username: ${transportCompany.Username}`}</div>
                        <div className="type-t8">{`Internal Number: ${transportCompany.InternalNumber}`}</div>
                        <div className="type-t8">{`Commercial Register Number: ${transportCompany.CommercialRegisterNumber}`}</div>
                    </div>
                </div>
            </div>

            {AccountStatement.Transactions.length === 0 ?
                <section>
                    <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                        <div className="container">
                            <div className="text-center p-xxs">
                                <div className="type-h4"><span className="fas fa-exclamation-triangle m-r-xxs"
                                    style={{ color: "#FFBF15" }}></span>No transactions found.</div>
                            </div>
                        </div>
                    </div>
                </section> :
                <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>TRUCK NUMBER</th>
                                <th>JOB NUMBER</th>
                                <th>TRADER BILL NUMBER</th>
                                <th>TRADER BILL PAID?</th>
                                <th>TRADER PAY METHOD</th>
                                <th>DRIVER BILL NUMBER</th>
                                <th>DRIVER BILL PAID?</th>
                                <th>DRIVER PAY METHOD</th>
                                <th>FEE RATE</th>
                                <th>EARNED</th>
                                <th>CHARGED</th>
                                <th>TOTAL AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AccountStatement.Transactions.map((transaction, index) => {
                                return <RowData key={index}
                                    Index={index}
                                    Transaction={transaction} />;
                            })}
                            <tr style={{ backgroundColor: "#DADADA" }}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>TOTAL:</td>
                                <td>{`$${netEarned.toFixed(2)}`}</td>
                                <td>{`$${netCharged.toFixed(2)}`}</td>
                                <td>{`$${netAmount.toFixed(2)}`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

export default AccountStatementData;