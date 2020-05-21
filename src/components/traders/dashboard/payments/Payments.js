import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Strings from "../../../../res/strings";
import BillsList from "./BillsList";

const stripePromise = loadStripe(Strings.STRIPE_PUBLISHABLE_KEY);

class Payments extends Component {
    render() {
        return <section>
            <Elements stripe={stripePromise}>
                <BillsList />
            </Elements>
        </section>;
    }
};

export default Payments;