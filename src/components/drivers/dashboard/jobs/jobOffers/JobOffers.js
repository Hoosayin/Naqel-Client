import React, { Component } from "react";
import JobOfferPostsList from "./JobOfferPostsList";

class JobOffers extends Component {
   render() {
       return <section>
           <JobOfferPostsList Refresh={this.props.Refresh} />
       </section>;
    }
};

export default JobOffers;