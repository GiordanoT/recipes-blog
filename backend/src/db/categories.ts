import {Schema, model} from 'mongoose';

export class Categories {
    private static Schema = new Schema({
        name: {type: String, required: true}
    });

    private static Model = model('Categories', this.Schema);

    static getAll = () => this.Model.find();
    static getById = (id: string) => this.Model.findById(id);
    private static create = (values: Record<string, unknown>) => new this.Model(values).save().then(entity => entity.toObject());
    static init = async() => {
        if((await this.getAll()).length) return;
        const categories = [
            'Appetizers',
            'First Dishes',
            'Second Dishes',
            'Side Dishes',
            'Leavened',
            'Sweets'
        ];
        for(const category of categories) await this.create({name: category})
    };
}
