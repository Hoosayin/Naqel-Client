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

// POST: GeneralSettings
export const generalSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/generalSettings`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/usernameAndEmailSettings`, {
        Token: updatedDriver.Token,
        Username: updatedDriver.Username,
        Email: updatedDriver.Email,
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/passwordSettings`, {
        Token: updatedDriver.Token,
        Password: updatedDriver.Password,
    }).then(response => {
        return response.data;
    });
};

// POST: UploadDriverProfilePhoto
export const uploadDriverProfilePhoto = async driverProfilePhoto => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/uploadDriverProfilePhoto`, {
        Token: driverProfilePhoto.Token,
        URL: driverProfilePhoto.URL,
        FileName: driverProfilePhoto.FileName
    }).then(response => {
        return response.data;
    });
};

// POST: AddTruck
export const addTruck = async newTruck => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addTruck`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateTruckPhoto`, {
        Token: updatedTruck.Token,
        PhotoURL: updatedTruck.PhotoURL
    }).then(response => {
        return response.data;
    });
};

// POST: UpdateTruck
export const updateTruck = async updatedTruck => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateTruck`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addTrailer`, {
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
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/deleteTrailer`, {
        Token: discardedTrailer.Token,
        TrailerID: discardedTrailer.TrailerID
    }).then(response => {
        return response.data;
    });
};

// POST: updateTrailer
export const updateTrailer = async updatedTrailer => {
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateTrailer`, {
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