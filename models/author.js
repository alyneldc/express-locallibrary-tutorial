const mongoose = require('mongoose');
const { DateTime } = require('luxon');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
    return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
    const birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }) : '';
    const death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' }) : '';
    return birth + ' - ' + death;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function() {
    return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);