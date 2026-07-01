const mongoose = require('mongoose')
module.exports =  async function connectToDb(){
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/paytm-week-8');
        console.log('connected to db');
    }catch(err){
        console.log(err.message);
    }
}