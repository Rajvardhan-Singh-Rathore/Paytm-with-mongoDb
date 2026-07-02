const mongoose = require('mongoose');

const {User,Account} = require('./db');
const users = User;
module.exports = async function MoneyTransfer(fromAccountId,toAccountId,amount){
    let session;
    try{
        session = await mongoose.startSession();

        await session.startTransaction()
        const filterSender = {_id:fromAccountId}
        const filterReceiver = {_id:toAccountId}
        
        const receiverAccount = await Account.findOne({_id:toAccountId}).session(session);
        if(!receiverAccount){await session.abortTransaction();return ({message:'receiver account not found!'});}
        const senderAccount = await Account.findOne(filterSender).session(session)
        if(!senderAccount){await session.abortTransaction();return ({message:'sender account not found!'});}
        if(senderAccount.balance<amount){
            await session.abortTransaction();
            console.log('insufficient balance');
            return ({message:'insufficient balance'});
        }
        const updateSender = {
            $inc:{
                balance:-amount
            }
        }
        const updateReceiver = {
            $inc:{
                balance:amount
            }
        }
        await Account.findOneAndUpdate(filterSender,updateSender,{session:session});
        await Account.findOneAndUpdate(filterReceiver,updateReceiver,{session});

        await session.commitTransaction()
        const transact = {
            from:fromAccountId,
            to:toAccountId,
            amount
        }
        console.log("transfer successfulll");
        return ({message:'transfer successfull!',transact});
    }catch(err){
        console.log(err);
        return ({message:'Transacion Failed,something went wrong'});
    }finally{
        await session.endSession();
    }
    
    
}