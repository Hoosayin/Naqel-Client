import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const traderRegister = newCredentials => {
    return axios.post(`${Strings.NAQEL_SERVER}users/traderRegister`, {
        Username: newCredentials.Username,
        Email: newCredentials.Email,
        Password: newCredentials.Password,
        RegisterAs: newCredentials.RegisterAs,
    })
        .then(res => {
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
export const TraderAccountSetup = newDriver => {
    return axios.post(`${Strings.NAQEL_SERVER}users/accountSetup`, {
        Username: newDriver.Username,
        Email: newDriver.Email,
        Password: newDriver.Password,
        RegisterAs: newDriver.RegisterAs,
        FirstName: newDriver.FirstName,
        LastName: newDriver.LastName,
        DateOfBirth: newDriver.DateOfBirth,
        Gender: newDriver.Gender,
        Address: newDriver.Address,
        PhoneNumber: newDriver.PhoneNumber,
        Nationality: newDriver.Nationality,
    })
        .then(res => {
            console.log(res.data);
        });
};

// POST: Login
export const traderBrokerLogin = driver => {
    return axios.post(`${Strings.NAQEL_SERVER}users/traderbrokerlogin`, {
        EmailOrUsername: driver.EmailOrUsername,
        Password: driver.Password,
        SignInAs: driver.SignInAs,
    })
        .then(res => {
            if (res.data.localeCompare(Strings.USER_NOT_FOUND) === 0 ||
                res.data.localeCompare(Strings.INVALID_PASSWORD) === 0) {
                return res.data;
            }
            else {
                localStorage.setItem('userToken', res.data);
                return res.data;
            }
        })
        .catch(error => {
            console.log(error);
        });
};


// POST: GeneralSettings
export const generalSettings = updatedDriver => {
    return axios.post(`${Strings.NAQEL_SERVER}users/dashboard/tbgeneralSettings`, {
        TraderID: updatedDriver.TraderID,
        FName: updatedDriver.FName,
        LName: updatedDriver.LName,
        Address: updatedDriver.Address,
        MobileNum: updatedDriver.MobileNum,
        Gender: updatedDriver.Gender,
        Nationality: updatedDriver.Nationality,
        BirthDate: updatedDriver.BirthDate,
    })
        .then(res => {
            console.log(res.data);
        });
};

// POST: UsernameAndEmailSettings
export const usernameAndEmailSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/tbusernameAndEmailSettings`, {
        TraderID: updatedDriver.TraderID,
        UserName: updatedDriver.UserName,
        Email: updatedDriver.Email,
    })
        .then(res => {
            return res.data;
        });
};

// POST: PasswordSettings
export const passwordSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/tbpasswordSettings`, {
        TraderID: updatedDriver.TraderID,
        Password: updatedDriver.Password,
    })
        .then(res => {
            return res.data;
        });
};

// POST: UploadDriverProfilePhoto
export const uploadTraderBrokerProfilePhoto = async traderProfilePhoto => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/uploadTraderBrokerProfilePhoto`, {
        TraderID: traderProfilePhoto.TraderID,
        URL: traderProfilePhoto.URL,
        FileName: traderProfilePhoto.FileName
    }).then(res => {
        return res.data;
    });
};
