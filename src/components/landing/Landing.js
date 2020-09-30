import React, { Component } from "react";
import LangugageDispatcher from "../../res/LanguageDispatcher";
import { Link } from "react-router-dom";

const Language = LangugageDispatcher.GetLanguage();

class Landing extends Component {
    render() {
        return <section dir={(!localStorage.Language || localStorage.Language === "English") ? "ltr" : "rtl"}>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#202020" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="truck.png" src="./images/delivery-truck.svg" data-source-index="2" style={{ maxWidth: "70%" }}  />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>{Language.Landing_Welcome}</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>{Language.Landing_WelcomeSubtitle}</div>
                            <p style={{ color: "#D1D2D4", }}>{Language.Landing_WelcomeDetails1}</p>
                            <p style={{ color: "#D1D2D4", }}>{Language.Landing_WelcomeDetails2}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#16171F" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="oath.png" src="./images/oath.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>{Language.Landing_Privacy}</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>{Language.Landing_PrivacySubtitle}</div>
                            <p style={{ color: "#D1D2D4", }}>{Language.Landing_PrivacyDetails1}</p>
                            <p style={{ color: "#D1D2D4", }}>{Language.Landing_PrivacyDetails2}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="jumbotron theme-alt" style={{ width: "100%", backgroundColor: "#00201C" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-md-push-12 text-center">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                alt="account.png" src="./images/team.svg" data-source-index="2" style={{ maxWidth: "70%" }} />
                        </div>
                        <div class="col-md-12 col-md-pull-12">
                            <div class="type-h3" style={{ color: "#008575", }}>{Language.Landing_UserAccounts}</div>
                            <div class="type-sh3" style={{ color: "#949496", }}>{Language.Landing_UserAccountsSubtitle}</div>
                            <p style={{ color: "#D1D2D4", }}>{Language.Landing_UserAccountsDetails}</p>
                            <div class="btn-group">
                                <Link to="/register" class="btn btn-secondary">{Language.Landing_Signup}</Link>
                                <Link to="/login" class="btn btn-primary">{Language.Landing_Login}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
};

export default Landing;