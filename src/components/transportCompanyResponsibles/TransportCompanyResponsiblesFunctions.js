import axios from "axios";
import Strings from "../../res/strings";

// POST: Register
export const registerTransportCompanyResponsible = async newCredentials => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/register`, {
        Username: newCredentials.Username,
        PhoneNumber: newCredentials.PhoneNumber,
        Password: newCredentials.Password,
        RegisterAs: newCredentials.RegisterAs,
    }).then(response => {
        return response.data;
    });
};

// POST: AccountSetup
export const setupTransportCompanyResponsibleAccount = async newTransportCompanyResponsible => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/setupAccount`, {
        Username: newTransportCompanyResponsible.Username,
        Email: newTransportCompanyResponsible.Email,
        Password: newTransportCompanyResponsible.Password,
        RegisterAs: newTransportCompanyResponsible.RegisterAs,
        Name: newTransportCompanyResponsible.Name,
        PhoneNumber: newTransportCompanyResponsible.PhoneNumber
    }).then(response => {
        return response.data;
    });
};

// POST: Login
export const loginTransportCompanyResponsible = async transportCompanyResponsible => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/login`, {
        PhoneNumberOrUsername: transportCompanyResponsible.PhoneNumberOrUsername,
        Password: transportCompanyResponsible.Password,
        SignInAs: transportCompanyResponsible.SignInAs,
    }).then(response => {
        return response.data;
    })
};

// POST: RecoverPassword
export const recoverPassword = async recoverPasswordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/recoverPassword`, {
        PhoneNumber: recoverPasswordPackage.PhoneNumber,
        Password: recoverPasswordPackage.Password
    }).then(response => {
        return response.data;
    });
};

// GET: GetData
export const getData = async request => {
    return await axios.get(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/get${request.Get}`, {
        params: request.Params,
        headers: { Authorization: `JWT ${request.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addCommercialRegisterCertificate
export const addCommercialRegisterCertificate = newCommercialRegisterCertificate => {
    return axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/addCommercialRegisterCertificate`, {
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
    return axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/updateCommercialRegisterCertificate`, {
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
    return axios.delete(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/deleteCommercialRegisterCertificate`, {
        headers: { Authorization: `JWT ${discardedCommercialRegisterCertificate.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: GeneralSettings
export const generalSettings = async updatedTransportCompanyResponsible => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/generalSettings`, {
        Name: updatedTransportCompanyResponsible.Name,
        PhoneNumber: updatedTransportCompanyResponsible.PhoneNumber
    }, {
        headers: { Authorization: `JWT ${updatedTransportCompanyResponsible.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateUsername
export const validateUsername = async username => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/validateUsername`, {
        Username: username
    }).then(response => {
        return response.data;
    });
};

// POST: ValidateEmail
export const validateEmail = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/validateEmail`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePhoneNumber
export const validatePhoneNumber = async phoneNumber => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/validatePhoneNumber`, {
        PhoneNumber: phoneNumber
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
export const usernameAndEmailSettings = async updatedTransportCompanyResponsible => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/usernameAndEmailSettings`, {
        Username: updatedTransportCompanyResponsible.Username,
        Email: updatedTransportCompanyResponsible.Email
    }, {
        headers: { Authorization: `JWT ${updatedTransportCompanyResponsible.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: ValidatePassword
export const validatePassword = async passwordPackage => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/validatePassword`, {
        Password: passwordPackage.Password
    }, {
        headers: { Authorization: `JWT ${passwordPackage.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: PasswordSettings
export const passwordSettings = async updatedTransportCompanyResponsible => {
    return await axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/passwordSettings`, {
        Password: updatedTransportCompanyResponsible.Password,
    }, {
        headers: { Authorization: `JWT ${updatedTransportCompanyResponsible.Token}` }
    }).then(response => {
        return response.data;
    });
};

// POST: addQuestion
export const addQuestion = newQuestion => {
    return axios.post(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/addQuestion`, {
        Question: newQuestion.Question
    }, {
        headers: { Authorization: `JWT ${newQuestion.Token}` }
    }).then(response => {
        return response.data;
    });
};

// DELETE: deleteQuestion
export const deleteQuestion = async discardedQuestion => {
    return await axios.delete(`${Strings.NAQEL_SERVER}transportCompanyResponsibles/deleteQuestion`, {
        headers: { Authorization: `JWT ${discardedQuestion.Token}` },
        data: { ResponsibleQuestionID: discardedQuestion.ResponsibleQuestionID }
    }).then(response => {
        return response.data;
    });
};