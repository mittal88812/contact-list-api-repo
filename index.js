const express = require('express');
const app = express();
const mongoose = require('mongoose');

const multer = require('multer');

const router = require('./routes/contactRoutes')

const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(router);var upload = multer({ storage: storage });



mongoose.connect('mongodb+srv://mittal123:Tushar@cluster0.4orw0.mongodb.net/UserContact?retryWrites=true&w=majority').then(()=>{
    console.log("Connected Successfully.");
}).catch((err)=>{  
    console.log('Some error connecting with DB.', err);
});


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// Step 7 - the GET request handler that provides the HTML UI





app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})