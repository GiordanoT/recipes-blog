import Api from '../data/api';

export class RecipesApi {
    static path = 'recipes';

    static async getAll() {
        return Api.get(RecipesApi.path);
    }
    static async edit(id, editedObj) {
        return await Api.patch(`${RecipesApi.path}/${id}`, editedObj)
    }
    static async create(recipe) {
        return await Api.post(RecipesApi.path, recipe);
    }
    static async delete(recipe) {
        return await Api.delete(`${RecipesApi.path}/${recipe._id}`);
    }
}
