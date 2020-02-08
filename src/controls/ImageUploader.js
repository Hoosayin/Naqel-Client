import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Strings from "../res/strings";

class ImageUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Image: null,
            DriverID: null,
            UploadProgress: null,
        };

        this.onImageUpload = this.onImageUpload.bind(this);
    }

    componentDidMount() {
        if (localStorage.userToken) {
            const decoded = jwt_decode(localStorage.userToken);
            this.setState({
                DriverID: decoded.DriverID,
            });
        }
    }

    onImageUpload = event => {
        this.state.Image = event.target.files[0];

        if (this.state.Image) {
            let mimeType = this.state.Image.type;

            if (!mimeType.startsWith("image")) {
                this.props.OnInvalidImageSelected();
                return;
            }
        }

        const formData = new FormData();

        try {            
            formData.append("DriverID", this.state.DriverID);
            formData.append("ImageCategory", this.props.ImageCategory);
            formData.append("Image", this.state.Image, this.state.Image.name);
        }
        catch (exception) {
            this.setState({
                UploadProgress: null,
            });

            return;
        }

        axios.post(Strings.IMAGE_UPLOADER, formData, {
            onUploadProgress: event => {
                this.setState({
                    UploadProgress: (
                        <div class="progress-bar">
                            <div class="progress-circle"></div>
                            <div class="progress-circle"></div>
                            <div class="progress-circle"></div>
                            <div class="progress-circle"></div>
                            <div class="progress-circle"></div>
                        </div>
                    ),
                });
            }
        }).then(async response => {
            this.props.OnImageUploaded(response.data);

            this.setState({
                UploadProgress: null,
            });
        }).catch((error) => {
            this.props.OnImageUploaded(error);

            this.setState({
                UploadProgress: null,
            });
        });
    }

    onSubmit = async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.onImageUpload} style={{ display: "none", }} ref={fileInput => this.fileInput = fileInput} />
                <figure class="media">
                    <div class="media-img media-img-has-play ratio-movie" style={{
                        width: this.props.Width,
                        height: this.props.Height,
                        border: "0px",
                        padding: "0px",
                        border: "5px solid #3A3A3C"
                    }}>
                        <a onClick={() => this.fileInput.click()}>
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={this.props.Source} alt="dafault-image.png" />
                            <i class="glyph glyph-edit"></i>
                        </a>
                    </div>
                </figure>
                {this.state.UploadProgress}
            </div>
                
        );
    }
};

export default ImageUploader;