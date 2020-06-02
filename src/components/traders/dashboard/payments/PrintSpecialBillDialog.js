import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import SpecialBill from "./SpecialBill";

class PrintSpecialBillDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const bill = this.props.Bill;

        return <section>
            <div className="modal modal-center-vertical" id={`print-special-bill-dialog-${index}`}
                tabIndex="-1" role="dialog"
                aria-labelledby="modal-sample-label" aria-hidden="true">
                <div className="modal-dialog" style={{ width: "100%", maxWidth: "95%" }}>
                    <div className="modal-content" style={{ backgroundColor: "#FEFEFE" }}>
                        <div className="modal-header">
                            <div className="text-right">
                                <button className="btn btn-primary" style={{ minWidth: "0px" }}
                                    data-dismiss="modal"
                                    ref={cancelButton => this.cancelButton = cancelButton}>
                                    <span className="fas fa-times"></span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <SpecialBill Bill={bill} ref={bill => (this.Bill = bill)} />
                            <div className="text-right back-color-gray p-xxs">
                                <ReactToPrint
                                    trigger={() => <button className="btn btn-primary m-n">Print</button>}
                                    content={() => this.Bill} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default PrintSpecialBillDialog;