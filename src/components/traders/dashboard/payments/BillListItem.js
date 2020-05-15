import React, { Component } from "react";

class BillListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const bill = this.props.Bill;

        return <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
            <div>BILL CONTAINER HERE</div>
            <div data-toggle="collapse" aria-expanded="false" data-target={`#bill-${index}`}>
                <div className="type-h4" style={{ color: "#008575", padding: "10px", textAlign: "right" }}>Payment Details
                    <i className="fas fa-ellipsis-v"></i>
                    <i class="glyph glyph-add"></i>
                    <i class="glyph glyph-remove"></i>
                </div>
            </div>

            <div className="collapse" id={`bill-${index}`}>
                <div>PAID INFORMATION HERE</div>
            </div>
        </li>;
    }
};

export default BillListItem;