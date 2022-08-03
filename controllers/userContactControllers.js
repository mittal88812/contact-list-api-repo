const UserContact = require('../models/UserContact');
const csv = require('csv-express');

module.exports.saveContact = async(req, res) => {

    let uniqueObjArray = [
        ...new Map(req.body.Phone.map((item) => [item["number"], item])).values(),
    ];
    console.log(uniqueObjArray);

        const newUserContact = new UserContact({
            Name : req.body.Name,
            Contact : uniqueObjArray
        });

        
    try{
        const result = await newUserContact.save();
        console.log(result);
        
        res.status(200).send("Contact Saved");
    }
    catch(err){
        console.log('err',err);
        res.status(400).send(err);
    }

};

module.exports.deleteContact = async(req, res) => {
    try{

        const checkUser = await UserContact.findOne({_id : req.body.id});
        if(!checkUser) {
            res.status(400).send('User is not found');
        }
        else{
            const result = await UserContact.findByIdAndRemove(req.body.id);
            console.log(result);
            res.status(200).send('User deleted successfully');
        }

    }
    catch(err){z
        console.log('Some err', err);
        res.status(400).send('There is some problem with your user id.');
    }
}


module.exports.fetchContact = async(req, res) => {
    try{
        const checkUser = await UserContact.findOne({_id: req.params.id});

        if(!checkUser){
            res.status(400).send('User is not found');
        }
        else{
            console.log(checkUser.Contact);
            res.status(200).send(checkUser.Contact);
        }
    }catch(err){
    
        console.log('some error occured',err);
        res.status(400).send('User id is not correct.');
    }
}


module.exports.updateContact = async(req,res) => {
    try{
        const checkUser = await UserContact.findOne({_id : req.body.id});
        if(!checkUser){
            res.status(400).send('User is not found.');
        }        
        else{

            const result =  await UserContact.updateOne({_id:req.body.id}, {$push:{"Contact":req.body.Phone}});
            console.log(result);
            res.status(200).send('Updated Succesfully');

        }
    }catch(err){
        console.log('some error occured');
        res.status(400).send('User id is not correct.');
    }
        

}


module.exports.exportContact = async(req,res) => {
    var filename = `Datafile${Date.now()}.csv`;
    var dataArray;

    UserContact.find().lean().exec({}, function(err, Contact) {
        if(err) res.send(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(Contact, true);

    })

}