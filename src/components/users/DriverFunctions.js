import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const register = newCredentials => {
    return axios.post(`${Strings.NAQEL_SERVER}users/register`, {
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
export const accountSetup = newDriver => {
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
    }).then(response => {
        console.log(response.data);
    });
};

// POST: Login
export const login = driver => {
    console.log("POST to /login");
    return axios.post(`${Strings.NAQEL_SERVER}users/login`, {
        EmailOrUsername: driver.EmailOrUsername,
        Password: driver.Password,
        SignInAs: driver.SignInAs,
    }).then(response => {
        if (response.data.localeCompare(Strings.USER_NOT_FOUND) === 0 ||
            response.data.localeCompare(Strings.INVALID_PASSWORD) === 0) {
            return response.data;
        }
        else {
            localStorage.setItem('userToken', response.data);
            return response.data;
        }
    }).catch(error => {
        console.log(error);
    });
};

// POST: GeneralSettings
export const generalSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/generalSettings`, {
        Token: updatedDriver.Token,
        FirstName: updatedDriver.FirstName,
        LastName: updatedDriver.LastName,
        Address: updatedDriver.Address,
        PhoneNumber: updatedDriver.PhoneNumber,
        Gender: updatedDriver.Gender,
        Nationality: updatedDriver.Nationality,
        DateOfBirth: updatedDriver.DateOfBirth,
    }).then(response => {
        return response.data;
    });
};

// POST: UsernameAndEmailSettings
export const usernameAndEmailSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/usernameAndEmailSettings`, {
        Token: updatedDriver.Token,
        Username: updatedDriver.Username,
        Email: updatedDriver.Email,
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/passwordSettings`, {
        Token: updatedDriver.Token,
        Password: updatedDriver.Password,
    }).then(response => {
        return response.data;
    });
};

// POST: UploadDriverProfilePhoto
export const uploadDriverProfilePhoto = async driverProfilePhoto => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/uploadDriverProfilePhoto`, {
        DriverID: driverProfilePhoto.DriverID,
        URL: driverProfilePhoto.URL,
        FileName: driverProfilePhoto.FileName
    }).then(response => {
        return response.data;
    });
};

// POST: AddTruck
export const addTruck = async newTruck => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addTruck`, {
        Token: newTruck.Token,
        PlateNumber: newTruck.PlateNumber,
        Owner: newTruck.Owner,
        ProductionYear: newTruck.ProductionYear,
        Brand: newTruck.Brand,
        Model: newTruck.Model,
        Type: newTruck.Type,
        MaximumWeight: newTruck.MaximumWeight,
        PhotoURL: newTruck.PhotoURL
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateTruckPhoto
export const updateTruckPhoto = async updatedTruck => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateTruckPhoto`, {
        Token: updatedTruck.Token,
        PhotoURL: updatedTruck.PhotoURL
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateTruck
export const updateTruck = async updatedTruck => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateTruck`, {
        Token: updatedTruck.Token,
        PlateNumber: updatedTruck.PlateNumber,
        Owner: updatedTruck.Owner,
        ProductionYear: updatedTruck.ProductionYear,
        Brand: updatedTruck.Brand,
        Model: updatedTruck.Model,
        Type: updatedTruck.Type,
        MaximumWeight: updatedTruck.MaximumWeight
    }).then(response => {
        return response.data;
    });
};

// POST: AddTrailer
export const addTrailer = async newTrailer => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addTrailer`, {
        Token: newTrailer.Token,
        MaximumWeight: newTrailer.MaximumWeight,
        PhotoURL: newTrailer.PhotoURL,
        Type: newTrailer.Type
    }).then(response => {
        return response.data;
    });
};

// POST: deleteTrailer
export const deleteTrailer = async discardedTrailer => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteTrailer`, {
        Token: discardedTrailer.Token,
        TrailerID: discardedTrailer.TrailerID
    }).then(response => {
        return response.data;
    });
};

// POST: updateTrailer
export const updateTrailer = async updatedTrailer => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateTrailer`, {
        Token: updatedTrailer.Token,
        TrailerID: updatedTrailer.TrailerID,
        MaximumWeight: updatedTrailer.MaximumWeight,
        PhotoURL: updatedTrailer.PhotoURL,
        Type: updatedTrailer.Type
    }).then(response => {
        return response.data;
    });
};

// POST: addDrivingLicence
export const addDrivingLicence = async newDrivingLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addDrivingLicence`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateDrivingLicence`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteDrivingLicence`, {
        Token: discardedDrivingLicence.Token,
    }).then(response => {
        return response.data;
    });
};

// POST: addEntryExitCard
export const addEntryExitCard = async newEntryExitCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addEntryExitCard`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateEntryExitCard`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteEntryExitCard`, {
        Token: discardedEntryExitCard.Token,
    }).then(response => {
        return response.data;
    });
};

// POST: addIdentityCard
export const addIdentityCard = async newIdentityCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addIdentityCard`, {
        Token: newIdentityCard.Token,
        IDNumber: newIdentityCard.IDNumber,
        PhotoURL: newIdentityCard.PhotoURL,
    }).then(response => {
        return response.data;
    });
};

// POST: updateIdentityCard
export const updateIdentityCard = async updatedIdentityCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateIdentityCard`, {
        Token: updatedIdentityCard.Token,
        IDNumber: updatedIdentityCard.IDNumber,
        PhotoURL: updatedIdentityCard.PhotoURL,
    }).then(response => {
        return response.data;
    });
};

// POST: deleteIdentityCard
export const deleteIdentityCard = async discardedIdentityCard => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteIdentityCard`, {
        Token: discardedIdentityCard.Token,
    }).then(response => {
        return response.data;
    });
};

// POST: addPermitLicence
export const addPermitLicence = async newPermitLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addPermitLicence`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deletePermitLicence`, {
        Token: discardedPermitLicence.Token,
        PermitLicenceID: discardedPermitLicence.PermitLicenceID
    }).then(response => {
        return response.data;
    });
};

// POST: updatePermitLicence
export const updatePermitLicence = async updatedPermitLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updatePermitLicence`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addJobRequest`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateJobRequest`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteJobRequest`, {
        Token: discardedJobRequest.Token,
        JobRequestID: discardedJobRequest.JobRequestID
    }).then(response => {
        return response.data;
    });
};