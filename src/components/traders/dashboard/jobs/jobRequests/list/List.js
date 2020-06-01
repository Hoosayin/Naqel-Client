import React, { Component } from "react";
import JobRequestPostsList from "./JobRequestPostsList";

class List extends Component {
   render() {
       return <section>
           <JobRequestPostsList Refresh={this.props.Refresh} />
       </section>;
    }
};

export default List;