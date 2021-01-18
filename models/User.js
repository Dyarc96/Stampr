const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    surname: String,
    googleId: String,
    facebookId: String,
    linkedOrganizations: Array,
    isProvider: String,
    linkedProviderOrganizations: Array,
    age: Number,
    email: String
});

mongoose.model('user', UserSchema);
