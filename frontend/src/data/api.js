import Axios from 'axios';

class Api {
    static url = 'http://localhost:5000/backend/';

    static async get(path) {
        try {
            const response = await Axios.get(Api.url + path, {withCredentials: true});
            return {code: response.status, data: response.data};
        } catch (e) {
            return {code: 400, data: null};
        }
    }
    static async post(path, obj) {
        try {
            const response = await Axios.post(Api.url + path, obj, {withCredentials: true});
            return {code: response.status, data: response.data};
        } catch (e) {
            return {code: 400, data: null};
        }
    }
    static async patch(path, obj) {
        try {
            const response = await Axios.patch(Api.url + path, obj, {withCredentials: true});
            return {code: response.status, data: response.data};
        } catch (e) {
            return {code: 400, data: null};
        }
    }
    static async delete(path) {
        try {
            const response = await Axios.delete(Api.url + path, {withCredentials: true});
            return {code: response.status, data: response.data};
        } catch (e) {
            return {code: 400, data: null};
        }
    }

}

export default Api;
