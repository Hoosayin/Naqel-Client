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

        const driver = AccountStatement.Driver;

        return <section>
            <div style={{ width: "100%", height: "2px", backgroundColor: "#008575" }}></div>
            {(AccountStatement.Bills.length === 0) ?
                <section>
                    <div className="jumbotron theme-default">
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
                                <div className="type-t8">{`${driver.FirstName} ${driver.LastName}`}</div>
                                <div className="type-t9">{`@${driver.Username}`}</div>
                                <div className="type-t8">Driver</div>
                                <div className="type-t8">{driver.Address}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC" }}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>JOB NUMBER</th>
                                    <th>EARNED</th>
                                    <th>BILL NUMBER</th>
                                    <th>PAID?</th>
                                    <th>PAY METHOD</th>
                                    <th>AMOUNT CHARGED</th>
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
                                    <td>NET EARNING</td>
                                    <td>{`$${AccountStatement.NetEarning.toFixed(2)}`}</td>
                                    <td></td>
                                    <td></td>
                                    <td>TOTAL</td>
                                    <td>{`$${AccountStatement.NetAmount.toFixed(2)}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>}
        </section>;
    }
};

export default AccountStatementData;