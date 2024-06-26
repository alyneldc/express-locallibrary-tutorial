var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true}
});

// Virtual for book's URL
BookSchema.virtual('url').get(function() {
    return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);