const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true,"Contact name is required"]
    },
    lname : {
        type: String,
        required: [false]
    },
    contactnumber :{
        type: String,  // Change from Number to String
        required: [true, 'Contact Number is required'],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Contact number must be exactly 10 digits'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required',],
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            }
        }
    },
    jobTitle: {
        type: String,
        required: [true,"JobTitle required"]
    },
    companyName: {
        type: String,
        required: [false]
    }
},{
    timestamps: true
}
);

const Contact = mongoose.model("Contact",ContactSchema)
module.exports = Contact;