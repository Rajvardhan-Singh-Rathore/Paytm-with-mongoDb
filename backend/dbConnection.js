const mongoose = require('mongoose')
module.exports =  async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to db');
    }catch(err){
        console.log(err.message);
    }
}