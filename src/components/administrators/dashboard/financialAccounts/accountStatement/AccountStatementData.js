import React, { Component } from "react";
import Strings from "../../../../../res/strings";
import RowData from "./RowData";

class AccountStatementData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            AccountStatement
        } = this.props;

        const naqelSettings = AccountStatement.NaqelSettings;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            {(AccountStatement.Transactions.length === 0) ?
                <section>
                    <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                        <div className="container">
                            <div className="text-center p-xxs">
                                <div className="type-h4">
                                    <span className="fas fa-exclamation-triangle m-r-xxs" style={{ color: "#FFBF15" }}></span>No transactions found.</div>
                            </div>
                        </div>
                    </div>
                </section> :
                <section>
                    <div className="jumbotron theme-default back-color-light">
                        <div className="container">
                            <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs"></span>NAQEL</div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{naqelSettings.Street}</div>
                                <div className="type-t8">{`${naqelSettings.City}, ${naqelSettings.Country}.`}</div>
                                <div className="type-t8">{`ZIP ${naqelSettings.ZIPCode}`}</div>
                            </div>

                            <div className="p-t-xxs">
                                <div className="type-t8">{naqelSettings.PhoneNumber}</div>
                                <div className="type-t8">{naqelSettings.Website}</div>
                                <div className="type-t8">{naqelSettings.BusinessName}</div>
                            </div>

                            <div className="p-t-xxs">
                                <div className="type-t8">BANK NAME</div>
                                <div className="type-t8">{naqelSettings.BankName}</div>
                                <div className="type-t8 p-t-xxxs">ACCOUNT #</div>
                                <div className="type-t8">{naqelSettings.AccountNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>BILL NUMBER</th>
                                    <th>PAYEE</th>
                                    <th>PAYEE TYPE</th>
                                    <th>PAY METHOD</th>
                                    <th>AMOUNT</th>
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
                                    <td>TOTAL</td>
                                    <td>{`${AccountStatement.NetAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>}
        </section>;
    }
};

export default AccountStatementData;