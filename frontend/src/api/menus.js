import Api from '../data/api';

export class MenusApi {
    static path = 'menus';

    static async getAll() {
        return Api.get(MenusApi.path);
    }
    static async edit(id, editedObj) {
        return await Api.patch(`${MenusApi.path}/${id}`, editedObj)
    }
    static async create(menu) {
        return await Api.post(MenusApi.path, menu);
    }
    static async delete(menu) {
        return await Api.delete(`${MenusApi.path}/${menu._id}`);
    }
}
