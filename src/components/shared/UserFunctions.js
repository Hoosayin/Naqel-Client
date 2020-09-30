import axios from "axios";
import Strings from "../../res/strings";

// GET: GetPublicData
export const getPublicData = async request => {
    console.log(`Sending GET request to ${Strings.NAQEL_SERVER}users/get${request.Get}...`);
    return await axios.get(`${Strings.NAQEL_SERVER}users/get${request.Get}`, {
        params: request.Params
    }).then(response => {
        return response.data;
    });
};

// POST: Login
export const login = async driver => {
    console.log(`Sending HTTP POST request on ${Strings.NAQEL_SERVER}users/login`);
    return await axios.post(`${Strings.NAQEL_SERVER}users/login`, {
        PhoneNumberOrUsername: driver.PhoneNumberOrUsername,
        Password: driver.Password
    }).then(response => {
        return response.data;
    })
};

// POST: Logout
export const logout = async user => {
    console.log(`Sending HTTP POST request on ${Strings.NAQEL_SERVER}users/logout`);
    return await axios.post(`${Strings.NAQEL_SERVER}users/logout`, {
        UserType: user.UserType,
        ID: user.ID
    }).then(response => {
        return response.data;
    })
};

// POST: ValidateEmail
export const validateEmail = async email => {
    return await axios.post(`${Strings.NAQEL_SERVER}users/validateEmail`, {
        Email: email
    }).then(response => {
        return response.data;
    });
};
