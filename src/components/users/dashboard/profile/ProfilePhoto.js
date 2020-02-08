import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { uploadDriverProfilePhoto } from "../../DriverFunctions";
import Strings from "../../../../res/strings";

class ProfilePhoto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Image: null,
            ImageURL: "./images/defaultProfilePhoto.png",
            DriverID: null,
            ImageCategory: "ProfilePicture",
            UploadProgress: null,
        };
        this.onImageUpload = this.onImageUpload.bind(this);
    }

    componentDidMount() {
        const decoded = jwt_decode(localStorage.userToken);

        this.setState({
            ImageURL: decoded.ProfilePhotoURL,
        });

        this.setState({
            DriverID: decoded.DriverID,
        });
    }

    onImageUpload = event => {
        this.state.Image = event.target.files[0];
        console.log(this.state.Image);
        const formData = new FormData();

        try {            
            formData.append("DriverID", this.state.DriverID);
            formData.append("ImageCategory", this.state.ImageCategory);
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
        })
            .then(async response => {
                response = response.data;
                console.log(response);

                if (response.message === "Image uploaded successfully.") {
                    const driverProfilePhoto = {
                        DriverID: this.state.DriverID,
                        URL: response.imageUrl,
                        FileName: response.filename
                    }

                    await uploadDriverProfilePhoto(driverProfilePhoto)
                        .then(res => {
                            if (res === "Driver's profile photo is updated." ||
                                res === "Driver's profile photo is added.") {
                                this.setState({
                                    ImageURL: response.imageUrl,
                                    UploadProgress: null,
                                });
                            }
                        }); 
                }
            })
            .catch(() => {
                this.props.OnImageUploaded("Invalid Image.");
                this.setState({
                    ImageURL: "./images/defaultProfilePhoto.png",
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
                        width: "200px",
                        height: "200px",
                        border: "0px",
                        padding: "0px",
                        border: "5px solid #3A3A3C"
                    }}>
                        <a href="#" onClick={() => this.fileInput.click()}>
                            <img class="img-responsive visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block visible-xl-inline-block"
                                src={this.state.ImageURL} alt="ProfilePhoto.png" />
                            <i class="glyph glyph-edit"></i>
                        </a>
                    </div>
                </figure>
                {this.state.UploadProgress}
            </div>
                
        );
    }
};

export default ProfilePhoto;