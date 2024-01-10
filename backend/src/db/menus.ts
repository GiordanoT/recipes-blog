import {Schema, model} from 'mongoose';

export class Menus {
    private static Schema = new Schema({
        name: {type: String, required: true},
        author: {type: String, required: true},
        recipes: {type: [String], required: true},
    });

    private static Model = model('Menu', this.Schema);

    static getAll = () => this.Model.find();
    static getById = (id: string) => this.Model.findById(id);
    static getByAuthor = (author: string) => this.Model.find({author});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (id: string) => this.Model.findByIdAndDelete(id);
    static update = (id: string, values: Record<string, unknown>) => this.Model.findByIdAndUpdate(id, values);
}
