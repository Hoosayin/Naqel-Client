const Language = localStorage.Language;
const currencey = (!Language || Language === "English") ? "SR" : "ريال"; 

module.exports = {
    APP_NAME: "Naqel",
    USER_TOKEN: "userToken",
    USER_NOT_FOUND: "Username not found.",
    INVALID_PASSWORD: "Invalid password.",
    USERNAME_OR_EMAIL_TAKEN: "Username or email is already taken.",
    NAQEL_SERVER: "https://naqelserver.azurewebsites.net/",
    IMAGE_UPLOADER: "https://us-central1-naqel-transport-jobs.cloudfunctions.net/uploadImage",
    STRIPE_PUBLISHABLE_KEY: "pk_test_Wjc5dIC6ytMmH3g1roSUOYcm00FaTN1yBn",
    STRIPE_SECRET_KEY: "sk_test_RVhdSfOgg0jQHCYLYH8Z05JM00bkPnPBVg",
    GOOGLE_API_KEY: "AIzaSyDezgtwvxs_HZGG8Dlkbt4Bi4IGymlvUnM",
    SAUDI_RIYAL: currencey,
    SANDBOX_API_KEY: "049RBmcjsZobtJu6jfqP02r1TNQBjZN8ZfUz25gr8FBBg9dXM8"
};