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