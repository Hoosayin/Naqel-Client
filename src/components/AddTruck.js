import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { usernameAndEmailSettings } from "./DriverFunctions";
import MessageBox from "./MessageBox";
import jsonWebToken from "jsonwebtoken";

class AddTruck extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(value) });
    }

    validateField(value) {
    }

    onSubmit = async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div div class="modal in" tabindex="-1" role="dialog" aria-labelledby="modal-sample-label" aria-hidden="true" style={{ display: "block" }}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div>
                                    <img alt="add.png" src="./images/add.png" height="60" />
                                    <div class="type-h3">New Truck</div>
                                    <div class="type-sh3">These detials will be displayed on your profile.</div>
                                    <br />
                                    <div class="form-group">
                                        <label class="control-label">Confirmation Code</label>
                                        <input type="text" name="ConfirmCode" class="form-control" autocomplete="off"
                                            value={this.state.ConfirmCode} onChange={this.onChange} />
                                        <span class="text-danger">Hello</span>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-default" onClick={this.props.OnAddTruckPopupRemove}>Cancel</button>
                                    <input type="submit" value="Confirm" class="btn btn-primary" disabled={!this.state.ValidForm} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
};

export default AddTruck;