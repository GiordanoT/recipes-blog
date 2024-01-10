import {Schema, model} from 'mongoose';

export class Favorites {
    private static Schema = new Schema({
        user: {type: String, required: true},
        recipe: {type: String, required: true}
    });

    private static Model = model('Favorite', this.Schema);

    static getByUser = (user: string) => this.Model.find({user});
    static getByUserAndRecipe = (user: string, recipe: string) => this.Model.findOne({user, recipe});
    static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static delete = (user:string, recipe: string) => this.Model.findOneAndDelete({user, recipe});
    static deleteByRecipe = (recipe: string) => this.Model.deleteMany({recipe});
}
