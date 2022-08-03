const mongoose = require('mongoose');
const validator = require('validator');
//const multer = require('multer');


const userContactSchema = new mongoose.Schema({

    Name : {
        type : String,
        required : true,

    },

    Contact : [
        {
        number : 
            {
                type : Number,
                unique : true,
                // validate(value){
                //     if(!validator.isPhone(value)){
                //         throw new Error('Phone Number is not valid');
                //     }
                // }
            },
        },
    ]

    ,

    

});


  


const UserContact = mongoose.model('UserContact',userContactSchema);

module.exports = UserContact;