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

        const trader = AccountStatement.Trader;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            {(AccountStatement.Bills.length === 0) ?
                <section>
                    <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                        <div className="container">
                            <div className="text-center p-xxs">
                                <div className="type-h4">
                                    <span className="fas fa-exclamation-triangle m-r-xxs" style={{ color: "#FFBF15" }}></span>No billing details found.</div>
                            </div>
                        </div>
                    </div>
                </section> :
                <section>
                    <div className="jumbotron theme-default back-color-light">
                        <div className="container">
                            <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs"></span>NAQEL</div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{`${trader.FirstName} ${trader.LastName}`}</div>
                                <div className="type-t9">{`@${trader.Username}`}</div>
                                <div className="type-t8">{trader.Type}</div>
                                <div className="type-t8">{trader.Address}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>BILL NUMBER</th>
                                    <th>PAID?</th>
                                    <th>FEE RATE</th>
                                    <th>PAY METHOD</th>
                                    <th>RECIPIENT CHARGES</th>
                                    <th>NAQEL CHARGES</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AccountStatement.Bills.map((bill, index) => {
                                    return <RowData key={index}
                                        Index={index}
                                        Bill={bill} />;
                                })}
                                <tr style={{ backgroundColor: "#DADADA" }}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>TOTAL</td>
                                    <td>{`$${AccountStatement.TotalRecipientAmount.toFixed(2)}`}</td>
                                    <td>{`$${AccountStatement.TotalChargedAmount.toFixed(2)}`}</td>
                                    <td>{`$${AccountStatement.TotalAmount.toFixed(2)}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>}
        </section>;
    }
};

export default AccountStatementData;