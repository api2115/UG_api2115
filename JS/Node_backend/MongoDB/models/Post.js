const { Schema, model} = require('mongoose');

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    responses: {
        type: Number,
        required: true
    }
});

module.exports = model('Post', postSchema);