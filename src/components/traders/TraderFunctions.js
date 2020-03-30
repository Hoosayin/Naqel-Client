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
export const getData = request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}traders/get${request.Get}...`);
    return axios.get(`${Strings.NAQEL_SERVER}traders/get${request.Get}`, {
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

// POST: addIdentityCard
export const addIdentityCard = newIdentityCard => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/addIdentityCard`, {
        IDNumber: newIdentityCard.IDNumber,
        PhotoURL: newIdentityCard.PhotoURL
    }, {
        headers: { Authorization: `JWT ${newIdentityCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateIdentityCard
export const updateIdentityCard = updatedIdentityCard => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/updateIdentityCard`, {
        IDNumber: updatedIdentityCard.IDNumber,
        PhotoURL: updatedIdentityCard.PhotoURL
    }, {
        headers: { Authorization: `JWT ${updatedIdentityCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteIdentityCard
export const deleteIdentityCard = discardedIdentityCard => {
    return axios.delete(`${Strings.NAQEL_SERVER}traders/deleteIdentityCard`, {
        headers: { Authorization: `JWT ${discardedIdentityCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addCommercialRegisterCertificate
export const addCommercialRegisterCertificate = newCommercialRegisterCertificate => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/addCommercialRegisterCertificate`, {
        Number: newCommercialRegisterCertificate.Number,
        Type: newCommercialRegisterCertificate.Type,
        PhotoURL: newCommercialRegisterCertificate.PhotoURL
    }, {
        headers: { Authorization: `JWT ${newCommercialRegisterCertificate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateCommercialRegisterCertificate
export const updateCommercialRegisterCertificate = updatedCommercialRegisterCertificate => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/updateCommercialRegisterCertificate`, {
        Number: updatedCommercialRegisterCertificate.Number,
        Type: updatedCommercialRegisterCertificate.Type,
        PhotoURL: updatedCommercialRegisterCertificate.PhotoURL
    }, {
        headers: { Authorization: `JWT ${updatedCommercialRegisterCertificate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteCommercialRegisterCertificate
export const deleteCommercialRegisterCertificate = discardedCommercialRegisterCertificate => {
    return axios.delete(`${Strings.NAQEL_SERVER}traders/deleteCommercialRegisterCertificate`, {
        headers: { Authorization: `JWT ${discardedCommercialRegisterCertificate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addJobOffer
export const addJobOffer = async newJobOffer => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addJobOffer`, {
        TripType: newJobOffer.TripType,
        CargoType: newJobOffer.CargoType,
        CargoWeight: newJobOffer.CargoWeight,
        LoadingPlace: newJobOffer.LoadingPlace,
        UnloadingPlace: newJobOffer.UnloadingPlace,
        LoadingDate: newJobOffer.LoadingDate,
        LoadingTime: newJobOffer.LoadingTime,
        EntryExit: newJobOffer.EntryExit,
        Price: newJobOffer.Price,
        AcceptedDelay: newJobOffer.AcceptedDelay,
        JobOfferType: newJobOffer.JobOfferType
    }, {
        headers: { Authorization: `JWT ${newJobOffer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateJobOffer
export const updateJobOffer = async updatedJobOffer => {
    return await axios.post(`${Strings.NAQEL_SERVER}traders/updateJobOffer`, {
        JobOfferID: updatedJobOffer.JobOfferID,
        TripType: updatedJobOffer.TripType,
        CargoType: updatedJobOffer.CargoType,
        CargoWeight: updatedJobOffer.CargoWeight,
        LoadingPlace: updatedJobOffer.LoadingPlace,
        UnloadingPlace: updatedJobOffer.UnloadingPlace,
        LoadingDate: updatedJobOffer.LoadingDate,
        LoadingTime: updatedJobOffer.LoadingTime,
        EntryExit: updatedJobOffer.EntryExit,
        Price: updatedJobOffer.Price,
        AcceptedDelay: updatedJobOffer.AcceptedDelay,
        JobOfferType: updatedJobOffer.JobOfferType
    }, {
        headers: { Authorization: `JWT ${updatedJobOffer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deleteJobOffer
export const deleteJobOffer = async discardedJobOffer => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}traders/deleteJobOffer...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}traders/deleteJobOffer`, {
        JobOfferID: discardedJobOffer.JobOfferID
    }, {
        headers: { Authorization: `JWT ${discardedJobOffer.Token}` }
    }).then(response => {
        return response.data;
    });
};