import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import ReactToPrint from "react-to-print";
import SpecialBill from "./SpecialBill";

class PrintSpecialBillDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Bill: null,
        }; 
    }

    componentDidMount () {
        this.setState({
            Bill: jwt_decode(this.props.match.params.Bill)
        });
    }

    render() {
        const bill = this.state.Bill;

        return <section>
            <SpecialBill Bill={bill} ref={bill => (this.Bill = bill)} />
                            <div className="text-right back-color-gray p-xxs">
                                <ReactToPrint
                                    trigger={() => <button className="btn btn-primary m-n">Print</button>}
                                    content={() => this.Bill} />
                            </div>
        </section>;
    }
};

export default PrintSpecialBillDialog;