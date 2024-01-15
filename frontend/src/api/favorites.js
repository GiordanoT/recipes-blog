import Api from '../data/api';

export class FavoritesApi {
    static path = 'favorites';

    static async getAll() {
        return Api.get(FavoritesApi.path);
    }
    static async add(recipe) {
        return await Api.get(`${FavoritesApi.path}/${recipe._id}`);
    }
    static async remove(recipe) {
        return await Api.delete(`${FavoritesApi.path}/${recipe._id}`);
    }
}
