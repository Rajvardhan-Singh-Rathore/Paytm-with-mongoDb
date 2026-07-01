const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const z = require('zod')
const {User} = require('../db')
const JWT_SECRET = require('../config');
const isLoggedIn = require('../middlewares/authMiddleware');
const {Account} = require('../db');

const users=User;

const userSchema = z.object({
    username:z.string().email('invalid email format'),
    firstName:z.string().min(3).max(40),
    lastName:z.string().max(40),
    password:z.string().min(8,{message:'password must be atleast 8 characters long'}).max(40,{message:'password length cannot be more than 40 characters'})
});
const UpdateInfoSchema = z.object({
    firstName:z.string().min(3).max(40).optional(),
    lastName:z.string().max(40).optional(),
    password:z.string().min(8,{message:'password must be atleast 8 characters long'}).max(40,{message:'password length cannot be more than 40 characters'}).optional()
});

router.post('/signup',async (req,res)=>{
    //firstname,lastname,password
    const {username,firstName,lastName,password} = req.body;
    try{
        const validatedData = userSchema.parse({username,firstName,lastName,password});
    }catch(err){console.log(err.message);res.status(411).json({message:'input credential format not valid'});return;}
    //check if already exists in db
    const user = await users.findOne({username:username});
    if(user){
        res.status(411).json({message:'user already exists'});
        return;
    }
    const createdUser = await users.create({username,firstName,lastName,password});
    const userId = createdUser._id;
    //----create Account for this user-----//
    Account.create({
        userId,
        balance:(Math.random()*1000).toFixed(2)
    });
    const token = jwt.sign({userId},JWT_SECRET);
    res.json({token:"Bearer "+token,message:'user created successfully!'})
});
const signInSchema = z.object({
    username:z.string().min(3).max(40),
    password:z.string().min(8,'password length should atleast be 8').max(40,'password greater than length 40 are not accepted')
})
router.post('/signin',async (req,res)=>{
    //something
    const {username,password} = req.body;
    try{
        const validatedData = signInSchema.parse({username,password})//const {success} = userSchema.safeParse({..})
    }catch(err){
        console.log(err.message);
        res.status(411).json({message:'invalid credential(s)input format'})
        return;
    }
    const user = await users.findOne({username:username,password});
    if(!user){res.json({messsage:'please signup first'})}
    const userId = user._id;
    const token = jwt.sign({userId},JWT_SECRET);
    req.headers.authorization = "Bearer "+token;
    res.json({message:'signin successfull',token:"Bearer "+token});
    return;
});

router.put('/',isLoggedIn,async (req,res)=>{
    //something
    const {firstName,lastName,password} = req.body;
    try{
        const validatedData = UpdateInfoSchema.parse({firstName,lastName,password});//safeParse(req.body)
    }catch(e){
        console.log(e.message);
        res.status(411).json({message:'invalid credential(s) input format'});
        return;
    }
    const filter = {_id:req.userid};
    const update = {$set:{
        firstName:firstName,
        lastName:lastName,
        password:password
    }}
    const updatedUser = await users.findOneAndUpdate(filter,update,{new:true});
    console.log(updatedUser);
    res.json({message:'user details updated successfully',updatedUser});
    return;
});
router.get('/bulk',async (req,res)=>{
    const searchedItem = req.query.filter || '';
    const allUsers = await users.find({
        $or:[
            {
                firstName:{
                    "$regex":searchedItem
                }
            },
            {
                lastName:{
                    "$regex":searchedItem
                }
            }
        ]
    })
    if(allUsers.length==0){res.send('no such user found,you may check and search again');return;}
    const foundUsers = allUsers.map((el,idx)=>({_id,firstName,lastName}));
    res.json({users:foundUsers});
    return;
})
router.get('/balance',isLoggedIn,async (req,res)=>{
    const account = await Account.findOne({userId:req.userid});
    res.json({balance:account.balance});
    return;
})
router.post('/transfer',isLoggedIn,(req,res)=>{
    const {toAccountId,amount} = req.body;
    const fromAccountId = req.userid;
    
})
module.exports = router;