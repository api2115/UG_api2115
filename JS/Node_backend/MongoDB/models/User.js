const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const userSchema = new Schema({
    login: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^.+@.+$/, "błąd"]
    },
    registrationDate: Date,
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true
        }
    ]
});

module.exports = model('User', userSchema);