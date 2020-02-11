import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const register = newCredentials => {
    return axios.post(`${Strings.NAQEL_SERVER}users/register`, {
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
    }).then(res => {
        console.log(res.data);
    });
};

// POST: Login
export const login = driver => {
    console.log("POST to /login");
    return axios.post(`${Strings.NAQEL_SERVER}users/login`, {
        EmailOrUsername: driver.EmailOrUsername,
        Password: driver.Password,
        SignInAs: driver.SignInAs,
    }).then(res => {
        if (res.data.localeCompare(Strings.USER_NOT_FOUND) === 0 ||
            res.data.localeCompare(Strings.INVALID_PASSWORD) === 0) {
            return res.data;
        }
        else {
            localStorage.setItem('userToken', res.data);
            return res.data;
        }
    }).catch(error => {
        console.log(error);
    });
};

// POST: GeneralSettings
export const generalSettings = updatedDriver => {
    return axios.post(`${Strings.NAQEL_SERVER}users/dashboard/generalSettings`, {
        DriverID: updatedDriver.DriverID,
        FirstName: updatedDriver.FirstName,
        LastName: updatedDriver.LastName,
        Address: updatedDriver.Address,
        PhoneNumber: updatedDriver.PhoneNumber,
        Gender: updatedDriver.Gender,
        Nationality: updatedDriver.Nationality,
        DateOfBirth: updatedDriver.DateOfBirth,
    }).then(res => {
        console.log(res.data);
    });
};

// POST: UsernameAndEmailSettings
export const usernameAndEmailSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/usernameAndEmailSettings`, {
        DriverID: updatedDriver.DriverID,
        Username: updatedDriver.Username,
        Email: updatedDriver.Email,
    }).then(res => {
        return res.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedDriver => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/passwordSettings`, {
        DriverID: updatedDriver.DriverID,
        Password: updatedDriver.Password,
    }).then(res => {
        return res.data;
    });
};

// POST: UploadDriverProfilePhoto
export const uploadDriverProfilePhoto = async driverProfilePhoto => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/uploadDriverProfilePhoto`, {
        DriverID: driverProfilePhoto.DriverID,
        URL: driverProfilePhoto.URL,
        FileName: driverProfilePhoto.FileName
    }).then(res => {
        return res.data;
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
    }).then(res => {
        return res.data;
    });
};

// POST: UpdateTruckPhoto
export const updateTruckPhoto = async updatedTruck => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/updateTruckPhoto`, {
        Token: updatedTruck.Token,
        PhotoURL: updatedTruck.PhotoURL
    }).then(res => {
        return res.data;
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
    }).then(res => {
        return res.data;
    });
};

// POST: AddTrailer
export const addTrailer = async newTrailer => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/addTrailer`, {
        Token: newTrailer.Token,
        MaximumWeight: newTrailer.MaximumWeight,
        PhotoURL: newTrailer.PhotoURL,
        Type: newTrailer.Type
    }).then(res => {
        return res.data;
    });
};

// POST: deleteTrailer
export const deleteTrailer = async discardedTrailer => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteTrailer`, {
        Token: discardedTrailer.Token,
        TrailerID: discardedTrailer.TrailerID
    }).then(res => {
        return res.data;
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
    }).then(res => {
        return res.data;
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
    }).then(res => {
        return res.data;
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
    }).then(res => {
        return res.data;
    });
};

// POST: deleteDrivingLicence
export const deleteDrivingLicence = async discardedDrivingLicence => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/dashboard/deleteDrivingLicence`, {
        Token: discardedDrivingLicence.Token,
    }).then(res => {
        return res.data;
    });
};