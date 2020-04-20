import React, { Component } from "react";

class EntryExitCardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const entryExitCard = this.props.EntryExitCard;

        return entryExitCard ? <section>
            <li className="list-items-row" style={{ borderTop: "4px solid #CCCCCC" }}>
                <div className="jumbotron theme-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-24">
                                <div className="type-h3" style={{ color: "#008575", paddingTop: "0px" }}>Entry/Exit Card</div>
                                <div className="row">
                                    <div className="col-md-24">
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-hashtag"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">Entry/Exit Number</div>
                                                    <div class="content-text-secondary">{entryExitCard.EntryExitNumber}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-cog"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">Card Type</div>
                                                    <div class="content-text-secondary">{entryExitCard.Type}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-calendar"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">Release Date</div>
                                                    <div class="content-text-secondary">{new Date(entryExitCard.ReleaseDate).toDateString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="entity-list">
                                            <div class="entity-list-item">
                                                <div class="item-icon">
                                                    <span class="fas fa-hashtag"></span>
                                                </div>
                                                <div class="item-content-primary">
                                                    <div class="content-text-primary">Number of Months</div>
                                                    <div class="content-text-secondary">{entryExitCard.NumberOfMonths}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </section> : null;
    }
};

export default EntryExitCardContainer;