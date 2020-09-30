import React, { Component } from "react";
import AccountStatementRow from "./AccountStatementRow";
import Strings from "../../../../../../res/strings";

class AccountStatementTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            AccountStatement
        } = this.props;

        const truck = AccountStatement.Truck;

        let netAmount = 0.0;
        let netEarned = 0.0;
        let netCharged = 0.0;

        for (let transaction of AccountStatement.Transactions) {
            netAmount += transaction.Amount;
            netEarned += transaction.Earned;
            netCharged += transaction.Charged;
        }

        return <section>
            <div className="jumbotron theme-default back-color-light" dir={GetDirection()}>
                <div className="container">
                    <div className="type-t3" style={{ fontWeight: "600" }}><span className="fas fa-route m-r-xxxs m-l-xxxs"></span>{Dictionary.Naqel}</div>

                    <div className="p-t-xxs">
                        <div className="type-t8 m-b-xxs">{Dictionary.TruckDetails}</div>
                        <div className="type-t8">{`${Dictionary.MakeAndModel}: ${truck.Brand} ${truck.Model}`}</div>
                        <div className="type-t8">{`${Dictionary.ProductionYear}: ${truck.ProductionYear}`}</div>
                        <div className="type-t8">{`${Dictionary.TruckType}: ${truck.Type}`}</div>
                        <div className="type-t8">{`${Dictionary.TruckNumber}: ${truck.TruckNumber}`}</div>
                    </div>
                </div>
            </div>

            {AccountStatement.Transactions.length === 0 ? 
                <section dir={GetDirection()}>
                    <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                        <div className="container">
                            <div className="text-center p-xxs">
                                <div className="type-h4"><span className="fas fa-exclamation-triangle m-r-xxs m-l-xxs"
                                    style={{ color: "#FFBF15" }}></span>{Dictionary.NoTransactionFound}.</div>
                            </div>
                        </div>
                    </div>
                </section> : 
                <div class="table-responsive back-color-gray" style={{ borderTop: "4px solid #CCCCCC", height: "100vh" }}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>{Dictionary.Date}</th>
                                <th>{Dictionary.JobNumber}</th>
                                <th>{Dictionary.TraderBillNumber}</th>
                                <th>{Dictionary.TraderBillPaid}</th>
                                <th>{Dictionary.TradePayMethod}</th>
                                <th>{Dictionary.DriverBillNumber}</th>
                                <th>{Dictionary.DriverBillPaid}</th>
                                <th>{Dictionary.DriverPayMethod}</th>
                                <th>{Dictionary.FeeRate}</th>
                                <th>{Dictionary.Earned}</th>
                                <th>{Dictionary.Charged}</th>
                                <th>{Dictionary.TotalAmount}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AccountStatement.Transactions.map((transaction, index) => {
                                return <AccountStatementRow key={index}
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
                                <td>{Dictionary.Total}:</td>
                                <td>{`${netEarned.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                <td>{`${netCharged.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                                <td>{`${netAmount.toFixed(2)} ${Strings.SAUDI_RIYAL}`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
        </section>;
    }
};

const GetDirection = () => {
    return (!Language || Language === "English") ? "ltr" : "rtl";
};

const Language = localStorage.Language;
let Dictionary;

if (Language === "Arabic") {
    Dictionary = {
        Naqel: "ناقل",
        TruckDetails: "تفاصيل الشاحنة",
        MakeAndModel: "الصنع و النوع",
        ProductionYear: "سنة الصنع",
        TruckType: "نوع الشاحنة",
        TruckNumber: "رقم الشاحنة",
        NoTransactionFound: " لم يتم العثور على المعاملات ",
        Date: "تاريخ",
        TruckNumber: "رقم الشاحنة",
        JobNumber: "رقم امر العمل",
        TraderBillNumber: "رقم فاتورة التاجر",
        TraderBillPaid: "دفع فاتورة التاجر؟",
        TradePayMethod: "طريقة دفع فاتورة التاجر",
        DriverBillNumber: "رقم فاتورة السائق",
        DriverBillPaid: "دفعت فاتورة السائق؟",
        DriverPayMethod: "طريقة دفع فاتورة السائق",
        FeeRate: "معدل الرسوم",
        Earned: "حصل",
        Charged: "متهم",
        TotalAmount: "المبلغ الإجمالي",
        Total: "مجموع"
    };
}
else {
    Dictionary = {
        Naqel: "NAQEL",
        TruckDetails: "TRUCK DETAILS",
        MakeAndModel: "Make and Model",
        ProductionYear: "Production Year",
        TruckType: "Truck Type",
        TruckNumber: "Truck Number",
        NoTransactionFound: "No transactions found",
        Date: "DATE",
        TruckNumber: "TRUCK NUMBER",
        JobNumber: "JOB NUMBER",
        TraderBillNumber: "TRADER BILL NUMBER",
        TraderBillPaid: "TRADER BILL PAID?",
        TradePayMethod: "TRADER PAY METHOD",
        DriverBillNumber: "DRIVER BILL NUMBER",
        DriverBillPaid: "DRIVER BILL PAID?",
        DriverPayMethod: "DRIVER PAY METHOD",
        FeeRate: "FEE RATE",
        Earned: "EARNED",
        Charged: "CHARGED",
        TotalAmount: "TOTAL AMOUNT",
        Total: "TOTAL"
    };
}

export default AccountStatementTable;