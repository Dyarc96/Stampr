const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrganizationSchema = new Schema({
    name: String,
    address: [
        {
            address1: String,
            city: String,
            zip: String
        }
    ],
    type: String,
    numOfStamps: Number,
    linkedUsers: [
        {
            id: String,
            stamps: Number,
            firstName: String,
            lastName: String,
            visits: Number,
            age: Number
        }
    ],
    // Provider needs to be accepted before being linked
    candidateProviders: [
        {
            id: String,
            firstName: String,
            lastName: String,
            email: String
        }
    ],
    linkedProviders: [
        {
            id: String,
            isHead: String,
            firstName: String,
            lastName: String,
        }
    ]
});

OrganizationSchema.index({ name: 'text' });
mongoose.model('organization', OrganizationSchema);
