import React, { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.Message) {
            return <div className="alert alert-info alert-dismissible fade in" role="alert" style={{ marginBottom: "0px" }}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.OnClose}>
                    <span aria-hidden="true"><i className="fas fa-times"></i></span>
                </button>

                <div className="container">
                    <div className="row">
                        <div className="col-md-20">
                            <p>{this.props.Message}</p>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                </div>
            </div>;
        } else {
            return null;
        }
        
    }
};

export default Alert;