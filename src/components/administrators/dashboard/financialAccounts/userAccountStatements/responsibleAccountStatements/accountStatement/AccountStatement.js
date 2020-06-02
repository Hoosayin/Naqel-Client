import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ProgressBar from "../../../../../../../controls/ProgressBar";
import AccountStatementData from "./AccountStatementData";
import { getData } from "../../../../../AdministratorFunctions";

class AccountStatement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AccountStatement: null,
            Searching: false,
            Refreshing: false
        };

        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount() {
        this.props.OnSearch(this.onSearch);
    }

    onSearch = async username => {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "ResponsibleAccountStatement",
                Params: {
                    Username: username
                }
            };

            this.setState({
                Searching: true
            });

            await getData(request).then(response => {
                if (response.Message === "Account statement found.") {
                    this.setState({
                        AccountStatement: response.AccountStatement,
                        Searching: false
                    });
                }
                else {
                    this.setState({
                        AccountStatement: null,
                        Searching: false
                    });
                }
            });
        }
    };

    render() {
        const {
            AccountStatement,
            Searching,
        } = this.state;

        return (Searching || !AccountStatement) ?
            <section>
                <div className="jumbotron theme-default" style={{ height: "100vh" }}>
                    <div className="container">
                        {Searching ? <div className="text-center p-xxs">
                            <div className="type-h4 color-default">Searching</div>
                            <ProgressBar />
                        </div> : <div className="text-center p-xxs">
                                <div className="type-h4"><span className="fas fa-exclamation-triangle m-r-xxs" style={{ color: "#FFBF15" }}></span>No account statement to display. Search the transport company by username to view its account statement.</div>
                            </div>}
                    </div>
                </div>
            </section> :
            <section>
                <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary m-t-n">Print</button>}
                        content={() => this.ResponsibleAccountStatement} />
                </div>
                <AccountStatementData AccountStatement={AccountStatement}
                    ref={responsibleAccountStatement => (this.ResponsibleAccountStatement = responsibleAccountStatement)} />
                </section>;
    }
};

export default AccountStatement;