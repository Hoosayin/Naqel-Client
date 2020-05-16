import React, { Component } from "react";
import PayProofContainer from "../../../../containers/payProof/PayProofContainer";
import Preloader from "../../../../controls/Preloader";
import { deleteDriverPayProof } from "../../DriverFunctions";

class PayProofDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ShowPreloader: false
        };

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = async () => {
        if (this.props.PayProof.Approved) {
            return;
        }

        this.setState({
            ShowPreloader: true
        });

        let discardedDriverPayProof = {
            Token: localStorage.Token,
            DriverPayProofID: this.props.PayProof.DriverPayProofID
        };

        console.log(`Going to delete driver pay proof.`);

        await deleteDriverPayProof(discardedDriverPayProof).then(response => {
            if (response.Message === "Driver pay proof is deleted.") {
                this.setState({
                    ShowPreloader: false
                });

                this.props.OnPayProofDeleted();
            }
            else {
                this.setState({
                    ShowPreloader: false
                });
            }
        });
    }

    render() {
        const showPreloader = this.state.ShowPreloader;
        const payProof = this.props.PayProof;

        return <section>
            {payProof.Approved ?
                null :
                <div class="alert alert-danger m-n p-n">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-24">
                                <p><span className="fas fa-exclamation-circle m-r-xxxs"></span>PENDING APPROVAL: Naqel team will approve this proof.</p>
                            </div>
                        </div>
                    </div>
                </div>}
            <PayProofContainer PayProof={payProof} />
            {payProof.Approved ? 
                null : 
                <div className="text-right back-color-gray p-xxs">
                    <button className="btn btn-danger m-n" onClick={this.onDelete}>Delete</button>
                </div>}
            {showPreloader ? <Preloader /> : null}
        </section>;
    }
};

export default PayProofDetails;