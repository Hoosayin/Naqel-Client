import React, { Component } from "react";
import axios from "axios";
import { getData, uploadDriverProfilePhoto } from "../../DriverFunctions";
import Strings from "../../../../res/strings";

class ProfilePhoto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Image: null,
            PhotoURL: "./images/defaultProfilePhoto.png",
            UploadProgress: null
        };

        this.onImageUpload = this.onImageUpload.bind(this);
    }

    async componentDidMount() {
        if (localStorage.Token) {
            let request = {
                Token: localStorage.Token,
                Get: "ProfilePhoto"
            };

            await getData(request).then(response => {
                if (response.Message === "Profile photo found.") {
                    let profilePhoto = response.ProfilePhoto;

                    this.setState({
                        PhotoURL: profilePhoto.PhotoURL,
                    });
                }
                else {
                    this.setState({
                        PhotoURL: "./images/defaultProfilePhoto.png"
                    });
                }
            });
        }
    }

    onImageUpload = async event => {
        this.state.Image = event.target.files[0];
        const formData = new FormData();

        try {
            formData.append("Image", this.state.Image, this.state.Image.name);

            await axios.post(Strings.IMAGE_UPLOADER, formData, {
                onUploadProgress: event => {
                    this.setState({
                        UploadProgress: <div className="progress-bar">
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                            <div className="progress-circle"></div>
                        </div>
                    });
                }
            }).then(async response => {
                response = response.data;

                if (response.message === "Image uploaded successfully.") {
                    const driverProfilePhoto = {
                        Token: localStorage.Token,
                        PhotoURL: response.imageUrl,
                        FileName: response.filename
                    };

                    let photoURL = response.imageUrl;

                    await uploadDriverProfilePhoto(driverProfilePhoto).then(response => {
                        if (response.Message === "Profile photo is updated." ||
                            response.Message === "Profile photo is added.") {

                            this.setState({
                                PhotoURL: photoURL,
                                UploadProgress: null
                            });
                        }
                    });
                }
            }).catch(() => {
                this.setState({
                    ImageURL: "./images/defaultProfilePhoto.png",
                    UploadProgress: null
                });
            });
        }
        catch (exception) {
            this.setState({
                UploadProgress: null
            });

            return;
        }
    }

    onSubmit = async event => {
        event.preventDefault();
    }

    render() {
        return <section>
            <input type="file" onChange={this.onImageUpload} style={{ display: "none", }} ref={fileInput => this.fileInput = fileInput} />
            <figure className="media">
                <div className="media-img media-img-has-play ratio-1-1">
                    <a href="#" onClick={() => this.fileInput.click()}>
                        <img style={{
                            border: "5px solid #3A3A3C"
                        }}
                            src={this.state.PhotoURL} alt="ProfilePhoto.png" />
                        <i className="glyph glyph-edit"></i>
                    </a>
                </div>
            </figure>
            {this.state.UploadProgress}
        </section>;
    }
};

export default ProfilePhoto;