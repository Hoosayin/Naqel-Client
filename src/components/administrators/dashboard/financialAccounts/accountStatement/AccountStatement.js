import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ProgressBar from "../../../../../controls/ProgressBar";
import AccountStatementData from "./AccountStatementData";
import { getData } from "../../../AdministratorFunctions";

class AccountStatement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AccountStatement: null,
            Searching: false,
            Refreshing: false
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
                Get: "AccountStatement"
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

        return <section>
            <div class="page-header" style={{
                backgroundImage: "url(/images/poly_back.jpg)",
                backgroundSize: "cover",
                backgroundColor: "#215761"
            }}>
                <div class="container p-b-xxs m-b-xxs">
                    <div class="row">
                        <div class="col-xs-18">
                            <div className="type-h3 color-light"><span className="fas fa-university m-r-xxs"></span>Naqel Account Statement</div>
                        </div>
                    </div>
                </div>
            </div>

            {(Searching || !AccountStatement) ?
                <section>
                    <div className="jumbotron theme-default">
                        <div className="container">
                            {Searching ? <div className="text-center p-xxs">
                                <div className="type-h4 color-default">Searching</div>
                                <ProgressBar />
                            </div> : <div className="text-center p-xxs">
                                    <div className="type-h4"><span className="fas fa-exclamation-triangle m-r-xxs" style={{ color: "#FFBF15" }}></span>No account statement to display.</div>
                                </div>}
                        </div>
                    </div>
                </section> :
                <section>
                    <div className="text-right p-xxs" style={{ backgroundColor: "#DDDDDD" }}>
                        <ReactToPrint
                            trigger={() => <button className="btn btn-primary m-n">Print</button>}
                            content={() => this.AccountStatement} />
                    </div>
                    <AccountStatementData AccountStatement={AccountStatement}
                        ref={accountStatement => (this.AccountStatement = accountStatement)} />
                </section>}
        </section>;
    }
};

export default AccountStatement;