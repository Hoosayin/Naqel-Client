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
        params: request.Params,
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
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addDrivingLicence...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addDrivingLicence`, {
        LicenceNumber: newDrivingLicence.LicenceNumber,
        Type: newDrivingLicence.Type,
        ReleaseDate: newDrivingLicence.ReleaseDate,
        ExpiryDate: newDrivingLicence.ExpiryDate,
        PhotoURL: newDrivingLicence.PhotoURL,
    }, {
        headers: { Authorization: `JWT ${newDrivingLicence.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateDrivingLicence
export const updateDrivingLicence = async updatedDrivingLicence => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateDrivingLicence...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateDrivingLicence`, {
        LicenceNumber: updatedDrivingLicence.LicenceNumber,
        Type: updatedDrivingLicence.Type,
        ReleaseDate: updatedDrivingLicence.ReleaseDate,
        ExpiryDate: updatedDrivingLicence.ExpiryDate,
        PhotoURL: updatedDrivingLicence.PhotoURL,
    }, {
        headers: { Authorization: `JWT ${updatedDrivingLicence.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteDrivingLicence
export const deleteDrivingLicence = async discardedDrivingLicence => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deleteDrivingLicence...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deleteDrivingLicence`, {
            headers: { Authorization: `JWT ${discardedDrivingLicence.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addEntryExitCard
export const addEntryExitCard = async newEntryExitCard => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addEntryExitCard...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addEntryExitCard`, {
        EntryExitNumber: newEntryExitCard.EntryExitNumber,
        Type: newEntryExitCard.Type,
        ReleaseDate: newEntryExitCard.ReleaseDate,
        NumberOfMonths: newEntryExitCard.NumberOfMonths,
    }, {
        headers: { Authorization: `JWT ${newEntryExitCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateEntryExiCard
export const updateEntryExitCard = async updatedEntryExitCard => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateEntryExitCard...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateEntryExitCard`, {
        EntryExitNumber: updatedEntryExitCard.EntryExitNumber,
        Type: updatedEntryExitCard.Type,
        ReleaseDate: updatedEntryExitCard.ReleaseDate,
        NumberOfMonths: updatedEntryExitCard.NumberOfMonths,
    }, {
        headers: { Authorization: `JWT ${updatedEntryExitCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteEntryExitCard
export const deleteEntryExitCard = async discardedEntryExitCard => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deleteEntryExitCard...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deleteEntryExitCard`, {
        headers: { Authorization: `JWT ${discardedEntryExitCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addIdentityCard
export const addIdentityCard = async newIdentityCard => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addIdentityCard...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addIdentityCard`, {
        Token: newIdentityCard.Token,
        IDNumber: newIdentityCard.IDNumber,
        PhotoURL: newIdentityCard.PhotoURL,
    }, {
        headers: { Authorization: `JWT ${newIdentityCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateIdentityCard
export const updateIdentityCard = async updatedIdentityCard => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateIdentityCard...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateIdentityCard`, {
        Token: updatedIdentityCard.Token,
        IDNumber: updatedIdentityCard.IDNumber,
        PhotoURL: updatedIdentityCard.PhotoURL,
    }, {
        headers: { Authorization: `JWT ${updatedIdentityCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteIdentityCard
export const deleteIdentityCard = async discardedIdentityCard => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deleteIdentityCard...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deleteIdentityCard`, {
        headers: { Authorization: `JWT ${discardedIdentityCard.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addPermitLicence
export const addPermitLicence = async newPermitLicence => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addPermitLicence...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addPermitLicence`, {
        PermitNumber: newPermitLicence.PermitNumber,
        ExpiryDate: newPermitLicence.ExpiryDate,
        PhotoURL: newPermitLicence.PhotoURL,
        Code: newPermitLicence.Code,
        Place: newPermitLicence.Place
    }, {
        headers: { Authorization: `JWT ${newPermitLicence.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deletePermitLicence
export const deletePermitLicence = async discardedPermitLicence => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deletePermitLicence...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deletePermitLicence`, {
        headers: { Authorization: `JWT ${discardedPermitLicence.Token}` },
        data: { PermitLicenceID: discardedPermitLicence.PermitLicenceID }
    }).then(response => {
        return response.data;
    });
};

// POST: updatePermitLicence
export const updatePermitLicence = async updatedPermitLicence => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updatePermitLicence...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updatePermitLicence`, {
        PermitLicenceID: updatedPermitLicence.PermitLicenceID,
        PermitNumber: updatedPermitLicence.PermitNumber,
        ExpiryDate: updatedPermitLicence.ExpiryDate,
        PhotoURL: updatedPermitLicence.PhotoURL,
        Code: updatedPermitLicence.Code,
        Place: updatedPermitLicence.Place
    }, {
        headers: { Authorization: `JWT ${updatedPermitLicence.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addJobRequest
export const addJobRequest = async newJobRequest => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addJobRequest...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addJobRequest`, {
        LoadingPlace: newJobRequest.LoadingPlace,
        UnloadingPlace: newJobRequest.UnloadingPlace,
        TripType: newJobRequest.TripType,
        Price: newJobRequest.Price,
    }, {
        headers: { Authorization: `JWT ${newJobRequest.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: updateJobRequest
export const updateJobRequest = async updatedJobRequest => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/updateJobRequest...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/updateJobRequest`, {
        JobRequestID: updatedJobRequest.JobRequestID,
        LoadingPlace: updatedJobRequest.LoadingPlace,
        UnloadingPlace: updatedJobRequest.UnloadingPlace,
        TripType: updatedJobRequest.TripType,
        Price: updatedJobRequest.Price,
    }, {
        headers: { Authorization: `JWT ${updatedJobRequest.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: deleteJobRequest
export const deleteJobRequest = async discardedJobRequest => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deleteJobRequest...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deleteJobRequest`, {
        headers: { Authorization: `JWT ${discardedJobRequest.Token}` },
        data: { JobRequestID: discardedJobRequest.JobRequestID }
    }).then(response => {
        return response.data;
    });
};

// POST: addDriverRequest
export const addDriverRequest = async newDriverRequest => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addDriverRequest...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addDriverRequest`, {
        JobOfferID: newDriverRequest.JobOfferID,
        Price: newDriverRequest.Price
    }, {
        headers: { Authorization: `JWT ${newDriverRequest.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deleteDriverRequest
export const deleteDriverRequest = async discardedDriverRequest => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}drivers/deleteDriverRequest...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}drivers/deleteDriverRequest`, {
        headers: { Authorization: `JWT ${discardedDriverRequest.Token}` },
        data: { JobOfferID: discardedDriverRequest.JobOfferID }
    }).then(response => {
        return response.data;
    });
};

// POST: addOnGoingJob
export const addOnGoingJob = async newOnGoingJob => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addOnGoingJob...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addOnGoingJob`, {
        TraderRequestID: newOnGoingJob.TraderRequestID
    }, {
        headers: { Authorization: `JWT ${newOnGoingJob.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addObjectionReason
export const addObjectionReason = async newObjectionReason => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addObjectionReason...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addObjectionReason`, {
        Reason: newObjectionReason.Reason
    }, {
        headers: { Authorization: `JWT ${newObjectionReason.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addJobObjection
export const addJobObjection = async newJobObjection => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/addJobObjection...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/addJobObjection`, {
        OnGoingJobID: newJobObjection.OnGoingJobID,
        Reason: newJobObjection.Reason,
        Comment: newJobObjection.Comment
    }, {
        headers: { Authorization: `JWT ${newJobObjection.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: finishJob
export const finishJob = async finishedJob => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}drivers/finishJob...`);
    return await axios.post(`${Strings.NAQEL_SERVER}drivers/finishJob`, {}, {
        headers: { Authorization: `JWT ${finishedJob.Token}` }
    }).then(response => {
        return response.data;
    });
};