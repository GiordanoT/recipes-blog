import Api from '../data/api';

export class AuthApi {
    static path = 'auth';

    static async login(email, password) {
        return await Api.post(`${AuthApi.path}/login`, {email, password});
    }
    static async register(email, username, password) {
        return await Api.post(`${AuthApi.path}/register`, {email, username, password});
    }
    static async logout() {
        return Api.get(`${AuthApi.path}/logout`);
    }
    static async cookie(cookie) {
        return await Api.post(`${AuthApi.path}/cookie`, {cookie});
    }
}
