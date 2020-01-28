import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { usernameAndEmailSettings } from "./DriverFunctions";
import MessageBox from "./MessageBox";
import jsonWebToken from "jsonwebtoken";

class ProfilePhoto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SelectedFile: null,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFileSelected = e => {
        this.setState({
            SelectedFile: e.target.files[0],
        });
    }

    onFileUploaded = () => {

    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    validateField(value) {

    }

    onSubmit = async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.onFileSelected} />
                <button onCLick={this.onFileUploaded}>Upload</button>
                <figure class="media">
                    <div class="media-img media-img-has-play ratio-movie" style={{
                        width: "200px",
                        height: "200px",
                        border: "0px",
                        padding: "0px"
                    }}>
                        <a href="#">
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block" src="./images/defaultProfilePhoto.png" alt="defaultProfilePhoto.png" />
                            <i class="glyph glyph-edit"></i>
                        </a>
                    </div>
                </figure>
            </div>
        );
    }
};

export default ProfilePhoto;