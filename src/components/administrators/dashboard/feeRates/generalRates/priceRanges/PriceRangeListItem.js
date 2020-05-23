import React, { Component } from "react";
import UpdatePriceRangeDialog from "./UpdatePriceRangeDialog";
import ProgressRing from "../../../../../../controls/ProgressRing";
import { deletePriceRange } from "../../../../AdministratorFunctions";

class PriceRangeListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowProgressRing: false
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        this.setState({
            ShowProgressRing: true
        });

        let discardedPriceRange = {
            Token: localStorage.Token,
            PriceRangeID: this.props.PriceRange.PriceRangeID
        };

        await deletePriceRange(discardedPriceRange).then(response => {
            this.setState({
                ShowProgressRing: false
            });

            if (response.Message === "Price range is deleted.") {
                this.props.OnPriceRangeDeleted(this.props.PriceRange);
            }
        });
    };

    render() {
        const {
            ShowProgressRing
        } = this.state;

        const {
            Index,
            PriceRange
        } = this.props;

        return <tr>
            <td>
                <strong>{Index + 1}</strong>
                {ShowProgressRing ?
                    <span className="m-l-xxs"><ProgressRing /></span> : null}
            </td>

            <td>{`$${parseFloat(PriceRange.StartRange).toFixed(2)}`}</td>
            <td>{`$${parseFloat(PriceRange.EndRange).toFixed(2)}`}</td>
            <td>{`${PriceRange.FeeRate}%`}</td>

            <td className="text-right">
                <button className="btn btn-secondary"
                    data-toggle="modal"
                    data-target={`#update-fee-rate-dialog-${Index}`}>Edit Fee Rate</button>
                <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>

                <UpdatePriceRangeDialog Index={Index}
                    FeeRate={PriceRange.FeeRate}
                    PriceRangeID={PriceRange.PriceRangeID}
                    OnOK={this.props.OnPriceRangeUpdated} />
            </td>
        </tr>;
    }
};

export default PriceRangeListItem;