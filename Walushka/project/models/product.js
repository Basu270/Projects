const mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
    name:String,
    surname:String,
    phone_no:Number,
    email_ID:String
})

const Contact= mongoose.model("Contact",contactSchema);
module.exports={
    Contact
}