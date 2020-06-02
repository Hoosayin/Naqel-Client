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
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}traders/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}traders/get${request.Get}`, {
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

// POST: SendCode
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
        LoadingLat: newJobOffer.LoadingLat,
        LoadingLng: newJobOffer.LoadingLng,
        UnloadingPlace: newJobOffer.UnloadingPlace,
        UnloadingLat: newJobOffer.UnloadingLat,
        UnloadingLng: newJobOffer.UnloadingLng,
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
        LoadingLat: updatedJobOffer.LoadingLat,
        LoadingLng: updatedJobOffer.LoadingLng,
        UnloadingPlace: updatedJobOffer.UnloadingPlace,
        UnloadingLat: updatedJobOffer.UnloadingLat,
        UnloadingLng: updatedJobOffer.UnloadingLng,
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
        headers: { Authorization: `JWT ${discardedJobOffer.Token}` },
        data: { JobOfferID: discardedJobOffer.JobOfferID }
    }).then(response => {
        return response.data;
    });
};

// POST: addATraderRequest
export const addTraderRequest = async newTraderReqeust => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addTraderRequest...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addTraderRequest`, {
        JobRequestID: newTraderReqeust.JobRequestID,
        CargoType: newTraderReqeust.CargoType,
        CargoWeight: newTraderReqeust.CargoWeight,
        LoadingDate: newTraderReqeust.LoadingDate,
        LoadingTime: newTraderReqeust.LoadingTime,
        EntryExit: newTraderReqeust.EntryExit,
        AcceptedDelay: newTraderReqeust.AcceptedDelay
    }, {
        headers: { Authorization: `JWT ${newTraderReqeust.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deleteTraderRequest
export const deleteTraderRequest = async discardedTraderRequest => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}traders/deleteTraderRequest...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}traders/deleteTraderRequest`, {
        headers: { Authorization: `JWT ${discardedTraderRequest.Token}` },
        data: { JobRequestID: discardedTraderRequest.JobRequestID }
    }).then(response => {
        return response.data;
    });
};

// POST: addObjectionReason
export const addObjectionReason = async newObjectionReason => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addObjectionReason...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addObjectionReason`, {
        Reason: newObjectionReason.Reason
    }, {
        headers: { Authorization: `JWT ${newObjectionReason.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addJobObjection
export const addJobObjection = async newJobObjection => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addJobObjection...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addJobObjection`, {
        OnGoingJobID: newJobObjection.OnGoingJobID,
        Reason: newJobObjection.Reason,
        Comment: newJobObjection.Comment
    }, {
        headers: { Authorization: `JWT ${newJobObjection.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: approveJob
export const approveJob = async approvedJob => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/approveJob...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/approveJob`, {}, {
        headers: { Authorization: `JWT ${approvedJob.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addDriverReview
export const addDriverReview = async newDriverReview => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addDriverReview...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addDriverReview`, {
        CompletedJobID: newDriverReview.CompletedJobID,
        Rating: newDriverReview.Rating,
        Review: newDriverReview.Review
    }, {
        headers: { Authorization: `JWT ${newDriverReview.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addOnGoingJobFromJobOffer
export const addOnGoingJobFromJobOffer = async newOnGoingJob => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addOnGoingJobFromJobOffer...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addOnGoingJobFromJobOffer`, {
        DriverRequestID: newOnGoingJob.DriverRequestID,
    }, {
        headers: { Authorization: `JWT ${newOnGoingJob.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addOnGoingJobFromJobRequest
export const addOnGoingJobFromJobRequest = async newOnGoingJob => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addOnGoingJobFromJobRequest...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addOnGoingJobFromJobRequest`, {
        TraderRequestID: newOnGoingJob.TraderRequestID,
    }, {
        headers: { Authorization: `JWT ${newOnGoingJob.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addDriverReviewFromOnGoingJob
export const addDriverReviewFromOnGoingJob = async newDriverReview => {
    console.log(`Sending HTTP POST request to ${Strings.NAQEL_SERVER}traders/addDriverReviewFromOnGoingJob...`);
    return await axios.post(`${Strings.NAQEL_SERVER}traders/addDriverReviewFromOnGoingJob`, {
        OnGoingJobID: newDriverReview.OnGoingJobID,
        Rating: newDriverReview.Rating,
        Review: newDriverReview.Review
    }, {
        headers: { Authorization: `JWT ${newDriverReview.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addTraderPayProof
export const addTraderPayProof = newTraderPayProof => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/addTraderPayProof`, {
        TraderBillID: newTraderPayProof.TraderBillID,
        PhotoURL: newTraderPayProof.PhotoURL
    }, {
        headers: { Authorization: `JWT ${newTraderPayProof.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deleteTraderPayProof
export const deleteTraderPayProof = async discardedTraderPayProof => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}traders/deleteTraderPayProof...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}traders/deleteTraderPayProof`, {
        headers: { Authorization: `JWT ${discardedTraderPayProof.Token}` },
        data: { TraderPayProofID: discardedTraderPayProof.TraderPayProofID }
    }).then(response => {
        return response.data;
    });
};

// POST: getClientSecret
export const getClientSecret = newClientSecret => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/getClientSecret`, {
        Amount: newClientSecret.Amount
    }, {
        headers: { Authorization: `JWT ${newClientSecret.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: requestSpecialBill
export const requestSpecialBill = requestedSpecialBill => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/requestSpecialBill`, {
        TraderBillID: requestedSpecialBill.TraderBillID,
        Amount: requestedSpecialBill.Amount
    }, {
        headers: { Authorization: `JWT ${requestedSpecialBill.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addQuestion
export const addQuestion = newQuestion => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/addQuestion`, {
        Question: newQuestion.Question
    }, {
        headers: { Authorization: `JWT ${newQuestion.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deleteQuestion
export const deleteQuestion = async discardedQuestion => {
    console.log(`Sending HTTP DELETE request to ${Strings.NAQEL_SERVER}traders/deleteQuestion...`);
    return await axios.delete(`${Strings.NAQEL_SERVER}traders/deleteQuestion`, {
        headers: { Authorization: `JWT ${discardedQuestion.Token}` },
        data: { TraderQuestionID: discardedQuestion.TraderQuestionID }
    }).then(response => {
        return response.data;
    });
};

// POST: addTraderPayDetails
export const addTraderPayDetails = newTraderPayDetails => {
    return axios.post(`${Strings.NAQEL_SERVER}traders/addTraderPayDetails`, {
        TraderBillID: newTraderPayDetails.TraderBillID,
        OwnerName: newTraderPayDetails.OwnerName,
        OwnerEmail: newTraderPayDetails.OwnerEmail,
        CardType: newTraderPayDetails.CardType
    }, {
        headers: { Authorization: `JWT ${newTraderPayDetails.Token}` }
    }).then(response => {
        return response.data;
    });
};