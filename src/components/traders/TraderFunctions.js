import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const registerTrader = async newCredentials => {
    console.log("I'm in registerTrader axios...");
    return await axios.post(`${Strings.NAQEL_SERVER}traders/register`, {
        Username: newCredentials.Username,
        Email: newCredentials.Email,
        Password: newCredentials.Password,
        RegisterAs: newCredentials.RegisterAs,
    }).then(res => {
        if (res.data.localeCompare(Strings.USERNAME_OR_EMAIL_TAKEN) === 0) {
            return res.data;
        }
        else {
            localStorage.setItem("newCredentialsToken", res.data);
            return res.data;
        }
    });
};

// POST: AccountSetup
export const setupTraderAccount = async newTrader => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/accountSetup`, {
        Username: newTrader.Username,
        Email: newTrader.Email,
        Password: newTrader.Password,
        RegisterAs: newTrader.RegisterAs,
        FirstName: newTrader.FirstName,
        LastName: newTrader.LastName,
        DateOfBirth: newTrader.DateOfBirth,
        Gender: newTrader.Gender,
        Address: newTrader.Address,
        PhoneNumber: newTrader.PhoneNumber,
        Nationality: newTrader.Nationality,
    }).then(res => {
        console.log(res.data);
    });
};

// POST: Login
export const loginTrader = async trader => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/login`, {
        EmailOrUsername: trader.EmailOrUsername,
        Password: trader.Password
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
};

// GET: GetData
export const getData = async request => {
    return await axios.get(`${Strings.NAQEL_SERVER}traders/get${request.Get}`, {
        headers: { Authorization: `JWT ${request.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UploadDriverProfilePhoto
export const uploadTraderProfilePhoto = async traderProfilePhoto => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/uploadTraderProfilePhoto`, {
        PhotoURL: traderProfilePhoto.PhotoURL,
        FileName: traderProfilePhoto.FileName
    }, {
        headers: { Authorization: `JWT ${traderProfilePhoto.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: GeneralSettings
export const generalSettings = async updatedTrader => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/generalSettings`, {
        FirstName: updatedTrader.FirstName,
        LastName: updatedTrader.LastName,
        Address: updatedTrader.Address,
        PhoneNumber: updatedTrader.PhoneNumber,
        Gender: updatedTrader.Gender,
        Nationality: updatedTrader.Nationality,
        DateOfBirth: updatedTrader.DateOfBirth,
    }, {
        headers: { Authorization: `JWT ${updatedTrader.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateUsername
export const validateUsername = async username => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/validateUsername`, {
        Username: username
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateEmail
export const validateEmail = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/validateEmail`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POSTL SendCode
export const sendCode = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/sendCode`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POST: UsernameAndEmailSettings
export const usernameAndEmailSettings = async updatedTrader => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/usernameAndEmailSettings`, {
        Username: updatedTrader.Username,
        Email: updatedTrader.Email
    }, {
        headers: { Authorization: `JWT ${updatedTrader.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePassword
export const validatePassword = async passwordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/validatePassword`, {
        Password: passwordPackage.Password
    }, {
        headers: { Authorization: `JWT ${passwordPackage.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedTrader => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/passwordSettings`, {
        Password: updatedTrader.Password,
    }, {
        headers: { Authorization: `JWT ${updatedTrader.Token}` }
    }).then(response => {
        return response.data;
    });
};