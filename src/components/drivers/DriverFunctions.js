import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const registerDriver = async newCredentials => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/register`, {
        Username: newCredentials.Username,
        Email: newCredentials.Email,
        Password: newCredentials.Password,
        RegisterAs: newCredentials.RegisterAs,
    }).then(response => {
        if (response.data.localeCompare(Strings.USERNAME_OR_EMAIL_TAKEN) === 0) {
            return response.data;
        }
        else {
            localStorage.setItem("newCredentialsToken", response.data);
            return response.data;
        }
    });
};

// POST: AccountSetup
export const setupDriverAccount = async newDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/accountSetup`, {
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
    }).then(response => {
        console.log(response.data);
    });
};

// POST: Login
export const loginDriver = async driver => {
    console.log(`Sending HTTP POST request on ${Strings.NAQEL_SERVER}drivers/login`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/login`, {
        EmailOrUsername: driver.EmailOrUsername,
        Password: driver.Password,
        SignInAs: driver.SignInAs,
    }).then(response => {
        return response.data;
    })
};

// GET: GetData
export const getData = async request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}drivers/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}drivers/get${request.Get}`, {
        headers: { Authorization: `JWT ${request.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UploadDriverProfilePhoto
export const uploadDriverProfilePhoto = async driverProfilePhoto => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/uploadDriverProfilePhoto`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/uploadDriverProfilePhoto`, {
        PhotoURL: driverProfilePhoto.PhotoURL,
        FileName: driverProfilePhoto.FileName
    }, {
        headers: { Authorization: `JWT ${driverProfilePhoto.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: GeneralSettings
export const generalSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/generalSettings`, {
        FirstName: updatedDriver.FirstName,
        LastName: updatedDriver.LastName,
        Address: updatedDriver.Address,
        PhoneNumber: updatedDriver.PhoneNumber,
        Gender: updatedDriver.Gender,
        Nationality: updatedDriver.Nationality,
        DateOfBirth: updatedDriver.DateOfBirth,
    }, {
        headers: { Authorization: `JWT ${updatedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateUsername
export const validateUsername = async username => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/validateUsername`, {
        Username: username
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateEmail
export const validateEmail = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/validateEmail`, {
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
export const usernameAndEmailSettings = async updatedDriver => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/usernameAndEmailSettings...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/usernameAndEmailSettings`, {
        Username: updatedDriver.Username,
        Email: updatedDriver.Email
    }, {
        headers: { Authorization: `JWT ${updatedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePassword
export const validatePassword = async passwordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/validatePassword`, {
        Password: passwordPackage.Password
    }, {
        headers: { Authorization: `JWT ${passwordPackage.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/passwordSettings`, {
        Password: updatedDriver.Password,
    }, {
        headers: { Authorization: `JWT ${updatedDriver.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTruck
export const addTruck = async newTruck => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addTruck...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addTruck`, {
        PlateNumber: newTruck.PlateNumber,
        Owner: newTruck.Owner,
        ProductionYear: newTruck.ProductionYear,
        Brand: newTruck.Brand,
        Model: newTruck.Model,
        Type: newTruck.Type,
        MaximumWeight: newTruck.MaximumWeight,
        PhotoURL: newTruck.PhotoURL
    }, {
        headers: { Authorization: `JWT ${newTruck.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateTruckPhoto
export const updateTruckPhoto = async updatedTruck => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateTruckPhoto...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateTruckPhoto`, {
        PhotoURL: updatedTruck.PhotoURL
    }, {
        headers: { Authorization: `JWT ${updatedTruck.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateTruck
export const updateTruck = async updatedTruck => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateTruck...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateTruck`, {
        PlateNumber: updatedTruck.PlateNumber,
        Owner: updatedTruck.Owner,
        ProductionYear: updatedTruck.ProductionYear,
        Brand: updatedTruck.Brand,
        Model: updatedTruck.Model,
        Type: updatedTruck.Type,
        MaximumWeight: updatedTruck.MaximumWeight
    }, {
        headers: { Authorization: `JWT ${updatedTruck.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: AddTrailer
export const addTrailer = async newTrailer => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addTrailer...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addTrailer`, {
        MaximumWeight: newTrailer.MaximumWeight,
        PhotoURL: newTrailer.PhotoURL,
        Type: newTrailer.Type
    }, {
        headers: { Authorization: `JWT ${newTrailer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteTrailer
export const deleteTrailer = async discardedTrailer => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deleteTrailer...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deleteTrailer`, {
        headers: { Authorization: `JWT ${discardedTrailer.Token}` },
        data: { TrailerID: discardedTrailer.TrailerID }
    }).then(response => {
        return response.data;
    });
};

// POST: updateTrailer
export const updateTrailer = updatedTrailer => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateTrailer...`);
    return axios.post(`${Strings.NAQEL_SERVER}drivers/updateTrailer`, {
        TrailerID: updatedTrailer.TrailerID,
        MaximumWeight: updatedTrailer.MaximumWeight,
        PhotoURL: updatedTrailer.PhotoURL,
        Type: updatedTrailer.Type
    }, {
        headers: { Authorization: `JWT ${updatedTrailer.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addDrivingLicence
export const addDrivingLicence = async newDrivingLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addDrivingLicence`, {
        Token: newDrivingLicence.Token,
        LicenceNumber: newDrivingLicence.LicenceNumber,
        Type: newDrivingLicence.Type,
        ReleaseDate: newDrivingLicence.ReleaseDate,
        ExpiryDate: newDrivingLicence.ExpiryDate,
        PhotoURL: newDrivingLicence.PhotoURL,
    }).then(response => {
        return response.data;
    });
};

// POST: updateDrivingLicence
export const updateDrivingLicence = async updatedDrivingLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateDrivingLicence`, {
        Token: updatedDrivingLicence.Token,
        LicenceNumber: updatedDrivingLicence.LicenceNumber,
        Type: updatedDrivingLicence.Type,
        ReleaseDate: updatedDrivingLicence.ReleaseDate,
        ExpiryDate: updatedDrivingLicence.ExpiryDate,
        PhotoURL: updatedDrivingLicence.PhotoURL,
    }).then(response => {
        return response.data;
    });
};

// POST: deleteDrivingLicence
export const deleteDrivingLicence = async discardedDrivingLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/deleteDrivingLicence`, {
        Token: discardedDrivingLicence.Token,
    }).then(response => {
        return response.data;
    });
};

// POST: addEntryExitCard
export const addEntryExitCard = async newEntryExitCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addEntryExitCard`, {
        Token: newEntryExitCard.Token,
        EntryExitNumber: newEntryExitCard.EntryExitNumber,
        Type: newEntryExitCard.Type,
        ReleaseDate: newEntryExitCard.ReleaseDate,
        NumberOfMonths: newEntryExitCard.NumberOfMonths,
    }).then(response => {
        return response.data;
    });
};

// POST: updateEntryExiCard
export const updateEntryExitCard = async updatedEntryExitCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateEntryExitCard`, {
        Token: updatedEntryExitCard.Token,
        EntryExitNumber: updatedEntryExitCard.EntryExitNumber,
        Type: updatedEntryExitCard.Type,
        ReleaseDate: updatedEntryExitCard.ReleaseDate,
        NumberOfMonths: updatedEntryExitCard.NumberOfMonths,
    }).then(response => {
        return response.data;
    });
};

// POST: deleteEntryExitCard
export const deleteEntryExitCard = async discardedEntryExitCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/deleteEntryExitCard`, {
        Token: discardedEntryExitCard.Token,
    }).then(response => {
        return response.data;
    });
};

// POST: addIdentityCard
export const addIdentityCard = async newIdentityCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addIdentityCard`, {
        Token: newIdentityCard.Token,
        IDNumber: newIdentityCard.IDNumber,
        PhotoURL: newIdentityCard.PhotoURL,
    }).then(response => {
        return response.data;
    });
};

// POST: updateIdentityCard
export const updateIdentityCard = async updatedIdentityCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateIdentityCard`, {
        Token: updatedIdentityCard.Token,
        IDNumber: updatedIdentityCard.IDNumber,
        PhotoURL: updatedIdentityCard.PhotoURL,
    }).then(response => {
        return response.data;
    });
};

// POST: deleteIdentityCard
export const deleteIdentityCard = async discardedIdentityCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/deleteIdentityCard`, {
        Token: discardedIdentityCard.Token,
    }).then(response => {
        return response.data;
    });
};

// POST: addPermitLicence
export const addPermitLicence = async newPermitLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addPermitLicence`, {
        Token: newPermitLicence.Token,
        PermitNumber: newPermitLicence.PermitNumber,
        ExpiryDate: newPermitLicence.ExpiryDate,
        PhotoURL: newPermitLicence.PhotoURL,
        Code: newPermitLicence.Code,
        Place: newPermitLicence.Place
    }).then(response => {
        return response.data;
    });
};

// POST: deletePermitLicence
export const deletePermitLicence = async discardedPermitLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/deletePermitLicence`, {
        Token: discardedPermitLicence.Token,
        PermitLicenceID: discardedPermitLicence.PermitLicenceID
    }).then(response => {
        return response.data;
    });
};

// POST: updatePermitLicence
export const updatePermitLicence = async updatedPermitLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updatePermitLicence`, {
        Token: updatedPermitLicence.Token,
        PermitLicenceID: updatedPermitLicence.PermitLicenceID,
        PermitNumber: updatedPermitLicence.PermitNumber,
        ExpiryDate: updatedPermitLicence.ExpiryDate,
        PhotoURL: updatedPermitLicence.PhotoURL,
        Code: updatedPermitLicence.Code,
        Place: updatedPermitLicence.Place
    }).then(response => {
        return response.data;
    });
};

// POST: addJobRequest
export const addJobRequest = async newJobRequest => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addJobRequest`, {
        Token: newJobRequest.Token,
        LoadingPlace: newJobRequest.LoadingPlace,
        UnloadingPlace: newJobRequest.UnloadingPlace,
        TripType: newJobRequest.TripType,
        Price: newJobRequest.Price,
    }).then(response => {
        return response.data;
    });
};

// POST: updateJobRequest
export const updateJobRequest = async updatedJobRequest => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateJobRequest`, {
        Token: updatedJobRequest.Token,
        JobRequestID: updatedJobRequest.JobRequestID,
        LoadingPlace: updatedJobRequest.LoadingPlace,
        UnloadingPlace: updatedJobRequest.UnloadingPlace,
        TripType: updatedJobRequest.TripType,
        Price: updatedJobRequest.Price,
    }).then(response => {
        return response.data;
    });
};

// POST: deleteJobRequest
export const deleteJobRequest = async discardedJobRequest => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/deleteJobRequest`, {
        Token: discardedJobRequest.Token,
        JobRequestID: discardedJobRequest.JobRequestID
    }).then(response => {
        return response.data;
    });
};