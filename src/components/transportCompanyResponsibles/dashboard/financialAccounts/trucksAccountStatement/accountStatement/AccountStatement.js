import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ProgressBar from "../../../../../../controls/ProgressBar";
import AccountStatementTable from "./AccountStatementTable";
import SearchTransactionsDialog from "./SearchTransactionsDialog";
import { getData } from "../../../../TransportCompanyResponsiblesFunctions";

class AccountStatement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AccountStatement: null,
            AllTransactions: [],
            Searching: false,
            ShowingSearchResults: false,
            Refreshing: false
        };

        this.searchTruckAccountStatement = this.searchTruckAccountStatement.bind(this);
    }

    async componentDidMount() {
        this.props.SearchTruckAccountStatement(this.searchTruckAccountStatement);
    }

    searchTruckAccountStatement = async truckNumber => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "TruckAccountStatement",
                Params: {
                    TruckNumber: truckNumber
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Account statement found.") {
                    this.setState({
                        AccountStatement: response.AccountStatement,
                        AllTransactions: response.AccountStatement.Transactions,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AccountStatement: null,
                        AllTransactions: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            AccountStatement,
            AllTransactions,
            Searching,
            ShowingSearchResults
        } = this.state;

        return (Searching || !AccountStatement) ?
            <section>
                <div className="jumbotron theme-default" style={{ height: "100vh" }} dir={GetDirection()}>
                    <div className="container">
                        {Searching ? <div className="text-center p-xxs">
                            <div className="type-h4 color-default">{Dictionary.Searching}</div>
                            <ProgressBar />
                        </div> : <div className="text-center p-xxs">
                                <div className="type-h4"><span className="fas fa-exclamation-triangle m-r-xxs m-l-xxs"
                                    style={{ color: "#FFBF15" }}></span>{Dictionary.NoAccountStatementFound}.</div>
                            </div>}
                    </div>
                </div>
            </section> :
            <section>
                <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary m-t-n">{Dictionary.Print}</button>}
                        content={() => this.TruckAccountStatement} />

                    {ShowingSearchResults ?
                        <button className="btn btn-secondary m-t-n"
                            onClick={() => {
                                let {
                                    AccountStatement,
                                    AllTransactions
                                } = this.state;

                                AccountStatement.Transactions = AllTransactions;

                                this.setState({
                                    AccountStatement: AccountStatement,
                                    ShowingSearchResults: false
                                });
                            }}>{Dictionary.CancelSearch}</button> :
                        <button className="btn btn-secondary m-t-n"
                            data-toggle="modal"
                            data-target={`#search-transactions-dialog`}>{Dictionary.SearchTransactions}</button>}
                </div>

                {ShowingSearchResults ? 
                    null :
                    <SearchTransactionsDialog Transactions={AllTransactions}
                        OnOK={transactions => {
                            let {
                                AccountStatement
                            } = this.state;

                            AccountStatement.Transactions = transactions;

                            this.setState({
                                AccountStatement: AccountStatement,
                                ShowingSearchResults: true
                            });
                        }} />}

                <AccountStatementTable AccountStatement={AccountStatement}
                    ref={truckAccountStatement => (this.TruckAccountStatement = truckAccountStatement)} />
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
        Searching: "يبحث",
        NoAccountStatementFound: "لا يوجد بيان حساب لعرضه. ابحث في الشاحنة عن طريق الرقم لعرض كشف حسابها",
        Print: "طباعة",
        SearchTransactions: "معاملات البحث",
        CancelSearch: "إلغاء البحث"
    };
}
else {
    Dictionary = {
        Searching: "Searching",
        NoAccountStatementFound: "No account statement to display. Search the truck by number to view its account statement",
        Print: "Print",
        SearchTransactions: "Search Transactions",
        CancelSearch: "Cancel Search"
    };
}

export default AccountStatement;