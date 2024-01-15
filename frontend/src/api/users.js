import Api from '../data/api';

export class UsersApi {
    static path = 'users';

    static async getAll() {
        return Api.get(UsersApi.path);
    }
}
