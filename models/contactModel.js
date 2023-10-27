const mongoose = require("mongoose")


const contactSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add the contact name"]
    },
    email: {
        type: String,
        require: [true, "please add the contact email"]
    },
    phn: {
        type: String,
        require: [true, "please add the contact phone number"]
    },

},{
    timestamps:true,
}
)

module.exports = mongoose.model("contact",contactSchema);