const mongoose = require('mongoose');
const connectToDb = require('./dbConnection');

connectToDb();
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:40,
        unique:true,
        lowercase:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:40,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:40,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:40,
        lowercase:true
    }
});
const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    balance:{
        type:Number,
        trim:true,
        required:true
    }
})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);//bank related schema
module.exports = {User,Account}