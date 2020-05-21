import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const registerAdministrator = async newCredentials => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/register`, {
        Username: newCredentials.Username,
        Email: newCredentials.Email,
        Password: newCredentials.Password,
        RegisterAs: newCredentials.RegisterAs,
    }).then(response => {
        return response.data;
    });
};

// POST: AccountSetup
export const setupAdministratorAccount = async newAdministrator => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/setupAccount`, {
        Username: newAdministrator.Username,
        Email: newAdministrator.Email,
        Password: newAdministrator.Password,
        RegisterAs: newAdministrator.RegisterAs,
        FirstName: newAdministrator.FirstName,
        LastName: newAdministrator.LastName,
        AdministratorSecret: newAdministrator.AdministratorSecret
    }).then(response => {
        return response.data;
    });
};

// POST: Login
export const loginAdministrator = async administrator => {
    console.log(`Sending HTTP POST request on ${Strings.NAQEL_SERVER}administrators/login`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/login`, {
        EmailOrUsername: administrator.EmailOrUsername,
        Password: administrator.Password,
        SignInAs: administrator.SignInAs,
    }).then(response => {
        return response.data;
    })
};

// GET: GetData
export const getData = async request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}administrators/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}administrators/get${request.Get}`, {
        params: request.Params,
        headers: { Authorization: `JWT ${request.Token}` }
    }).then(response => {
        return response.data;
    });
};

// GET: GetPublicData
export const getPublicData = async request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}users/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}users/get${request.Get}`, {
        params: request.Params
    }).then(response => {
        return response.data;
    });
};

// POST: uploadProfilePhoto
export const uploadProfilePhoto = async profilePhoto => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/uploadProfilePhoto`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/uploadProfilePhoto`, {
        PhotoURL: profilePhoto.PhotoURL
    }, {
        headers: { Authorization: `JWT ${profilePhoto.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: GeneralSettings
export const generalSettings = async updatedAdministrator => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/generalSettings`, {
        FirstName: updatedAdministrator.FirstName,
        LastName: updatedAdministrator.LastName
    }, {
        headers: { Authorization: `JWT ${updatedAdministrator.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateUsername
export const validateUsername = async username => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validateUsername`, {
        Username: username
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateEmail
export const validateEmail = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validateEmail`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POSTL SendCode
export const sendCode = async email => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}users/sendCode...`);
    return await axios.post(`${Strings.NAQEL_SERVER}users/sendCode`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POST: UsernameAndEmailSettings
export const usernameAndEmailSettings = async updatedAdministrator => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/usernameAndEmailSettings...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/usernameAndEmailSettings`, {
        Username: updatedAdministrator.Username,
        Email: updatedAdministrator.Email
    }, {
        headers: { Authorization: `JWT ${updatedAdministrator.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePassword
export const validatePassword = async passwordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/validatePassword`, {
        Password: passwordPackage.Password
    }, {
        headers: { Authorization: `JWT ${passwordPackage.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedAdministrator => {
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/passwordSettings`, {
        Password: updatedAdministrator.Password,
    }, {
        headers: { Authorization: `JWT ${updatedAdministrator.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ActivateDriverAccount
export const activateDriverAccount = async activatedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/activateDriverAccount...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/activateDriverAccount`, {
        DriverID: activatedDriver.DriverID
    }, {
        headers: { Authorization: `JWT ${activatedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: BlockDriverAccount
export const blockDriverAccount = async blockedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/blockDriverAccount...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/blockDriverAccount`, {
        DriverID: blockedDriver.DriverID,
        BlockDate: blockedDriver.BlockDate,
        Reason: blockedDriver.Reason
    }, {
        headers: { Authorization: `JWT ${blockedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UnblockDriverAccount
export const unblockDriverAccount = async unblockedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}administrators/unblockDriverAccount...`);
    return await axios.post(`${Strings.NAQEL_SERVER}administrators/unblockDriverAccount`, {
        DriverID: unblockedDriver.DriverID,
    }, {
        headers: { Authorization: `JWT ${unblockedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};
