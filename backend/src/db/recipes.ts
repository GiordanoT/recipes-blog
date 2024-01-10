import {Schema, model} from 'mongoose';

export class Recipes {
    private static Schema = new Schema({
        name: {type: String, required: true},
        author: {type: String, required: true},
        category: {type: String, required: true},
        ingredients: {type: [String], required: true},
        duration: {type: Number, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true}
    });

    private static Model = model('Recipe', this.Schema);

    static getAll = () => this.Model.find();
    static getById = (id: string) => this.Model.findById(id);
    static getByAuthor = (author: string) => this.Model.find({author});
    static getByCategory = (category: string) => this.Model.find({category});
    static getByName = (name: string) => this.Model.find({name: {$regex: name, $options: 'i'}});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (id: string) => this.Model.findByIdAndDelete(id);
    static update = (id: string, values: Record<string, unknown>) => this.Model.findByIdAndUpdate(id, values);
}
