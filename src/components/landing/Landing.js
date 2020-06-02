import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        return <section>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="truck.png" src="./images/truck.png" data-source-index="2" />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>Weclome to Naqel</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>Transport Services On-The-Go</div>
                            <p style={{ color: "#D1D2D4", }}>Welcome to Naqel! If you are a trader or a broker, and you want to publish job opportunities for drivers nearby, well, you are on the right place. Naqel is a mediator among traders, brokers and drivers, and provides intuitive and secure way to get transport services.</p>
                            <p style={{ color: "#D1D2D4", }}>Not a Trader or a Broker? No worries! Naqel provides services for drivers too. If you are a driver, and you are searching for job opportunities, you are just one step away. Create your account on our Web Service, and we will notify you job oppprtunities on your personal account.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#16171F" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="oath.png" src="./images/oath.png" data-source-index="2" />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>Privacy</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>Your Privacy is Important to Us</div>
                            <p style={{ color: "#D1D2D4", }}>Naqel's Privacy Statement describes the types of data we collect from you, how we use your data, and the legal bases we have to process your data. The Privacy Statement also describes how Naqel uses your content, which is information submitted by you to Naqel via the Services.</p>
                            <p style={{ color: "#D1D2D4", }}>Where processing is based on consent and to the extent permitted by law, by agreeing to these Terms, you consent to Naqel's collection, use and disclosure of your content and data as described in the privacy statement.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#00201C" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="account.png" src="./images/account.png" data-source-index="2" />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>User Accounts</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>Signup and/or Login</div>
                            <p style={{ color: "#D1D2D4", }}>Do you want to use our services right now? No Worries! Just signup by filling up precise forms and/or login to your profile. Drivers can view job opprotunities on their dashboards. Traders and/or Brokers can post job requests for freight from thier accounts.</p>
                            <div class="btn-group">
                                <Link to="/register" class="btn btn-secondary">Signup</Link>
                                <Link to="/login" class="btn btn-primary">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="jumbotron theme-dark" style={{ backgroundColor: "#202020", height: "100vh" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-24 text-center">
                            <div class="row section-gallery">
                                <div class="col-md-8">
                                    <h4 style={{ fontWeight: "bold", }}>LOCATION</h4>
                                    <div class="type-p1 text-center">
                                        Wah
                                            <br />
                                            Punjab, Pakistan
                                            </div>
                                </div>
                                <div class="col-md-8">
                                    <h4 style={{ fontWeight: "bold", }}>AROUND THE GLOBE</h4>
                                    <div class="type-p1 text-center text-light" style={{ color: "#25AAE1", }}>
                                        <a class="fa" href="#">
                                            <i class="fab fa-fw fa-facebook-f"></i>
                                        </a>
                                        <a class="fa" href="#">
                                            <i class="fab fa-fw fa-instagram"></i>
                                        </a>
                                        <a class="fa" href="#">
                                            <i class="fab fa-fw fa-twitter"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <h4 style={{ fontWeight: "bold", }}>CONTACT US</h4>
                                    <div class="type-p1 text-center">Naqel is created by Core Infinite. For more information, visit <a style={{ textDecoration: "none", color: "#008575", }} href="#" class="color-type-accent">coreinfinte.com</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default Landing;