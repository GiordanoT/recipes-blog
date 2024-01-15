import Api from '../data/api';

export class CategoriesApi {
    static path = 'categories';

    static async getAll() {
        return Api.get(CategoriesApi.path);
    }
}
