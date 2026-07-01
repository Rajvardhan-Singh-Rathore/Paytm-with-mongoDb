const mongoose = require('mongoose');

const users = require('./db');
const Account = require('./db');
export async function MoneyTransfer(fromAccountId,toAccountId,amount){
    try{
        const session = mongoose.startSession();

        (await session).startTransaction()
        const filterSender = {userId:fromAccountId}
        const filterReceiver = {userId:toAccountId}

        const receiverAccount = Account.findOne({userId:toAccountId}).session(session);
        if(!receiverAccount){res.status(404).json({message:'receiver account not found!'});(await session).abortTransaction();return;}

        if(await Account.findOne(filterSender).session(session).balance<amount){
            res.status(400).json({message:'insufficient balance'});
            (await session).abortTransaction();
            return;
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
        await Account.findOneAndUpdate(filterSender,updateSender).session(session);
        await Account.findOneAndUpdate(filterReceiver,updateReceiver).session(session);

        (await session).commitTransaction()
        const transact = {
            from:fromAccountId,
            to:toAccountId,
            amount
        }
    }catch(err){
        res.send('Transacion Failed,something went wrong');
        console.log(err.message);
    }
    res.json({message:'transfer successfull!'},{transact});
    return;
}