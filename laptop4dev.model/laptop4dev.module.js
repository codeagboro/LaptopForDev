const mongoose = require("mongoose")

const laptopRecipientsSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        emailAddress: {
            type: String,
        },
        phoneNumber: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
)

const recipientsRecord = mongoose.model("recipientsRecord", laptopRecipientsSchema);
module.exports = recipientsRecord;