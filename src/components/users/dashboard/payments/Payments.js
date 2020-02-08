import React, { Component } from "react";

class Payments extends Component {
    render() {
        return (
            <div>
                <div class="jumbotron" style={{ width: "100%", backgroundColor: "#202020" }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-md-push-12 text-center">
                                <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                    alt="tools.png" src="./images/tools.png" style={{ borderRadius: "50%" }} data-source-index="1" />
                            </div>
                            <div class="col-md-12 col-md-pull-12">
                                <div class="type-h3" style={{ color: "#008575", }}>
                                    Payments
                    </div>
                                <div class="type-sh3" style={{ color: "#949496", }}>
                                    Under-Construction
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Payments;