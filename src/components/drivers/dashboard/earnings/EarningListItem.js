import React, { Component } from "react";

class EarningListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const index = this.props.Index;
        const earning = this.props.Earning;
        const created = new Date(earning.Created);

        return <tr>
            <td>
                <strong>{index + 1}</strong>
                {index === 0 ? <span class="badge back-color-golden m-l-xxxs">NEW</span> : null}
            </td>
            <td>{`$${earning.Amount.toFixed(2)}`}</td>
            <td>{earning.JobNumber}</td>
            <td>{earning.DuesPaid ?
                <span className="fa fa-check-circle" style={{ color: "#25AE88" }}></span> :
                <span className="fa fa-times-circle" style={{ color: "#D75A4A" }}></span>}</td>
            <td>{`${created.toDateString()} at ${created.toLocaleTimeString()}`}</td>
        </tr>;
    }
};

export default EarningListItem;