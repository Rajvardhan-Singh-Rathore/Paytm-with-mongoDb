require("dotenv").config();
const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const corsOptions = {
    origin:'https://paytm-with-mongo-db.vercel.app/',
    methods:'GET,POST,PUT',
    credentials:true
}
app.use(cors(corsOptions));
app.get('/',(req,res)=>{
    res.redirect('api/v1/user/signup');
})
app.use('/api/v1',mainRouter);


app.listen(3000,()=>console.log('listening on port 3000'));

